"use client";

import MGButton from "@/components/global/shared/MGButton";
import { ORDER_STATUS } from "@/constants";
import { useOrderUpdateMutation } from "@/lib/queries/order.query";
import { TOrderStatus } from "@/types/order.type";
import { useState } from "react";
import { toast } from "sonner";

type TProps = {
  orderId: string;
  isRequested: boolean;
  status: TOrderStatus;
};

const CancelRequestButton = ({ orderId, isRequested, status }: TProps) => {
  const [requested, setRequested] = useState(isRequested);

  const { mutateAsync: updateOrder, isPending } = useOrderUpdateMutation();

  const handleCancelRequest = async () => {
    if (requested || status === ORDER_STATUS.CANCELLED) return;

    try {
      const result = await updateOrder({
        id: orderId,
        payload: {
          cancelRequested: true,
        },
      });

      if (result?.success) {
        setRequested(true);
        toast.success("Cancel request sent successfully.");
      } else {
        toast.error(result?.message || "A server error occurred.");
      }
    } catch (error: any) {
      toast.error(error?.message || "A client error occurred.");
    }
  };

  return (
    <>
      {requested ? (
        <MGButton disabled className="bg-slate-200 text-slate-900">
          {status === ORDER_STATUS.CANCELLED ? "Canceled" : "Cancel Requested"}
        </MGButton>
      ) : (
        <MGButton
          variant="destructive"
          size="sm"
          className="rounded-md"
          onClick={handleCancelRequest}
          disabled={isPending}
        >
          {isPending ? "Requesting..." : "Cancel Order"}
        </MGButton>
      )}
    </>
  );
};

export default CancelRequestButton;
