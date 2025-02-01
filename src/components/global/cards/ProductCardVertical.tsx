import Link from "next/link";
import Image from "next/image";

import { TProduct } from "@/types/product.type";
import { formatCurrency } from "@/utils/currencyFormat";

type TProps = {
  product: TProduct;
  size?: "sm" | "md";
};

const ProductCardVertical = ({ product, size = "md" }: TProps) => {
  return (
    <div className="flex items-center gap-4">
      <div
        className={`${
          size === "sm" ? "size-24" : "size-28"
        } relative overflow-hidden rounded-xl border border-slate-300 p-2`}
      >
        <Image
          src={product.images?.[0]?.secureUrl}
          alt={product.model}
          fill
          className="object-contain object-center"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between py-2">
        <Link href={`/products/${product.slug}/${product._id}`}>
          <h3 className="mb-2 cursor-pointer font-semibold text-slate-700 underline-offset-2 hover:underline">
            {product.name.slice(0, 100)}
            {product.name.length > 100 && "..."}
          </h3>
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold text-primary">
            {formatCurrency(product.salePrice)}
          </span>
          <span className="text-sm font-semibold text-slate-400 line-through decoration-2">
            {formatCurrency(product.regularPrice)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCardVertical;
