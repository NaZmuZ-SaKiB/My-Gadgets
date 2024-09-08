"use client";

import AFloatingBox from "@/components/admin/admin-ui/AFloatingBox";
import { Button } from "@/components/ui/button";
import { useReviewGetAllQuery } from "@/lib/queries/review.query";
import { TReview } from "@/types/review.type";
import { Loader2, Trash2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ChangeEvent } from "react";

type TProps = {
  selectedReviews: string[];
  setSelectedReviews: (value: string[]) => void;
};

const ReviewsTable = ({ selectedReviews, setSelectedReviews }: TProps) => {
  const searchParams = useSearchParams();
  const { data, isLoading } = useReviewGetAllQuery(searchParams.toString());

  console.log(data);
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
      <AFloatingBox className="flex-1 grid place-items-center">
        <Loader2 className="animate-spin mx-auto size-[50px] text-primary-hover" />
      </AFloatingBox>
    );
  }

  return (
    <AFloatingBox className="overflow-x-auto">
      <table className="table-auto admin-table min-w-[600px]">
        <thead className="text-left">
          <tr>
            <th>
              <span className="bg-white inline-flex p-[2px] rounded">
                <input
                  type="checkbox"
                  onChange={selectAll}
                  className="size-3.5 no-focus"
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
                  className="size-4 no-focus"
                />
              </td>
              <td>{item.user.name}</td>
              <td>
                <Link
                  href={`/admin/products/${item._id}`}
                  className="hover:underline"
                >
                  {item.product.name}
                </Link>
              </td>
              <td>
                {item.rating} star{item.rating > 1 && "s"}
              </td>
              <td>{item.status}</td>
              <td>
                <div className="flex gap-1 justify-end max-md:flex-wrap">
                  <Button
                    size="icon"
                    className="h-8 no-focus bg-transparent border border-red-300 text-red-500 hover:bg-red-500 hover:border-red-500 group"
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
