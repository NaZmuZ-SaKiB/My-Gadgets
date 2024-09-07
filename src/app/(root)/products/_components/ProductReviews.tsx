import StarRatingComponent from "@/components/global/shared/StarRatingComponent";
import { cn } from "@/lib/utils";
import { TReview } from "@/types/review.type";

const ProductReviews = ({ reviews }: { reviews: TReview[] }) => {
  const approvedReviews = reviews.filter(
    (review) => review.status === "approved"
  );

  return (
    <section
      className={cn("mt-4 p-2 xs:p-6 bg-slate-50 rounded-2xl", {
        hidden: !approvedReviews.length,
      })}
    >
      <h2 className="text-xl text-slate-700 font-semibold">Reviews</h2>

      {approvedReviews.map((review) => (
        <div key={review._id} className="bg-white rounded-lg p-4 mt-4">
          <div className="flex justify-between">
            <span className="text-slate-700 font-semibold">
              {review.user.name}
            </span>
            <span className="w-[100px]">
              <StarRatingComponent value={review.rating} readonly />
            </span>
          </div>
          <pre className="text-slate-700 text-sm font-inherit mt-3">
            {review.comment}
          </pre>
        </div>
      ))}
    </section>
  );
};

export default ProductReviews;
