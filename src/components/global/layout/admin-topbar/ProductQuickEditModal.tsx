"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  useProductGetByIdQuery,
  useProductUpdateMutation,
} from "@/lib/queries/product.query";
import { TProduct } from "@/types/product.type";
import { Divide, Edit, Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import MGForm from "../../forms/MGForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductValidation } from "@/lib/validations/product.validation";
import MGAInput from "@/components/admin/forms/MGAInput";
import { SubmitHandler } from "react-hook-form";
import { z } from "zod";
import MGButton from "../../shared/MGButton";
import generateSlug from "@/utils/generateSlug";
import { toast } from "sonner";
import { AQTags } from "@/constants";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const ProductQuickEditModal = () => {
  const [open, setOpen] = useState(false);

  const params = useParams();

  const { data: productData, isLoading: productLoading } =
    useProductGetByIdQuery(params?.id as string);
  const product: TProduct = productData?.data;

  const { mutateAsync: updateProduct, isPending } = useProductUpdateMutation();

  const closeModal = () => {
    setOpen(false);
  };

  const queryClient = useQueryClient();

  const handleSubmit: SubmitHandler<
    z.infer<typeof ProductValidation.quickEdit>
  > = async (values) => {
    values.slug = generateSlug(values.name);

    try {
      const result = await updateProduct({
        id: params?.id as string,
        payload: values,
      });

      if (result?.success) {
        toast.success(result?.message);
        queryClient.invalidateQueries({
          queryKey: [AQTags.PRODUCT, params?.id],
          exact: false,
        });
        closeModal();
      } else {
        toast.error(result?.message || "A server error occurred.");
      }
    } catch (error: any) {
      toast.error(error?.message || "A client error occurred.");
    }
  };

  if (productLoading) {
    return (
      <Button
        disabled
        className="no-focus flex h-auto cursor-pointer items-center gap-2 px-3 py-1.5 text-slate-50 hover:bg-slate-500"
      >
        <Edit className="size-4" />
        <span>Edit Product</span>
      </Button>
    );
  }

  const defaultValues = {
    name: product.name || "",
    model: product.model || "",
    salePrice: product.salePrice || 0,
    regularPrice: product.regularPrice || 0,
    quantity: product.quantity || 0,
    badgeText: product.badgeText || "",
    slug: product.slug || "",
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="no-focus flex cursor-pointer items-center gap-2 px-3 py-1.5 text-slate-50 hover:bg-slate-500">
        <Edit className="size-4" />
        <span>Edit Product</span>
      </DialogTrigger>

      <DialogContent className="!rounded-none p-4">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-slate-700">
            Quick Edit Product
          </DialogTitle>
        </DialogHeader>

        <MGForm
          onSubmit={handleSubmit}
          defaultValues={defaultValues}
          resolver={zodResolver(ProductValidation.quickEdit)}
          reset={false}
        >
          <MGAInput name="name" label="Product Name" />
          <MGAInput name="model" label="Model Name*" vertical />
          <MGAInput name="quantity" label="Quantity" type="number" vertical />
          <MGAInput
            name="regularPrice"
            label="Regular Price"
            type="number"
            vertical
          />
          <MGAInput
            name="salePrice"
            label="Sale Price"
            type="number"
            vertical
          />
          <MGAInput name="badgeText" label="Badge Text" vertical />

          <div className="flex items-center justify-between gap-3">
            <MGButton
              className="h-auto self-start rounded-none px-5 py-2"
              disabled={isPending}
            >
              {isPending ? "Saving Changes..." : "Save Changes"}
            </MGButton>
            <Link href={`/admin/products/${params?.id}`}>
              <MGButton
                className="h-auto self-start rounded-none px-5 py-2"
                variant="outline"
              >
                Full Edit
              </MGButton>
            </Link>
          </div>
        </MGForm>
      </DialogContent>
    </Dialog>
  );
};

export default ProductQuickEditModal;
