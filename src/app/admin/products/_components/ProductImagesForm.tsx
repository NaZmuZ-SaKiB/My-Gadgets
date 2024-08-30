"use client";

import AFloatingBox from "@/components/admin/admin-ui/AFloatingBox";
import MGAImageInput from "@/components/admin/forms/MGAImageInput";
import { TProduct } from "@/types/product.type";
import { z } from "zod";

const ProductImagesForm = ({ defaultValues }: { defaultValues?: any }) => {
  return (
    <AFloatingBox>
      <h2 className="font-medium text-gray-700 text-lg mb-5">Images</h2>

      <div className="space-y-3">
        <MGAImageInput
          name="images"
          label="Gallery Images*"
          description="First selected image will be the featured image."
          defaultValue={defaultValues?.images || []}
          multiple
        />
      </div>
    </AFloatingBox>
  );
};

export default ProductImagesForm;
