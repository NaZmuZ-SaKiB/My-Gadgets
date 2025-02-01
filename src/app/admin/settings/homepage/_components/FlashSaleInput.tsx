import { Plus } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";

import ProductSelect from "./ProductSelect";
import MGButton from "@/components/global/shared/MGButton";
import MGADateTimePicker from "@/components/admin/forms/MGADateTimePicker";

type TProps = {
  defaultValue?: any[];
};

const FlashSaleInput = ({ defaultValue }: TProps) => {
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "homepage.flashSale",
  });

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-lg font-semibold">Flash Sales</h2>
      {fields.map((field, i) => (
        <div
          key={field.id}
          className="relative flex flex-col gap-3 rounded-md bg-slate-50 p-3"
        >
          <div className="max-w-md">
            <MGADateTimePicker
              name={`homepage.flashSale.${i}.endDate`}
              label="End Date and Time"
              defaultValue={defaultValue?.[i]?.endDate}
              vertical
            />
          </div>

          <ProductSelect
            name={`homepage.flashSale.${i}.product`}
            label="Product"
            defaultValue={[defaultValue?.[i]?.product]}
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
        <Plus className="size-5" /> Add new Flash Sale
      </MGButton>
    </div>
  );
};

export default FlashSaleInput;
