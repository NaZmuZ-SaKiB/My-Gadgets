"use client";

import Link from "next/link";
import { ChangeEvent } from "react";
import { Loader2, Trash2 } from "lucide-react";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import ReviewStatusSelect from "./ReviewStatusSelect";
import AFloatingBox from "@/components/admin/admin-ui/AFloatingBox";

import { TReview } from "@/types/review.type";
import { useReviewGetAllQuery } from "@/lib/queries/review.query";

type TProps = {
  selectedReviews: string[];
  setSelectedReviews: (value: string[]) => void;
};

const ReviewsTable = ({ selectedReviews, setSelectedReviews }: TProps) => {
  const searchParams = useSearchParams();
  const { data, isLoading } = useReviewGetAllQuery(searchParams.toString());

  // Handle Select
  const selectAll = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedReviews(data?.data?.map((item: any) => item._id) || []);
    } else {
      setSelectedReviews([]);
    }
  };

  const handleSelect = (e: ChangeEvent<HTMLInputElement>, id: string) => {
    if (e.target.checked) {
      setSelectedReviews([...selectedReviews, id]);
    } else {
      setSelectedReviews(selectedReviews.filter((item) => item !== id));
    }
  };
  // End Handle Select

  if (isLoading) {
    return (
      <AFloatingBox className="grid flex-1 place-items-center">
        <Loader2 className="mx-auto size-[50px] animate-spin text-primary-hover" />
      </AFloatingBox>
    );
  }

  return (
    <AFloatingBox className="overflow-x-auto">
      <table className="admin-table min-w-[600px] table-auto">
        <thead className="text-left">
          <tr>
            <th>
              <span className="inline-flex rounded bg-white p-[2px]">
                <input
                  type="checkbox"
                  onChange={selectAll}
                  className="no-focus size-3.5"
                />
              </span>
            </th>
            <th>Name</th>
            <th>Product</th>
            <th>Rating</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {data?.data?.map((item: TReview) => (
            <tr key={`${item._id}`}>
              <td>
                <input
                  checked={selectedReviews.includes(item._id)}
                  type="checkbox"
                  onChange={(e) => handleSelect(e, item._id)}
                  className="no-focus size-4"
                />
              </td>
              <td>{item.user.name}</td>
              <td>
                <Link
                  href={`/admin/products/${item.product._id}`}
                  className="no-focus hover:underline"
                >
                  {item.product.name}
                </Link>
              </td>
              <td>
                {item.rating} star{item.rating > 1 && "s"}
              </td>
              <td>
                <ReviewStatusSelect defaultValue={item.status} id={item._id} />
              </td>
              <td>
                <div className="flex justify-end gap-1 max-md:flex-wrap">
                  <Button
                    size="icon"
                    className="no-focus group h-8 border border-red-300 bg-transparent text-red-500 hover:border-red-500 hover:bg-red-500"
                  >
                    <Trash2 className="size-4 group-hover:text-white" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}

          {data?.data?.length === 0 && (
            <tr>
              <td colSpan={9} className="text-center text-xl">
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </AFloatingBox>
  );
};

export default ReviewsTable;
