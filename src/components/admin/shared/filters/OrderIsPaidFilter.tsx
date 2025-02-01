"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const OrderIsPaidFilter = () => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams);

  const handleChange = (value: "all" | "true" | "false") => {
    params.delete("isPaid");
    params.delete("page");
    params.append("page", "1");
    if (value !== "all") {
      params.append("isPaid", value);
    }

    router.replace(`${pathName}?${params}`);
  };
  return (
    <Select
      defaultValue={searchParams?.get("isPaid") || "all"}
      onValueChange={handleChange}
    >
      <SelectTrigger className="no-focus w-[130px] gap-2 border-slate-200">
        Paid:
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="all">All</SelectItem>
        {["true", "false"].map((item) => (
          <SelectItem
            key={`order-status-select-${item}`}
            value={item}
            className="capitalize"
          >
            {item === "true" ? "Paid" : "Not Paid"}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default OrderIsPaidFilter;
