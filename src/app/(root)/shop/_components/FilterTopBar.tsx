"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import FilterSidebar from "./FilterSidebar";

const FilterTopBar = () => {
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const router = useRouter();

  const handleLimit = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.delete("limit");
    params.append("limit", value);
    params.delete("page");
    params.append("page", "1");

    router.replace(`${pathName}?${params}`);
  };

  const handleSort = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.delete("sortBy");
    params.delete("sortOrder");

    switch (value) {
      case "PLH":
        params.append("sortBy", "salePrice");
        params.append("sortOrder", "asc");
        break;

      case "PHL":
        params.append("sortBy", "salePrice");
        params.append("sortOrder", "desc");
        break;

      case "L":
        params.append("sortBy", "createdAt");
        params.append("sortOrder", "desc");
        break;

      case "O":
        params.append("sortBy", "createdAt");
        params.append("sortOrder", "asc");
        break;

      default:
        break;
    }

    params.delete("page");
    params.append("page", "1");

    router.replace(`${pathName}?${params}`);
  };
  return (
    <div className="flex justify-center md:justify-end flex-wrap gap-2 border border-slate-200 rounded-xl px-3 py-1.5">
      <FilterSidebar />

      <div className="max-xs:hidden inline-flex items-center py-1.5 text-slate-500">
        <span className="font-semibold text-sm">Show:</span>
        <Select
          defaultValue={searchParams.get("limit") || "35"}
          onValueChange={handleLimit}
        >
          <SelectTrigger className="h-auto border-none p-0 px-1 no-focus bg-slate-100">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="35">35</SelectItem>
            <SelectItem value="50">50</SelectItem>
            <SelectItem value="75">75</SelectItem>
            <SelectItem value="90">90</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="inline-flex items-center py-1.5 text-slate-500">
        <span className="font-semibold text-sm">Sort By:</span>
        <Select defaultValue="L" onValueChange={handleSort}>
          <SelectTrigger className="h-auto w-[90px] border-none p-0 px-1 no-focus bg-slate-100">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="PLH">Price Low to High</SelectItem>
            <SelectItem value="PHL">Price High to Low</SelectItem>
            <SelectItem value="L">Latest</SelectItem>
            <SelectItem value="O">Oldest</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default FilterTopBar;
