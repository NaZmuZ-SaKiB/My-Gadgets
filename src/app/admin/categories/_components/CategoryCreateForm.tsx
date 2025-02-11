"use client";

import { z } from "zod";
import { toast } from "sonner";
import { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";

import MGForm from "@/components/global/forms/MGForm";
import MGAInput from "@/components/admin/forms/MGAInput";
import MGButton from "@/components/global/shared/MGButton";
import MGAImageInput from "@/components/admin/forms/MGAImageInput";
import AFloatingBox from "@/components/admin/admin-ui/AFloatingBox";
import MGASelect, { TSelectOption } from "@/components/admin/forms/MGASelect";

import {
  useCategoryCreateMutation,
  useCategoryGetAllQuery,
} from "@/lib/queries/category.query";
import { CategoryValidation } from "@/lib/validations/category.validation";

import { AQTags } from "@/constants";
import generateSlug from "@/utils/generateSlug";
import { TCategory } from "@/types/category.type";

const defaultValues = {
  name: "",
  label: "",
  parent: "select",
};

const CategoryCreateForm = () => {
  const queryClient = useQueryClient();

  const params = new URLSearchParams();
  params.append("onlyParent", "true");

  const { data, isLoading } = useCategoryGetAllQuery(params.toString());
  const parentCategories: TCategory[] = data?.data || [];

  const { mutateAsync: createCategoryFn, isPending } =
    useCategoryCreateMutation();

  const handleCategoryCreate: SubmitHandler<
    z.infer<typeof CategoryValidation.create>
  > = async (values) => {
    if (values.parent === "select") delete values.parent;

    try {
      const result = await createCategoryFn({
        ...values,
        name: generateSlug(values.name),
      });

      if (result?.success) {
        toast.success(result?.message);

        queryClient.invalidateQueries({
          queryKey: [AQTags.CATEGORY, AQTags.ALL],
          exact: false,
        });

        window.location.reload();
      } else {
        toast.error(result?.message || "A server error occurred.");
        window.location.reload();
      }
    } catch (error: any) {
      toast.error(error?.message || "A client error occurred.");
      window.location.reload();
    }
  };

  if (isLoading)
    return (
      <div className="h-[500px] w-full animate-pulse rounded-xl bg-slate-200"></div>
    );

  const catSort = (a: TCategory, b: TCategory) => {
    if (a?.name < b?.name) return -1;
    if (a?.name > b?.name) return 1;
    return 0;
  };

  const parentOptions: TSelectOption[] =
    parentCategories.length > 0
      ? parentCategories.sort(catSort).map((cat: TCategory) => ({
          label: cat?.label,
          value: `${cat?._id}`,
        }))
      : [];

  return (
    <AFloatingBox>
      <h2 className="mb-5 text-lg font-medium text-slate-700">Add Category</h2>

      <MGForm
        onSubmit={handleCategoryCreate}
        resolver={zodResolver(CategoryValidation.create)}
        defaultValues={defaultValues}
      >
        <MGAInput name="name" label="Category Name*" />
        <MGAInput
          name="label"
          label="Label*"
          description="This will be visible in the menu"
        />

        <MGASelect
          name="parent"
          label="Parent Category"
          options={parentOptions}
        />

        <MGAImageInput name="image" label="Image" />

        <MGButton
          className="h-auto self-start rounded-none px-5 py-2"
          disabled={isPending}
        >
          {isPending ? "Creating..." : "Create Category"}
        </MGButton>
      </MGForm>
    </AFloatingBox>
  );
};

export default CategoryCreateForm;
