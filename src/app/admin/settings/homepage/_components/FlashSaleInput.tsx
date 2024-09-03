import MGButton from "@/components/global/shared/MGButton";
import { Plus } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";
import ProductSelect from "./ProductSelect";
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
          className="flex flex-col gap-3 bg-slate-50 rounded-md p-3 relative"
        >
          <div className="max-w-md">
            <MGADateTimePicker
              name={`homepage.flashSale.${i}.endDate`}
              label="End Date and Time"
              vertical
            />
          </div>

          <ProductSelect
            name={`homepage.flashSale.${i}.product`}
            label="Product"
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
        <Plus className="size-5" /> Add new Flash Sale
      </MGButton>
    </div>
  );
};

export default FlashSaleInput;
