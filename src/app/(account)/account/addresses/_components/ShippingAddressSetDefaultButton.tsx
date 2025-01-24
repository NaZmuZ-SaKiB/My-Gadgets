"use client";

import MGButton from "@/components/global/shared/MGButton";
import { useShippingAddressUpdateMutation } from "@/lib/queries/shippingAddress.query";
import { toast } from "sonner";

type TProps = {
  id: string;
  isDefault: boolean;
};

const ShippingAddressSetDefaultButton = ({ id, isDefault }: TProps) => {
  const { mutateAsync: updateAddress, isPending } =
    useShippingAddressUpdateMutation();

  const handleSetDefault = async () => {
    try {
      const result = await updateAddress({
        id,
        payload: {
          default: true,
        },
      });

      if (result?.success) {
        toast.success(result?.message);
      } else {
        toast.error(result?.message || "A server error occurred.");
      }
    } catch (error: any) {
      toast.error(error?.message || "A client error occurred.");
    }
  };

  return (
    <>
      {!isDefault ? (
        <MGButton
          variant="ghost"
          size="sm"
          className="rounded-md hover:bg-slate-200"
          onClick={handleSetDefault}
          disabled={isPending}
        >
          {isPending ? "Updating..." : "Set Default"}
        </MGButton>
      ) : null}
    </>
  );
};

export default ShippingAddressSetDefaultButton;
