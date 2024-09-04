import { TProduct } from "@/types/product.type";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import CountDownTimer from "../shared/CountDownTimer";
import Link from "next/link";
import { formatCurrency } from "@/utils/currencyFormat";
import MGButton from "../shared/MGButton";

const FlashSaleCard = ({
  product,
  endDate,
}: {
  product: TProduct;
  endDate: string | Date;
}) => {
  return (
    <div className="group">
      <div className="border border-slate-300 rounded-2xl overflow-hidden relative cursor-pointer">
        <div className="relative w-[90%] mx-auto aspect-square">
          <Image
            src={product.images[0].secureUrl}
            alt={product.model}
            fill
            className="p-5 object-contain object-center"
          />
        </div>
        <div className="absolute left-0 top-0 right-0 bottom-0 bg-slate-900 bg-opacity-10"></div>
      </div>

      <div className="w-[90%] mx-auto -mt-[8rem] relative group-hover:-mt-[8.5rem] transition-all duration-300 ease-in-out">
        <div className="relative z-10 px-4 mb-4">
          <CountDownTimer endTime={endDate} />
        </div>

        <div className="bg-white p-3 sm:p-5 flex h-[11rem] sm:h-[10rem] flex-col justify-between border border-slate-50 shadow-lg rounded-xl">
          <Link href={`/products/${product.slug}/${product._id}`}>
            <h3 className="font-bold text-slate-700 mb-3 max-xs:text-center hover:underline underline-offset-2 cursor-pointer">
              {product.name.slice(0, 100)}
              {product.name.length > 100 && "..."}
            </h3>
          </Link>

          <div className="flex max-xs:flex-col max-xs:items-center justify-between gap-4 items-end">
            <div className="flex items-center gap-y-1 gap-x-3 flex-wrap">
              <span className="font-bold text-primary text-xl">
                {formatCurrency(product.salePrice)}
              </span>
              <span className="text-slate-500 line-through decoration-2 font-semibold text-sm">
                {formatCurrency(product.regularPrice)}
              </span>
            </div>
            <MGButton className="rounded-md gap-2">
              <ShoppingCart className="size-3 xs:size-4" />
              <span>Add</span>
            </MGButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashSaleCard;
