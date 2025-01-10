"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { orderStatuses } from "@/constants";
import { TOrderStatus } from "@/types/order.type";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const OrderStatusFilter = () => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams);

  const handleChange = (value: TOrderStatus | "all") => {
    params.delete("status");
    params.delete("page");
    params.append("page", "1");
    if (value !== "all") {
      params.append("status", value);
    }

    router.replace(`${pathName}?${params}`);
  };

  return (
    <Select
      defaultValue={searchParams?.get("status") || "all"}
      onValueChange={handleChange}
    >
      <SelectTrigger className="no-focus w-[170px] gap-2 border-slate-200">
        Status:
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="all">All</SelectItem>
        {orderStatuses.map((item) => (
          <SelectItem
            key={`order-status-select-${item}`}
            value={item}
            className="capitalize"
          >
            {item}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default OrderStatusFilter;
