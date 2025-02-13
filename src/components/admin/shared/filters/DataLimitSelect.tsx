"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type TProps = {
  defaultValue?: string;
  customFunction?: (value: string) => void;
  currentLimit?: string;
};

const DataLimitSelect = ({
  defaultValue = "10",
  customFunction,
  currentLimit,
}: TProps) => {
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
      defaultValue={currentLimit || params.get("limit") || defaultValue}
      onValueChange={(value) =>
        !!customFunction ? customFunction(value) : handleChange(value)
      }
    >
      <SelectTrigger className="no-focus w-[80px] gap-2 border-slate-200">
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
