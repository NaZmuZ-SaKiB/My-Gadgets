"use client";

import { useCart } from "@/lib/providers/ContextProvider";
import { cn } from "@/lib/utils";
import { TProduct } from "@/types/product.type";
import { ClassValue } from "clsx";
import MGButton from "../shared/MGButton";
import { Check, ShoppingCart } from "lucide-react";

type TProps = {
  product: TProduct;
  quantity?: number;
  className?: ClassValue;
};

const ProductCardAddToCart = ({ product, quantity = 1, className }: TProps) => {
  const { cart, addToCart } = useCart();
  const isAdded = !!cart.find((item) => item._id === product._id);

  const handleClick = () => {
    if (!isAdded) {
      addToCart(product, quantity);
    }
  };

  return (
    <div className={cn(className)} onClick={handleClick}>
      <MGButton
        className={cn("rounded-lg gap-2", {
          "opacity-50 cursor-not-allowed": isAdded,
        })}
      >
        {!isAdded ? (
          <ShoppingCart className="size-3 xs:size-4" />
        ) : (
          <Check className="size-3 xs:size-4" />
        )}
        <span>{isAdded ? "Added" : "Add"}</span>
      </MGButton>
    </div>
  );
};

export default ProductCardAddToCart;
