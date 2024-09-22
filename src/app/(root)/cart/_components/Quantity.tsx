"use client";

import { useCart } from "@/lib/providers/ContextProvider";
import { Minus, Plus, X } from "lucide-react";
import { useState } from "react";

type TProps = {
  defaultValue: number;
  productId: string;
  maxQuantity: number;
};

const Quantity = ({ defaultValue, productId, maxQuantity }: TProps) => {
  const [quantity, setQuantity] = useState(defaultValue);

  const { plusToCart, minusFromCart, removeFromCart } = useCart();

  return (
    <div className="flex items-center gap-3">
      <div className="cursor-pointer border border-slate-500 rounded-md inline-flex items-center">
        <button
          type="button"
          className="p-1 outline-none focus-visible:bg-slate-100"
          onClick={() => {
            minusFromCart(productId);
            setQuantity((prev) => prev - 1);
          }}
        >
          <Minus className="size-5 text-slate-500" />
        </button>

        <div className="text-lg text-center text-primary p-1">{quantity}</div>

        <button
          type="button"
          className="cursor-pointer p-1 outline-none focus-visible:bg-slate-100"
          onClick={() => {
            plusToCart(productId);
            setQuantity((prev) => prev + 1);
          }}
        >
          <Plus className="size-5 text-slate-500" />
        </button>
      </div>

      <X
        className="cursor-pointer text-slate-500 size-5"
        onClick={() => removeFromCart(productId)}
      />
    </div>
  );
};

export default Quantity;
