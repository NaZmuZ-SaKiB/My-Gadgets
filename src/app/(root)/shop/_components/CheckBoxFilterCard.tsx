"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

type TProps = {
  items: string[];
  field: string;
};

const CheckBoxFilterCard = ({ items, field }: TProps) => {
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const selected = searchParams.get(field);

  const [selectedItems, setSelectedItems] = useState<string[]>(
    selected ? selected.split(",") : []
  );

  const router = useRouter();

  const handleCompatibility = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target?.checked) {
      const array = Array.from(new Set([...selectedItems, e.target.name]));
      setSelectedItems(array);
    } else {
      const array = selectedItems.filter((item) => item !== e.target.name);
      setSelectedItems(array);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.delete("page");
    params.delete(field);

    if (selectedItems.length > 0) {
      params.append("page", "1");
      params.append(field, selectedItems.join(","));
    }

    router.replace(`${pathName}?${params}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItems]);
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
            defaultChecked={selectedItems.includes(item)}
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
