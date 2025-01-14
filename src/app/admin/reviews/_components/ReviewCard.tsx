"use client";

import AFloatingBox from "@/components/admin/admin-ui/AFloatingBox";
import StarRatingComponent from "@/components/global/shared/StarRatingComponent";
import { TReview } from "@/types/review.type";
import Link from "next/link";
import { ChangeEvent } from "react";
import ReviewStatusSelect from "./ReviewStatusSelect";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import ReviewDeleteDialog from "./ReviewDeleteDialog";

type TProps = {
  review: TReview;
};

const ReviewCard = ({ review }: TProps) => {
  return (
    <AFloatingBox className="flex flex-1 basis-[300px] flex-col justify-between">
      <div>
        <div className="flex items-start justify-between">
          <div className="text-sm font-semibold">{review.user.name}</div>
          <div className="w-[70px]">
            <StarRatingComponent value={review.rating} readonly />
          </div>
        </div>

        <div className="mt-3 text-slate-700">
          <p className="text-sm">{review.comment}</p>
        </div>

        <div className="mt-3 text-xs">
          <span className="font-medium">Product:</span>{" "}
          <Link
            href={`/products/${review.product.slug}/${review.product._id}`}
            className="no-focus text-sky-600 hover:underline"
          >
            {review.product.name}
          </Link>
        </div>
      </div>

      <div className="mt-3 flex items-end justify-between">
        <div className="max-w-[170px]">
          <ReviewStatusSelect defaultValue={review.status} id={review._id} />
        </div>

        <ReviewDeleteDialog id={review._id}>
          <Button
            size="icon"
            className="no-focus group h-8 border border-red-300 bg-transparent text-red-500 hover:border-red-500 hover:bg-red-500"
          >
            <Trash2 className="size-4 group-hover:text-white" />
          </Button>
        </ReviewDeleteDialog>
      </div>
    </AFloatingBox>
  );
};

export default ReviewCard;
