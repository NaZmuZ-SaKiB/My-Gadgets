"use client";

import { toast } from "sonner";
import { useState } from "react";
import { Plus, Minus, ShoppingCart } from "lucide-react";
import MGButton from "@/components/global/shared/MGButton";

import { useCart } from "@/lib/providers/ContextProvider";
import { TProduct } from "@/types/product.type";

type TProps = {
  product: TProduct;
};

const QuantityInput = ({ product }: TProps) => {
  const [quantity, setQuantity] = useState(1);

  const max = product.quantity;

  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, quantity);

    setQuantity(1);

    toast.success("Product added to cart");
  };

  const handleIncrement = () => {
    if (quantity > max || quantity > 4) return;
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      <div className="inline-flex cursor-pointer items-center rounded-lg border border-primary">
        <button
          type="button"
          className="p-2 outline-none focus-visible:bg-slate-100"
          onClick={handleDecrement}
        >
          <Minus className="size-5 text-primary" />
        </button>
        <div className="w-12 p-2 text-center text-xl">{quantity}</div>

        <button
          type="button"
          className="cursor-pointer p-2 outline-none focus-visible:bg-slate-100"
          onClick={handleIncrement}
        >
          <Plus className="size-5 text-primary" />
        </button>
      </div>

      <MGButton className="h-full gap-2 rounded-lg" onClick={handleAddToCart}>
        <ShoppingCart className="max-xs:hidden" />
        <span>Add to Cart</span>
      </MGButton>
    </div>
  );
};

export default QuantityInput;
