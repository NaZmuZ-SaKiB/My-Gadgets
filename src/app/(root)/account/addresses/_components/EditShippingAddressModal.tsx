"use client";

import MGButton from "@/components/global/shared/MGButton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TShippingAddress } from "@/types/shippingAddress.type";
import { Edit } from "lucide-react";
import { useState } from "react";
import UpdateShippingAddressForm from "./UpdateShippingAddressForm";

type TProps = {
  currentAddress: TShippingAddress;
};

const EditShippingAddressModal = ({ currentAddress }: TProps) => {
  const [open, setOpen] = useState(false);

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <MGButton
          className="gap-2 rounded-md hover:bg-slate-200"
          variant="ghost"
          size="sm"
        >
          <Edit className="size-5" />
          <span>Edit</span>
        </MGButton>
      </DialogTrigger>

      <DialogContent className="!rounded-2xl p-4">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-slate-700">
            Edit Shipping Address
          </DialogTitle>
        </DialogHeader>

        <UpdateShippingAddressForm
          closeModal={closeModal}
          currentAddress={currentAddress}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditShippingAddressModal;
