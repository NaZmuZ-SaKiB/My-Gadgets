"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type TProps = {
  items: string[];
  field: string;
};

const CheckBoxFilterCard = ({ items, field }: TProps) => {
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const selected = searchParams.get(field);

  const [selectedItems, setSelectedItems] = useState<string[]>(
    selected ? selected.split(",") : [],
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
      <p className="mb-2 text-sm font-semibold capitalize text-slate-700">
        {field}
      </p>

      {items.map((item) => (
        <div
          className="my-2 flex items-center gap-3"
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
          <Label htmlFor={item} className="cursor-pointer font-normal">
            {item.toLowerCase()}
          </Label>
        </div>
      ))}
    </div>
  );
};

export default CheckBoxFilterCard;
