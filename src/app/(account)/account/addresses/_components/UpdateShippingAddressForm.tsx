"use client";

import { z } from "zod";
import { toast } from "sonner";
import { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";

import { ShippingAddressValidation } from "@/lib/validations/shippingAddress.validation";
import MGForm from "@/components/global/forms/MGForm";
import MGInput from "@/components/global/forms/MGInput";
import MGButton from "@/components/global/shared/MGButton";

import { useShippingAddressUpdateMutation } from "@/lib/queries/shippingAddress.query";
import { TShippingAddress } from "@/types/shippingAddress.type";
import { AQTags } from "@/constants";

type TProps = {
  currentAddress: TShippingAddress;
  closeModal?: () => void;
};

const UpdateShippingAddressForm = ({ closeModal, currentAddress }: TProps) => {
  const queryClient = useQueryClient();

  const { mutateAsync: updateShippingAddress, isPending } =
    useShippingAddressUpdateMutation();

  const handleSubmit: SubmitHandler<
    z.infer<typeof ShippingAddressValidation.create>
  > = async (values) => {
    try {
      const result = await updateShippingAddress({
        id: currentAddress._id,
        payload: values,
      });

      if (result?.success) {
        queryClient.invalidateQueries({
          queryKey: [AQTags.SHIPPING_ADDRESS, AQTags.ALL],
          exact: false,
        });

        toast.success(result.message);
      } else {
        toast.error(result?.message || "A Server Error Occurred.");
      }

      if (closeModal) {
        closeModal();
      }
    } catch (error: any) {
      toast.error(error?.message || "A Client Error Occurred.");
    }
  };

  const defaultValues = {
    addressLine1: currentAddress.addressLine1 || "",
    addressLine2: currentAddress.addressLine2 || "",
    city: currentAddress.city || "",
    district: currentAddress.district || "",
    division: currentAddress.division || "",
    zipCode: currentAddress.zipCode || "",
    phone: currentAddress.phone || "",
  };

  return (
    <MGForm
      onSubmit={handleSubmit}
      resolver={zodResolver(ShippingAddressValidation.create)}
      defaultValues={defaultValues}
      reset={false}
    >
      <MGInput name="addressLine1" label="Address Line 1" showLabel={false} />
      <MGInput name="addressLine2" label="Address Line 2" showLabel={false} />
      <MGInput name="city" label="City" showLabel={false} />
      <MGInput name="district" label="District" showLabel={false} />
      <MGInput name="division" label="Division" showLabel={false} />
      <MGInput name="zipCode" label="Zip Code" showLabel={false} />
      <MGInput name="phone" label="Phone" showLabel={false} />

      <MGButton className="h-auto py-3" disabled={isPending}>
        {isPending ? "Saving..." : "Save"}
      </MGButton>
    </MGForm>
  );
};

export default UpdateShippingAddressForm;
