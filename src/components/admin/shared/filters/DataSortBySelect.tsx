"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const DataSortBySelect = ({ options }: { options: string[] }) => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams);

  const handleChange = (value: string) => {
    params.delete("sortBy");
    params.delete("page");
    params.append("page", "1");
    params.append("sortBy", value);

    router.replace(`${pathName}?${params}`);
  };

  return (
    <Select
      defaultValue="createdAt"
      onValueChange={(value) => handleChange(value)}
    >
      <SelectTrigger className="no-focus gap-2 border-slate-200 w-[150px]">
        <SelectValue placeholder="Sort By" />
      </SelectTrigger>

      <SelectContent>
        {options.map((option) => (
          <SelectItem
            key={`data-sort-by-${option}`}
            value={option}
            className="capitalize"
          >
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default DataSortBySelect;
