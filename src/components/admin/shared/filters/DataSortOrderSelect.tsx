"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const DataSortOrderSelect = () => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams);

  const handleChange = (value: string) => {
    params.delete("sortOrder");
    params.delete("page");
    params.append("page", "1");
    params.append("sortOrder", value);

    router.replace(`${pathName}?${params}`);
  };
  return (
    <Select defaultValue="desc" onValueChange={(value) => handleChange(value)}>
      <SelectTrigger className="no-focus gap-2 border-slate-200 w-[90px]">
        <SelectValue placeholder="Sort By" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value={"asc"}>Asc</SelectItem>
        <SelectItem value={"desc"}>Desc</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default DataSortOrderSelect;
