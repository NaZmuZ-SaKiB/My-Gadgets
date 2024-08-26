"use client";

import AFloatingBox from "@/components/admin/admin-ui/AFloatingBox";
import MGAInput from "@/components/admin/forms/MGAInput";
import MGASelect, { TSelectOption } from "@/components/admin/forms/MGASelect";
import MGForm from "@/components/global/forms/MGForm";
import MGButton from "@/components/global/shared/MGButton";
import { AQTags } from "@/constants/tags";
import {
  useCategoryCreateMutation,
  useCategoryGetAllQuery,
} from "@/lib/queries/category.query";
import { CategoryValidation } from "@/lib/validations/category.validation";
import { TCategory } from "@/types/category.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

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
        name: values.name.toLowerCase(),
      });

      if (result?.success) {
        toast.success(result?.message);
        queryClient.invalidateQueries({
          queryKey: [AQTags.CATEGORY, AQTags.ALL],
          exact: false,
        });
      } else {
        toast.error(result?.message || "A server error occurred.");
      }
    } catch (error: any) {
      toast.error(error?.message || "A client error occurred.");
    }
  };

  if (isLoading) return null;

  const parentOptions: TSelectOption[] =
    parentCategories.length > 0
      ? parentCategories.map((cat: TCategory) => ({
          label: cat?.label,
          value: `${cat?._id}`,
        }))
      : [];

  return (
    <AFloatingBox>
      <h2 className="font-medium text-gray-700 text-lg mb-5">Add Category</h2>

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

        <MGButton
          className="rounded-none self-start px-5 py-2 h-auto"
          disabled={isPending}
        >
          {isPending ? "Creating..." : "Create Category"}
        </MGButton>
      </MGForm>
    </AFloatingBox>
  );
};

export default CategoryCreateForm;
