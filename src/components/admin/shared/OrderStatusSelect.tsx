"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AQTags, orderStatuses } from "@/constants";
import { useOrderUpdateMutation } from "@/lib/queries/order.query";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type TProps = {
  orderId: string;
  currentStatus: string;
};

const OrderStatusSelect = ({ orderId, currentStatus }: TProps) => {
  const queryClient = useQueryClient();

  const { mutateAsync: updateOrder, isPending } = useOrderUpdateMutation();

  const handleChange = async (value: string) => {
    try {
      const result = await updateOrder({
        id: orderId,
        payload: {
          status: value,
        },
      });

      if (result?.success) {
        queryClient.invalidateQueries({
          queryKey: [AQTags.ORDER],
          exact: false,
        });

        toast.success(result?.message);
      } else {
        toast.error(result?.message || "A server error occured.");
      }
    } catch (error: any) {
      toast.error(error?.message || "A client error occured.");
    }
  };

  return (
    <Select
      defaultValue={currentStatus}
      disabled={isPending}
      onValueChange={handleChange}
    >
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
