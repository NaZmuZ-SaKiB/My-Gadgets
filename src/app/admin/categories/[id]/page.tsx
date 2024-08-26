"use client";

import AFloatingBox from "@/components/admin/admin-ui/AFloatingBox";
import AGrid from "@/components/admin/admin-ui/AGrid";
import APageContainer from "@/components/admin/admin-ui/APageContainer";
import APageHeading from "@/components/admin/admin-ui/APageHeading";
import MGAInput from "@/components/admin/forms/MGAInput";
import MGForm from "@/components/global/forms/MGForm";
import MGButton from "@/components/global/shared/MGButton";
import { AQTags } from "@/constants/tags";
import {
  useCategoryGetByIdQuery,
  useCategoryToggleFeaturedMutation,
  useCategoryToggleShowOnTopMenuMutation,
  useCategoryUpdateMutation,
} from "@/lib/queries/category.query";
import { CategoryValidation } from "@/lib/validations/category.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import { SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import MGSwitch from "@/components/global/forms/MGSwitch";
import FeaturedSwitch from "../_components/FeaturedSwitch";
import ShowOnTopMenuSwitch from "../_components/ShowOnTopMenuSwitch";

const SingleCategoryPage = () => {
  const { id } = useParams();

  const queryClient = useQueryClient();

  const { data: categoryData, isLoading: categoryLoading } =
    useCategoryGetByIdQuery(id as string);
  const category = categoryData?.data;

  // Handle category update
  const { mutateAsync: updateCategoryFn, isPending } =
    useCategoryUpdateMutation();

  const handleCategoryUpdate: SubmitHandler<
    Partial<z.infer<typeof CategoryValidation.create>>
  > = async (values) => {
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

  if (categoryLoading) {
    return (
      <div className="h-full grid place-items-center">
        <Loader2 className="animate-spin mx-auto size-[100px] text-primary" />
      </div>
    );
  }

  const defaultValues = {
    name: category?.name || "",
    label: category?.label || "",
  };

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
            <h2 className="font-medium text-gray-700 text-lg mb-1">
              Update Category
            </h2>

            <MGAInput name="name" label="Category Name*" />
            <MGAInput
              name="label"
              label="Label*"
              description="This will be visible in the menu"
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
