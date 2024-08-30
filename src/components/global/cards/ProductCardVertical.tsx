import { TProduct } from "@/types/product.type";
import { formatCurrency } from "@/utils/currencyFormat";
import Image from "next/image";
import Link from "next/link";

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
        } p-2 rounded-xl overflow-hidden border border-slate-300 relative`}
      >
        <Image
          src={product.images?.[0]?.secureUrl}
          alt={product.model}
          fill
          className="object-contain object-center"
        />
      </div>

      <div className="flex-1 flex flex-col justify-between py-2">
        <Link href={`/products/${product.slug}/${product._id}`}>
          <h3 className="font-bold text-slate-700 hover:underline underline-offset-2 cursor-pointer mb-2">
            {product.name.slice(0, 100)}
            {product.name.length > 100 && "..."}
          </h3>
        </Link>
        <div className="flex items-center gap-3">
          <span className="font-bold text-primary-1 text-xl">
            {formatCurrency(product.salePrice)}
          </span>
          <span className="text-slate-400 line-through decoration-2 font-semibold text-sm">
            {formatCurrency(product.regularPrice)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCardVertical;
