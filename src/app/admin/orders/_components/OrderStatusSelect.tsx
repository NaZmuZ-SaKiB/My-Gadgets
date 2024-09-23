"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { orderStatuses } from "@/constants";

type TProps = {
  orderId: string;
  currentStatus: string;
};

const OrderStatusSelect = ({ orderId, currentStatus }: TProps) => {
  return (
    <Select defaultValue={currentStatus}>
      <SelectTrigger className="no-focus">
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        {orderStatuses.map((item) => (
          <SelectItem
            key={`${orderId}-${item}`}
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

export default OrderStatusSelect;
