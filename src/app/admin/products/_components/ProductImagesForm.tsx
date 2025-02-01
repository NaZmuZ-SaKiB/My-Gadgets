"use client";

import MGAImageInput from "@/components/admin/forms/MGAImageInput";
import AFloatingBox from "@/components/admin/admin-ui/AFloatingBox";

const ProductImagesForm = ({ defaultValues }: { defaultValues?: any }) => {
  return (
    <AFloatingBox>
      <h2 className="mb-5 text-lg font-medium text-slate-700">Images</h2>

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
