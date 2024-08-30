"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const DataLimitSelect = () => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams);

  const handleChange = (value: string) => {
    params.delete("limit");
    params.delete("page");
    params.append("page", "1");
    params.append("limit", value);

    router.replace(`${pathName}?${params}`);
  };

  return (
    <Select
      defaultValue={params.get("limit") || "10"}
      onValueChange={(value) => handleChange(value)}
    >
      <SelectTrigger className="no-focus gap-2 border-slate-200 w-[80px]">
        <SelectValue placeholder="Limit" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value={"10"}>10</SelectItem>
        <SelectItem value={"20"}>20</SelectItem>
        <SelectItem value={"35"}>35</SelectItem>
        <SelectItem value={"50"}>50</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default DataLimitSelect;
