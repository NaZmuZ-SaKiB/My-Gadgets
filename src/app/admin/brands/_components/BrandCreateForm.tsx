"use client";

import { z } from "zod";
import { toast } from "sonner";
import { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";

import AFloatingBox from "@/components/admin/admin-ui/AFloatingBox";
import MGAImageInput from "@/components/admin/forms/MGAImageInput";
import MGButton from "@/components/global/shared/MGButton";
import MGAInput from "@/components/admin/forms/MGAInput";
import MGForm from "@/components/global/forms/MGForm";

import { BrandValidation } from "@/lib/validations/brand.validation";
import { useBrandCreateMutation } from "@/lib/queries/brand.query";
import { AQTags } from "@/constants";

const defaultValues = {
  name: "",
};

const BrandCreateForm = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: createBrandFn, isPending } = useBrandCreateMutation();

  const handleBrandCreate: SubmitHandler<
    z.infer<typeof BrandValidation.create>
  > = async (values) => {
    try {
      const result = await createBrandFn(values);

      if (result?.success) {
        toast.success(result?.message);
        queryClient.invalidateQueries({
          queryKey: [AQTags.BRAND, AQTags.ALL],
          exact: false,
        });

        window.location.reload();
      } else {
        toast.error(result?.message || "A server error occurred.");
      }
    } catch (error: any) {
      toast.error(error?.message || "A client error occurred.");
    }
  };

  return (
    <AFloatingBox>
      <h2 className="mb-5 text-lg font-medium text-slate-700">Add Brand</h2>

      <MGForm
        onSubmit={handleBrandCreate}
        resolver={zodResolver(BrandValidation.create)}
        defaultValues={defaultValues}
      >
        <MGAInput name="name" label="Brand Name*" />

        <MGAImageInput name="image" label="Image" />

        <MGButton
          className="h-auto self-start rounded-none px-5 py-2"
          disabled={isPending}
        >
          {isPending ? "Creating..." : "Create Brand"}
        </MGButton>
      </MGForm>
    </AFloatingBox>
  );
};

export default BrandCreateForm;
