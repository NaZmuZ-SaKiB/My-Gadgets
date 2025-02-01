"use client";

import { ClassValue } from "clsx";
import { useEffect, useState } from "react";
import { Check, ShoppingCart } from "lucide-react";

import MGButton from "../shared/MGButton";

import { cn } from "@/lib/utils";
import { useCart } from "@/lib/providers/ContextProvider";

import { TProduct } from "@/types/product.type";

type TProps = {
  product: TProduct;
  quantity?: number;
  size?: "sm" | "default";
  className?: ClassValue;
};

const ProductCardAddToCart = ({
  product,
  size = "default",
  quantity = 1,
  className,
}: TProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { cart, addToCart } = useCart();
  const isAdded = !!cart.find((item) => item._id === product._id);

  const handleClick = () => {
    if (!isAdded) {
      addToCart(product, quantity);
    }
  };

  if (!mounted) return null;

  return (
    <div className={cn(className)} onClick={handleClick}>
      <MGButton
        className={cn("gap-2 rounded-lg max-xs:h-8", {
          "cursor-not-allowed opacity-50": isAdded,
        })}
        size={size}
      >
        {mounted && !isAdded ? (
          <ShoppingCart className="size-3.5 xs:size-4" />
        ) : (
          <Check className="size-3.5 xs:size-4" />
        )}
        <span>{mounted && isAdded ? "Added" : "Add"}</span>
      </MGButton>
    </div>
  );
};

export default ProductCardAddToCart;
