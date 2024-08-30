import { TProduct } from "@/types/product.type";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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
    <div className="flex flex-col border-2 border-slate-200 rounded-xl overflow-hidden hover:border-primary-2 relative h-full">
      <div className="relative w-full aspect-square">
        <Image
          src={product?.images?.[0].secureUrl}
          alt={product?.model}
          fill
          className="p-2 sm:p-6 sm:pb-0 aspect-square object-contain"
        />
      </div>

      <div className="p-2 sm:p-5 flex-1 flex flex-col justify-between">
        <Link href={`/products/${product.slug}/${product._id}`}>
          <h3 className="font-bold text-slate-700 max-xs:text-sm hover:underline underline-offset-2 cursor-pointer">
            {product?.name}
          </h3>
        </Link>

        <div className="mb-3 max-sm:px-3">
          <div className={`${showDescription ? "" : "hidden"}`}>
            <ul className="mt-2 text-sm list-disc ml-2">
              <li>Processor Type. - Core i5</li>
              <li>Generation - 11th (Intel)</li>
              <li>RAM - 8GB</li>
              <li>Storage - 512GB SSD</li>
              <li>Graphics Memory - Shared</li>
            </ul>
          </div>
        </div>
        <div className="flex max-xs:flex-col max-xs:items-center justify-between gap-4 items-end">
          <div className="flex items-center gap-y-1 gap-x-3 flex-wrap">
            <span className="font-bold text-primary-1 text-xl">
              {product.salePrice}৳
            </span>
            <span className="text-slate-400 line-through decoration-2 font-semibold text-sm">
              {product.regularPrice}৳
            </span>
          </div>
          <button className="flex font-semibold justify-center max-xs:w-full items-center gap-2 rounded-md bg-primary-3 hover:bg-primary-1 text-primary-1 hover:text-primary-3 px-4 py-1.5 max-xs:text-sm transition-all duration-300 no-focus">
            <ShoppingCart className="size-3 xs:size-4" />
            <span>Add</span>
          </button>
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
