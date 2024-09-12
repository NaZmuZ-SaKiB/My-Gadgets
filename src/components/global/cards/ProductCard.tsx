import { TProduct } from "@/types/product.type";
import { formatCurrency } from "@/utils/currencyFormat";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import AddToCartButton from "../shared/ProductCardAddToCart";

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
      100
  );

  return (
    <div className="flex flex-col border border-slate-200 rounded-xl overflow-hidden hover:border-primary-2 relative h-full">
      <div className="relative w-full aspect-square">
        <Image
          src={product?.images?.[0].secureUrl}
          alt={product?.model}
          fill
          className="p-2 sm:p-6 sm:pb-0 aspect-square object-contain"
        />
      </div>

      <div
        className={cn("p-2 sm:p-5 sm:pt-2 flex-1 flex flex-col", {
          "justify-between gap-3": !showDescription,
        })}
      >
        <Link href={`/products/${product.slug}/${product._id}`}>
          <h3 className="font-semibold text-slate-700 max-xs:text-sm hover:underline underline-offset-2 cursor-pointer">
            {product?.name}
          </h3>
        </Link>

        <div
          className={cn({
            "flex-1 flex flex-col justify-between": showDescription,
          })}
        >
          {showDescription && (
            <div
              dangerouslySetInnerHTML={{
                __html: product.shortDescription,
              }}
              className="mt-3 ml-3 mb-3 max-sm:px-3 text-xs text-gray-700 leading-5 [&>ul]:list-disc"
            />
          )}

          <div className="flex max-xs:flex-col max-xs:items-center justify-between gap-4 items-end">
            <div className="flex items-center gap-x-3 flex-wrap">
              <span className="font-bold text-primary text-xl">
                {formatCurrency(product.salePrice)}
              </span>
              <span className="text-slate-400 line-through decoration-2 font-semibold text-sm">
                {formatCurrency(product.regularPrice)}
              </span>
            </div>
            <AddToCartButton product={product} quantity={1} />
          </div>
        </div>
      </div>

      <span
        className={`absolute top-0 left-0 text-white text-sm font-semibold py-1.5 px-4 rounded-br-2xl ${color}`}
      >
        {product.badgeText || "- " + discount + "%"}
      </span>
    </div>
  );
};

export default ProductCard;
