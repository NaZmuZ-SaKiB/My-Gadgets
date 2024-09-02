"use client";

import MGAImageInput from "@/components/admin/forms/MGAImageInput";
import { useState } from "react";
import ProductSelect from "./ProductSelect";
import MGButton from "@/components/global/shared/MGButton";
import { Plus } from "lucide-react";

type TProps = {
  defaultValue?: any[];
};

const FeaturedProductsSelect = ({ defaultValue }: TProps) => {
  const [values, setValues] = useState<any[]>(
    defaultValue || [{ products: [] }]
  );

  const addNewSlot = () => {
    setValues((prev) => [...prev, { products: [] }]);
  };

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-lg font-semibold">Featured Products</h2>
      {values.length > 0 &&
        values.map((item, i) => (
          <div
            key={`featured-products-entry-${i}`}
            className="flex flex-col gap-3 bg-slate-50 rounded-md p-3"
          >
            <MGAImageInput
              name={`homepage.featuredProducts[${i}].banner`}
              label="Banner"
            />

            <ProductSelect
              name={`homepage.featuredProducts[${i}].products`}
              label="Products"
              defaultValue={item.products}
              multiple
            />
          </div>
        ))}
      <MGButton
        type="button"
        className="rounded-none self-start gap-2"
        onClick={addNewSlot}
      >
        <Plus className="size-5" /> Add new
      </MGButton>
    </div>
  );
};

export default FeaturedProductsSelect;
