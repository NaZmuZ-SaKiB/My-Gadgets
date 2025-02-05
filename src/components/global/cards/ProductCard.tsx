import Link from "next/link";
import Image from "next/image";

import AddToCartButton from "../shared/ProductCardAddToCart";
import CompareButton from "../shared/CompareButton";
import WishlistButton from "../shared/WishlistButton";

import { formatCurrency } from "@/utils/currencyFormat";
import { TProduct } from "@/types/product.type";
import { cn } from "@/lib/utils";

type TProps = {
  product: TProduct;
  showDescription?: boolean;
};

const ProductCard = ({ product, showDescription = true }: TProps) => {
  const badgeColors = [
    "bg-pink-400",
    "bg-blue-400",
    "bg-orange-400",
    "bg-green-400",
  ];

  const color = product.badgeText ? badgeColors[1] : badgeColors[0];

  const discount = Math.floor(
    ((Number(product.regularPrice) - Number(product.salePrice)) /
      Number(product.regularPrice)) *
      100,
  );

  return (
    <div className="hover:border-primary-2 group relative flex h-full flex-col overflow-hidden rounded-xl border border-slate-200">
      <div className="relative aspect-square w-full max-xs:h-[150px]">
        <Image
          src={product?.images?.[0].secureUrl}
          alt={product?.model}
          fill
          className="aspect-square object-contain p-2 sm:p-6 sm:pb-0"
        />
      </div>

      <div
        className={cn("flex flex-1 flex-col p-2 sm:p-5 sm:pt-2", {
          "justify-between gap-3": !showDescription,
        })}
      >
        <Link href={`/products/${product.slug}/${product._id}`}>
          <h3 className="cursor-pointer font-semibold text-slate-700 underline-offset-2 hover:underline max-xs:text-sm">
            {product?.name}
          </h3>
        </Link>

        <div
          className={cn({
            "flex flex-1 flex-col justify-between": showDescription,
          })}
        >
          {showDescription && (
            <div
              dangerouslySetInnerHTML={{
                __html: product.shortDescription,
              }}
              className="mb-3 ml-3 mt-3 text-[10px] leading-5 text-gray-700 max-sm:px-3 sm:text-xs [&>ul]:list-disc"
            />
          )}

          <div className="flex items-end justify-between gap-4 max-md:flex-col max-md:items-center">
            <div className="flex flex-wrap items-center gap-x-3">
              <span className="text-xl font-bold text-primary">
                {formatCurrency(product.salePrice)}
              </span>
              <span className="text-sm font-semibold text-slate-400 line-through decoration-2">
                {formatCurrency(product.regularPrice)}
              </span>
            </div>

            <AddToCartButton product={product} quantity={1} />
          </div>
        </div>
      </div>

      <span
        className={`absolute left-0 top-0 rounded-br-2xl px-4 py-1.5 text-sm font-semibold text-white ${color}`}
      >
        {product.badgeText || "- " + discount + "%"}
      </span>

      <div className="absolute right-0 top-0 flex flex-col items-center rounded-bl-md bg-white text-gray-500 shadow-xl transition-all md:-right-full md:group-hover:right-0">
        <WishlistButton
          productId={`${product._id}`}
          className="p-2 hover:text-slate-900"
        />
        <CompareButton product={product} className="p-2 hover:text-slate-900" />
      </div>
    </div>
  );
};

export default ProductCard;
