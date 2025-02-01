"use client";

import { toast } from "sonner";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useOrderUpdateMutation } from "@/lib/queries/order.query";
import { AQTags } from "@/constants";
import { cn } from "@/lib/utils";

type TProps = {
  orderId: string;
  currentIsPaid: boolean;
};

const OrderIsPaidSelect = ({ orderId, currentIsPaid }: TProps) => {
  const [isPaid, setIsPaid] = useState(currentIsPaid);

  const queryClient = useQueryClient();

  const { mutateAsync: updateOrder, isPending } = useOrderUpdateMutation();

  const handleChange = async (value: "true" | "false") => {
    try {
      const result = await updateOrder({
        id: orderId,
        payload: {
          isPaid: value === "true",
        },
      });

      if (result?.success) {
        queryClient.invalidateQueries({
          queryKey: [AQTags.ORDER],
          exact: false,
        });

        setIsPaid(value === "true");

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
      defaultValue={currentIsPaid ? "true" : "false"}
      disabled={isPending}
      onValueChange={handleChange}
    >
      <SelectTrigger
        className={cn("no-focus font-semibold text-green-500", {
          "text-red-500": !isPaid,
        })}
      >
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value={"true"}>Paid</SelectItem>
        <SelectItem value={"false"}>Not Paid</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default OrderIsPaidSelect;
