"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChangeEvent, useState } from "react";

type TProps = {
  items: string[];
  field: string;
};

const CheckBoxFilterCard = ({ items, field }: TProps) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleCompatibility = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target?.checked) {
      const array = Array.from(new Set([...selectedItems, e.target.name]));
      setSelectedItems(array);
      // dispatch(setFilter({ value: array, field }));
    } else {
      const array = selectedItems.filter((item) => item !== e.target.name);
      setSelectedItems(array);
      // dispatch(setFilter({ value: array, field }));
    }
  };
  return (
    <div className="rounded-xl border border-slate-200 p-3">
      <p className="text-sm mb-2 font-semibold text-slate-700 capitalize">
        {field}
      </p>

      {items.map((item) => (
        <div
          className="flex gap-3 items-center my-2"
          key={`${field}-filter-${item}`}
        >
          <Input
            type="checkbox"
            name={item}
            id={item}
            className="size-3"
            onChange={handleCompatibility}
          />
          <Label htmlFor={item} className="font-normal cursor-pointer">
            {item.toLowerCase()}
          </Label>
        </div>
      ))}
    </div>
  );
};

export default CheckBoxFilterCard;
