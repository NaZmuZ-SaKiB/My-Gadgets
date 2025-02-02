import StarRatingComponent from "@/components/global/shared/StarRatingComponent";

import { cn } from "@/lib/utils";
import { TReview } from "@/types/review.type";

const ProductReviews = ({ reviews }: { reviews: TReview[] }) => {
  const approvedReviews = reviews.filter(
    (review) => review.status === "approved",
  );

  return (
    <section
      className={cn("mt-4 rounded-2xl bg-slate-50 p-2 xs:p-6", {
        hidden: !approvedReviews.length,
      })}
      id="reviews"
    >
      <h2 className="text-xl font-semibold text-slate-700">Reviews</h2>

      {approvedReviews.map((review) => (
        <div key={review._id} className="mt-4 rounded-lg bg-white p-4">
          <div className="flex justify-between">
            <span className="font-semibold text-slate-700">
              {review.user.name}
            </span>
            <span className="w-[100px]">
              <StarRatingComponent value={review.rating} readonly />
            </span>
          </div>
          <pre className="mt-3 font-inherit text-sm text-slate-700">
            {review.comment}
          </pre>
        </div>
      ))}
    </section>
  );
};

export default ProductReviews;
