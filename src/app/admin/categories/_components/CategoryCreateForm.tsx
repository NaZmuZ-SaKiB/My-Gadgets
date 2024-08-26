"use client";

import AFloatingBox from "@/components/admin/admin-ui/AFloatingBox";
import MGAInput from "@/components/admin/forms/MGAInput";
import MGForm from "@/components/global/forms/MGForm";
import MGButton from "@/components/global/shared/MGButton";
import { CategoryValidation } from "@/lib/validations/category.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { SubmitHandler } from "react-hook-form";
import { z } from "zod";

const defaultValues = {
  name: "",
  label: "",
};

const CategoryCreateForm = () => {
  const queryClient = useQueryClient();

  const handleCategoryCreate: SubmitHandler<
    z.infer<typeof CategoryValidation.create>
  > = async (values) => {
    console.log(values);
  };
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

        <MGButton className="rounded-none self-start px-5 py-2 h-auto">
          Create
        </MGButton>
      </MGForm>
    </AFloatingBox>
  );
};

export default CategoryCreateForm;
