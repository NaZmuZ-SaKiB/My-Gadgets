"use client";

import AFloatingBox from "@/components/admin/admin-ui/AFloatingBox";
import MGAImageInput from "@/components/admin/forms/MGAImageInput";

const ProductImagesForm = ({ defaultValues }: { defaultValues?: any }) => {
  return (
    <AFloatingBox>
      <h2 className="font-medium text-slate-700 text-lg mb-5">Images</h2>

      <div className="space-y-3">
        <MGAImageInput
          name="images"
          label="Gallery Images*"
          description="First selected image will be the featured image."
          defaultValue={defaultValues?.images || []}
          reset={false}
          multiple
        />
      </div>
    </AFloatingBox>
  );
};

export default ProductImagesForm;
