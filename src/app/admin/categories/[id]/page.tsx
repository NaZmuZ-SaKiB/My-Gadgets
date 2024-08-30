"use client";

import AFloatingBox from "@/components/admin/admin-ui/AFloatingBox";
import AGrid from "@/components/admin/admin-ui/AGrid";
import APageContainer from "@/components/admin/admin-ui/APageContainer";
import APageHeading from "@/components/admin/admin-ui/APageHeading";
import MGAInput from "@/components/admin/forms/MGAInput";
import MGASelect, { TSelectOption } from "@/components/admin/forms/MGASelect";
import MGForm from "@/components/global/forms/MGForm";
import MGButton from "@/components/global/shared/MGButton";
import { AQTags } from "@/constants/tags";
import {
  useCategoryGetAllQuery,
  useCategoryGetByIdQuery,
  useCategoryUpdateMutation,
} from "@/lib/queries/category.query";
import { CategoryValidation } from "@/lib/validations/category.validation";
import { TCategory } from "@/types/category.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import { SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import FeaturedSwitch from "../_components/FeaturedSwitch";
import ShowOnTopMenuSwitch from "../_components/ShowOnTopMenuSwitch";
import MGAImageInput from "@/components/admin/forms/MGAImageInput";

const SingleCategoryPage = () => {
  const { id } = useParams();

  const queryClient = useQueryClient();

  // Get parent categories
  const params = new URLSearchParams();
  params.append("onlyParent", "true");

  const { data, isLoading } = useCategoryGetAllQuery(params.toString());
  const parentCategories: TCategory[] = data?.data || [];

  const { data: categoryData, isLoading: categoryLoading } =
    useCategoryGetByIdQuery(id as string);
  const category: TCategory = categoryData?.data;

  // Handle category update
  const { mutateAsync: updateCategoryFn, isPending } =
    useCategoryUpdateMutation();

  const handleCategoryUpdate: SubmitHandler<
    Partial<z.infer<typeof CategoryValidation.create>>
  > = async (values) => {
    if (values.parent === "select") delete values.parent;

    if (values.name) values.name = values.name.toLowerCase();
    try {
      const result = await updateCategoryFn({
        id: `${id}`,
        payload: values,
      });

      if (result?.success) {
        toast.success(result?.message);
        queryClient.invalidateQueries({
          queryKey: [AQTags.CATEGORY],
          exact: false,
        });
      } else {
        toast.error(result?.message || "A server error occurred.");
      }
    } catch (error: any) {
      toast.error(error?.message || "A client error occurred.");
    }
  };

  // Loading

  if (categoryLoading || isLoading) {
    return (
      <div className="h-full grid place-items-center">
        <Loader2 className="animate-spin mx-auto size-[100px] text-primary" />
      </div>
    );
  }

  const defaultValues = {
    name: category?.name || "",
    label: category?.label || "",
    parent: (category?.parent as TCategory)?._id?.toString() || "select",
    image: category?.image?._id.toString() || "",
  };

  console.log(category);

  const parentOptions: TSelectOption[] =
    parentCategories.length > 0
      ? parentCategories.map((cat: TCategory) => ({
          label: cat?.label,
          value: `${cat?._id}`,
        }))
      : [];

  return (
    <APageContainer>
      <APageHeading title={`Category - ${category?.name}`} backButton />

      <AGrid>
        <AFloatingBox>
          <MGForm
            onSubmit={handleCategoryUpdate}
            resolver={zodResolver(CategoryValidation.create.partial())}
            defaultValues={defaultValues}
            reset={false}
          >
            <h2 className="font-medium text-slate-700 text-lg mb-1">
              Update Category
            </h2>

            <MGAInput name="name" label="Category Name*" />
            <MGAInput
              name="label"
              label="Label*"
              description="This will be visible in the menu"
            />

            {category?.subCategories.length === 0 && (
              <MGASelect
                name="parent"
                label="Parent Category"
                options={parentOptions}
              />
            )}

            <MGAImageInput
              name="image"
              label="Image"
              defaultValue={category?.image ? [category?.image] : []}
              reset={false}
            />

            <MGButton
              className="rounded-none self-start px-5 py-2 h-auto"
              disabled={isPending}
            >
              {isPending ? "Updating..." : "Update Category"}
            </MGButton>

            <FeaturedSwitch
              id={id as string}
              label="Featured"
              defaultValue={category?.featured}
              className="justify-between max-w-52"
            />

            <ShowOnTopMenuSwitch
              id={id as string}
              label="Show on top menu"
              defaultValue={category?.showOnTopMenu}
              className="justify-between max-w-52"
            />
          </MGForm>
        </AFloatingBox>
      </AGrid>
    </APageContainer>
  );
};

export default SingleCategoryPage;
