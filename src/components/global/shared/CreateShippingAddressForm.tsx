"use client";

import { z } from "zod";
import { toast } from "sonner";
import { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";

import MGButton from "./MGButton";
import MGForm from "../forms/MGForm";
import MGInput from "../forms/MGInput";

import { ShippingAddressValidation } from "@/lib/validations/shippingAddress.validation";
import { useShippingAddressCreateMutation } from "@/lib/queries/shippingAddress.query";
import { AQTags } from "@/constants";

type TProps = {
  closeModal?: () => void;
};

const defaultValues = {
  addressLine1: "",
  addressLine2: "",
  city: "",
  district: "",
  division: "",
  zipCode: "",
  phone: "",
};

const CreateShippingAddressForm = ({ closeModal }: TProps) => {
  const queryClient = useQueryClient();

  const { mutateAsync: createShippingAddress, isPending } =
    useShippingAddressCreateMutation();

  const handleSubmit: SubmitHandler<
    z.infer<typeof ShippingAddressValidation.create>
  > = async (values) => {
    try {
      const result = await createShippingAddress(values);

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

  return (
    <MGForm
      onSubmit={handleSubmit}
      resolver={zodResolver(ShippingAddressValidation.create)}
      defaultValues={defaultValues}
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

export default CreateShippingAddressForm;
