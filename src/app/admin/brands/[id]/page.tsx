"use client";

import AFloatingBox from "@/components/admin/admin-ui/AFloatingBox";
import AGrid from "@/components/admin/admin-ui/AGrid";
import APageContainer from "@/components/admin/admin-ui/APageContainer";
import APageHeading from "@/components/admin/admin-ui/APageHeading";
import MGAInput from "@/components/admin/forms/MGAInput";
import MGForm from "@/components/global/forms/MGForm";
import MGButton from "@/components/global/shared/MGButton";
import { AQTags } from "@/constants";
import {
  useBrandGetByIdQuery,
  useBrandUpdateMutation,
} from "@/lib/queries/brand.query";
import { BrandValidation } from "@/lib/validations/brand.validation";
import { TBrand } from "@/types/brand.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import { SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import FeaturedSwitch from "../_components/FeaturedSwitch";
import MGAImageInput from "@/components/admin/forms/MGAImageInput";

const SingleBrandPage = () => {
  const { id } = useParams();

  const queryClient = useQueryClient();

  const { data: brandData, isLoading: brandLoading } = useBrandGetByIdQuery(
    id as string,
  );
  const brand: TBrand = brandData?.data;

  // Handle brand update
  const { mutateAsync: updateBrandFn, isPending } = useBrandUpdateMutation();

  const handleBrandUpdate: SubmitHandler<
    Partial<z.infer<typeof BrandValidation.create>>
  > = async (values) => {
    try {
      const result = await updateBrandFn({
        id: `${id}`,
        payload: values,
      });

      if (result?.success) {
        toast.success(result?.message);
        queryClient.invalidateQueries({
          queryKey: [AQTags.BRAND],
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

  if (brandLoading) {
    return (
      <div className="grid h-full place-items-center">
        <Loader2 className="mx-auto size-[100px] animate-spin text-primary" />
      </div>
    );
  }

  const defaultValues = {
    name: brand?.name || "",
    image: brand?.image?._id.toString() || "",
  };

  return (
    <APageContainer>
      <APageHeading title={`Brand - ${brand?.name}`} backButton />

      <AGrid>
        <AFloatingBox>
          <MGForm
            onSubmit={handleBrandUpdate}
            resolver={zodResolver(BrandValidation.create.partial())}
            defaultValues={defaultValues}
            reset={false}
          >
            <h2 className="mb-1 text-lg font-medium text-slate-700">
              Update Brand
            </h2>

            <MGAInput name="name" label="Brand Name*" />

            <MGAImageInput
              name="image"
              label="Image"
              defaultValue={brand?.image ? [brand?.image] : []}
            />

            <MGButton
              className="h-auto self-start rounded-none px-5 py-2"
              disabled={isPending}
            >
              {isPending ? "Updating..." : "Update Brand"}
            </MGButton>

            <FeaturedSwitch
              id={id as string}
              label="Featured"
              defaultValue={brand?.featured}
              className="max-w-52 justify-between"
            />
          </MGForm>
        </AFloatingBox>
      </AGrid>
    </APageContainer>
  );
};

export default SingleBrandPage;
