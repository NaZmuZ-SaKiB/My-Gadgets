"use client";

import MGAInput from "@/components/admin/forms/MGAInput";
import MGASelect from "@/components/admin/forms/MGASelect";
import AFloatingBox from "@/components/admin/admin-ui/AFloatingBox";

import { useBrandGetAllQuery } from "@/lib/queries/brand.query";
import { TBrand } from "@/types/brand.type";
import { useParams } from "next/navigation";

const ProductBasicInfoForm = () => {
  const params = useParams();

  const { data, isLoading } = useBrandGetAllQuery("limit=1000");
  const brands: TBrand[] = data?.data || [];

  const brandOptions =
    brands.length > 0
      ? brands.map((brand) => ({
          label: brand.name,
          value: brand._id,
        }))
      : [];

  return (
    <AFloatingBox className="flex flex-col gap-3">
      <MGAInput name="name" label="Product Name*" />

      {params?.id && <MGAInput name="slug" label="Slug" />}

      <div className="mt-3 max-w-md space-y-3">
        <MGAInput name="model" label="Model Name*" vertical />
        <MGAInput name="quantity" label="Quantity*" type="number" vertical />
        <MGAInput
          name="regularPrice"
          label="Regular Price*"
          type="number"
          vertical
        />
        <MGAInput name="salePrice" label="Sale Price*" type="number" vertical />
        <MGAInput
          name="shippingCost"
          label="Shipping Cost"
          type="number"
          vertical
        />

        <MGASelect
          name="brand"
          label="Brand*"
          vertical
          options={brandOptions}
        />
        <MGAInput name="badgeText" label="Badge Text" vertical />
      </div>
    </AFloatingBox>
  );
};

export default ProductBasicInfoForm;
