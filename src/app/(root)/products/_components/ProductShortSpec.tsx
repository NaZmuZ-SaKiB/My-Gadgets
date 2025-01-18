import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TProduct } from "@/types/product.type";
import { formatCurrency } from "@/utils/currencyFormat";
import { Heart, Shuffle } from "lucide-react";
import QuantityInput from "./QuantityInput";
import StarRatingComponent from "@/components/global/shared/StarRatingComponent";
import { TReview } from "@/types/review.type";
import CompareButton from "@/components/global/shared/CompareButton";

type TProps = {
  product: TProduct;
  reviews: TReview[];
};

const ProductShortSpec = ({ product, reviews }: TProps) => {
  const discount = Math.floor(
    ((Number(product.regularPrice) - Number(product.salePrice)) /
      Number(product.regularPrice)) *
      100,
  );

  const avgRating =
    reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  return (
    <div>
      <h1 className="text-3xl font-semibold leading-10 text-slate-700">
        {product.name}
      </h1>

      <div
        className={cn("mt-3 w-[100px]", {
          hidden: !reviews.length,
        })}
      >
        <StarRatingComponent readonly value={avgRating} />
      </div>

      {/* Price section  */}
      <div className="mt-5 flex items-end gap-5">
        <span className="text-5xl font-bold text-primary">
          {formatCurrency(product.salePrice)}
        </span>
        <span className="flex flex-col justify-end font-semibold">
          <span className="text-sm text-yellow-500">{discount}% Off</span>
          <span className="text-xl text-slate-400 line-through">
            {formatCurrency(product.regularPrice)}
          </span>
        </span>
      </div>

      {/* Stock Status  */}
      <div className="mt-8 inline-flex gap-2 rounded-lg bg-slate-100 px-4 py-2 font-semibold text-slate-500">
        <span>Availability:</span>
        <span
          className={cn("font-bold text-slate-700", {
            "text-primary": product.quantity > 0,
          })}
        >
          {product.quantity > 0 ? "In Stock" : "Out of Stock"}
        </span>
      </div>

      {/* Short Description  */}
      <div className="mt-5 text-slate-700">
        <h3 className="text-lg font-semibold">Quick Overview</h3>
        <div
          dangerouslySetInnerHTML={{
            __html: product.shortDescription,
          }}
          className="ml-5 mt-2 text-sm leading-7 [&>ul]:list-disc"
        />
      </div>

      {/* Add to Cart Button  */}
      <div className="mt-5 flex flex-wrap gap-2">
        <QuantityInput max={product.quantity} />

        <div className="flex gap-2">
          <div>
            <Button
              variant="outline"
              className="focus-visible:ring-primary-1 hover:bg-primary-1 hover:text-primary-3 h-full border-slate-300 px-3 text-slate-500"
            >
              <Heart />
            </Button>
          </div>

          <div>
            <CompareButton product={product} className="h-full text-slate-500">
              <Button
                variant="outline"
                className="focus-visible:ring-primary-1 hover:bg-primary-1 hover:text-primary-3 h-full border-slate-300 px-3"
              >
                <Shuffle />
              </Button>
            </CompareButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductShortSpec;
