"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import MGButton from "@/components/global/shared/MGButton";
import CreateShippingAddressForm from "@/components/global/shared/CreateShippingAddressForm";

const AddShippingAddressModal = () => {
  const [open, setOpen] = useState(false);

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <MGButton
          className="gap-2 rounded-md text-primary-hover"
          variant="outline"
        >
          <Plus className="size-5" />
          <span>Add New</span>
        </MGButton>
      </DialogTrigger>

      <DialogContent className="!rounded-2xl p-4">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-slate-700">
            New Shipping Address
          </DialogTitle>
        </DialogHeader>

        <CreateShippingAddressForm closeModal={closeModal} />
      </DialogContent>
    </Dialog>
  );
};

export default AddShippingAddressModal;
