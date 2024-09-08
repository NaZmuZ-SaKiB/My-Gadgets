"use client";

import AFloatingBox from "@/components/admin/admin-ui/AFloatingBox";
import DataLimitSelect from "@/components/admin/shared/filters/DataLimitSelect";
import DataSearchBox from "@/components/admin/shared/filters/DataSearchBox";
import DataSortBySelect from "@/components/admin/shared/filters/DataSortBySelect";
import DataSortOrderSelect from "@/components/admin/shared/filters/DataSortOrderSelect";
import SelectedItemsCount from "@/components/admin/shared/SelectedItemsCount";
import { reviewSortOptions } from "@/constants";
import ReviewsTable from "./ReviewsTable";
import { useState } from "react";

const ReviewsData = () => {
  const [selectedReviews, setSelectedReviews] = useState<string[]>([]);
  return (
    <div className="flex flex-col gap-3">
      <AFloatingBox className="flex flex-col gap-2">
        <div className="flex gap-2 flex-wrap">
          <SelectedItemsCount count={selectedReviews.length} />

          {/* Review Delete Dialog  */}

          <div className="sm:hidden">
            <DataLimitSelect />
          </div>

          <DataSortBySelect options={reviewSortOptions} />

          <DataSortOrderSelect />
        </div>

        <DataSearchBox />
      </AFloatingBox>

      <ReviewsTable
        selectedReviews={selectedReviews}
        setSelectedReviews={setSelectedReviews}
      />
    </div>
  );
};

export default ReviewsData;
