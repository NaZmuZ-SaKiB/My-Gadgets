"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AQTags, productReviewStatusOptions } from "@/constants";
import { useReviewUpdateMutation } from "@/lib/queries/review.query";
import { TReviewStatus } from "@/types/review.type";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type TProps = {
  defaultValue: TReviewStatus;
  id: string;
};

const ReviewStatusSelect = ({ defaultValue, id }: TProps) => {
  const queryClient = useQueryClient();

  const { mutateAsync: updateReview, isPending } = useReviewUpdateMutation();

  const handleChange = async (value: TReviewStatus) => {
    try {
      const result = await updateReview({ id, payload: { status: value } });

      if (result?.success) {
        queryClient.invalidateQueries({
          queryKey: [AQTags.REVIEW],
          exact: false,
        });

        toast.success(result?.message);
      } else {
        toast.error(result?.message || "A server error occurred.");
      }
    } catch (error: any) {
      toast.error(error?.message || "A client error occurred.");
    }
  };

  return (
    <Select
      defaultValue={defaultValue}
      onValueChange={(value) => handleChange(value as TReviewStatus)}
      disabled={isPending}
    >
      <SelectTrigger className="no-focus">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {productReviewStatusOptions.map((status) => (
          <SelectItem key={status} value={status}>
            {status}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default ReviewStatusSelect;
