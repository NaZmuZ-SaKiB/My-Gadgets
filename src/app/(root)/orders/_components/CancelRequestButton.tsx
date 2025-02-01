"use client";

import { toast } from "sonner";
import { useState } from "react";

import { useOrderUpdateMutation } from "@/lib/queries/order.query";
import MGButton from "@/components/global/shared/MGButton";
import { TOrderStatus } from "@/types/order.type";
import { ORDER_STATUS } from "@/constants";

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

  if (status === ORDER_STATUS.COMPLETED) {
    return (
      <span className="rounded-md bg-green-50 px-3 py-1 font-semibold text-green-500">
        Completed
      </span>
    );
  }

  if (status === ORDER_STATUS.CANCELLED) {
    return (
      <span className="rounded-md bg-red-50 px-3 py-1 font-semibold text-red-500">
        Canceled
      </span>
    );
  }

  return (
    <>
      {requested ? (
        <MGButton disabled className="bg-slate-200 text-slate-900">
          Cancel Requested
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
