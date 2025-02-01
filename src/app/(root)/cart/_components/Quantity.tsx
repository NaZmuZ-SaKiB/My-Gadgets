"use client";

import { useState } from "react";
import { Minus, Plus, X } from "lucide-react";

import { useCart } from "@/lib/providers/ContextProvider";

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
      <div className="inline-flex cursor-pointer items-center rounded-md border border-slate-500">
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

        <div className="p-1 text-center text-lg text-primary">{quantity}</div>

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
        className="size-5 cursor-pointer text-slate-500"
        onClick={() => removeFromCart(productId)}
      />
    </div>
  );
};

export default Quantity;
