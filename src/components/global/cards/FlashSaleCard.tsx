import Link from "next/link";
import Image from "next/image";

import AddToCartButton from "../shared/ProductCardAddToCart";
import CountDownTimer from "../shared/CountDownTimer";

import { TProduct } from "@/types/product.type";
import { formatCurrency } from "@/utils/currencyFormat";

const FlashSaleCard = ({
  product,
  endDate,
}: {
  product: TProduct;
  endDate: string | Date;
}) => {
  return (
    <div className="group">
      <div className="relative cursor-pointer overflow-hidden rounded-2xl border border-slate-300">
        <div className="relative mx-auto aspect-square w-[90%]">
          <Image
            src={product.images[0].secureUrl}
            alt={product.model}
            fill
            className="object-contain object-center p-5"
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-slate-900 bg-opacity-10"></div>
      </div>

      <div className="relative mx-auto -mt-[8rem] w-[90%] transition-all duration-300 ease-in-out group-hover:-mt-[8.5rem]">
        <div className="relative z-10 mb-4 px-4">
          <CountDownTimer endTime={endDate} />
        </div>

        <div className="flex h-[11rem] flex-col justify-between rounded-xl border border-slate-50 bg-white p-3 shadow-lg sm:h-[10rem] sm:p-5">
          <Link href={`/products/${product.slug}/${product._id}`}>
            <h3 className="mb-3 cursor-pointer font-bold text-slate-700 underline-offset-2 hover:underline max-xs:text-center">
              {product.name.slice(0, 100)}
              {product.name.length > 100 && "..."}
            </h3>
          </Link>

          <div className="flex items-end justify-between gap-4 max-xs:flex-col max-xs:items-center">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="text-xl font-bold text-primary">
                {formatCurrency(product.salePrice)}
              </span>
              <span className="text-sm font-semibold text-slate-500 line-through decoration-2">
                {formatCurrency(product.regularPrice)}
              </span>
            </div>
            <AddToCartButton product={product} quantity={1} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashSaleCard;
