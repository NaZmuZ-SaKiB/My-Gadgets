"use client";

import MGButton from "@/components/global/shared/MGButton";
import ShippingAddressForm from "@/components/global/shared/ShippingAddressForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useState } from "react";

const AddShippingAddressModal = () => {
  const [open, setOpen] = useState(false);

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <MGButton
          className="rounded-md gap-2 text-primary-hover"
          variant="outline"
        >
          <Plus className="size-5" />
          <span>Add New</span>
        </MGButton>
      </DialogTrigger>

      <DialogContent className="p-4 !rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-slate-700">
            New Shipping Address
          </DialogTitle>
        </DialogHeader>

        <ShippingAddressForm closeModal={closeModal} />
      </DialogContent>
    </Dialog>
  );
};

export default AddShippingAddressModal;
