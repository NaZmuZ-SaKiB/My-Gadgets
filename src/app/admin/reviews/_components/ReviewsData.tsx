"use client";

import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";

import ReviewCard from "./ReviewCard";
import MGPagination from "@/components/global/shared/MGPagination";
import AFloatingBox from "@/components/admin/admin-ui/AFloatingBox";
import DataLimitSelect from "@/components/admin/shared/filters/DataLimitSelect";
import DataSortBySelect from "@/components/admin/shared/filters/DataSortBySelect";
import DataSortOrderSelect from "@/components/admin/shared/filters/DataSortOrderSelect";

import { reviewSortOptions } from "@/constants";
import { useReviewGetAllQuery } from "@/lib/queries/review.query";
import { TReview } from "@/types/review.type";

const ReviewsData = () => {
  const searchParams = useSearchParams();
  const { data, isLoading } = useReviewGetAllQuery(searchParams.toString());
  const reviews: TReview[] = data?.data || [];

  if (isLoading) {
    return (
      <div className="grid flex-1 place-items-center">
        <Loader2 className="mx-auto size-[50px] animate-spin text-primary-hover" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <AFloatingBox className="flex flex-col gap-2">
        <div className="flex flex-wrap gap-2">
          <div className="sm:hidden">
            <DataLimitSelect />
          </div>

          <DataSortBySelect options={reviewSortOptions} />

          <DataSortOrderSelect />
        </div>
      </AFloatingBox>

      <div className="flex flex-wrap gap-3">
        {reviews.map((review) => (
          <ReviewCard key={`${review._id}`} review={review} />
        ))}
      </div>

      <div className="mt-5 flex items-center justify-center gap-3 sm:justify-between">
        <div className="max-sm:hidden">
          <DataLimitSelect />
        </div>
        <MGPagination
          admin
          limit={data?.meta?.limit as number}
          page={data?.meta?.page as number}
          total={data?.meta?.total as number}
        />
      </div>
    </div>
  );
};

export default ReviewsData;
