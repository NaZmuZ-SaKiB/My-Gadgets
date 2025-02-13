"use client";

import { useEffect } from "react";
import { Plus } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";

import ProductSelect from "./ProductSelect";
import MGButton from "@/components/global/shared/MGButton";
import MGAImageInput from "@/components/admin/forms/MGAImageInput";

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
        defaultValue.map((item) => {
          const returnObj: any = {
            products: item.products.map((product: any) => product?._id),
          };

          if (item.banner) {
            returnObj.banner = item.banner?._id;
          }

          return returnObj;
        }),
      );
    }
  }, [defaultValue, setValue]);

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-lg font-semibold">Featured Products</h2>
      {fields.map((field, i) => (
        <div
          key={field.id}
          className="relative flex flex-col gap-3 rounded-md bg-slate-50 p-3"
        >
          <MGAImageInput
            name={`homepage.featuredProducts.${i}.banner`}
            label="Banner"
            defaultValue={
              !!defaultValue?.[i]?.banner ? [defaultValue?.[i]?.banner] : []
            }
            reset={false}
          />

          <ProductSelect
            name={`homepage.featuredProducts.${i}.products`}
            label="Products"
            multiple
            defaultValue={defaultValue?.[i]?.products}
          />

          <span
            className="absolute right-2 top-2 cursor-pointer rounded-md bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
            onClick={() => remove(i)}
          >
            remove
          </span>
        </div>
      ))}
      <MGButton
        type="button"
        className="gap-2 self-start rounded-none"
        onClick={append}
      >
        <Plus className="size-5" /> Add new Featured Products
      </MGButton>
    </div>
  );
};

export default FeaturedProductsSelect;
