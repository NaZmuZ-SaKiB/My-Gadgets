"use client";

import MGAImageInput from "@/components/admin/forms/MGAImageInput";
import { useEffect, useState } from "react";
import ProductSelect from "./ProductSelect";
import MGButton from "@/components/global/shared/MGButton";
import { Plus } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";

type TProps = {
  defaultValue?: any[];
};

const FeaturedProductsSelect = ({ defaultValue }: TProps) => {
  const { control, setValue } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "homepage.featuredProducts",
  });

  useEffect(() => {
    if (defaultValue?.length) {
      setValue(
        "homepage.featuredProducts",
        defaultValue.map((item) => ({
          banner: item.banner?._id,
          products: item.products.map((product: any) => product?._id),
        }))
      );
    }
  }, [defaultValue, setValue]);

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-lg font-semibold">Featured Products</h2>
      {fields.map((field, i) => (
        <div
          key={field.id}
          className="flex flex-col gap-3 bg-slate-50 rounded-md p-3 relative"
        >
          <MGAImageInput
            name={`homepage.featuredProducts.${i}.banner`}
            label="Banner"
            defaultValue={[defaultValue?.[i]?.banner]}
            reset={false}
          />

          <ProductSelect
            name={`homepage.featuredProducts.${i}.products`}
            label="Products"
            multiple
            defaultValue={defaultValue?.[i]?.products}
          />

          <span
            className="bg-red-500 text-white px-3 py-1 text-sm rounded-md absolute right-2 top-2 cursor-pointer hover:bg-red-600"
            onClick={() => remove(i)}
          >
            remove
          </span>
        </div>
      ))}
      <MGButton
        type="button"
        className="rounded-none self-start gap-2"
        onClick={append}
      >
        <Plus className="size-5" /> Add new Featured Products
      </MGButton>
    </div>
  );
};

export default FeaturedProductsSelect;
