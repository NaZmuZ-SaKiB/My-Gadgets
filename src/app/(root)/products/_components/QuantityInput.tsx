"use client";

import MGButton from "@/components/global/shared/MGButton";
import { ShoppingCart } from "lucide-react";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";

const QuantityInput = () => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    if (quantity > 4) return;
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <div className="flex gap-2 flex-wrap">
      <div className="border border-primary rounded-lg inline-flex items-center">
        <button
          type="button"
          className="cursor-pointer p-2 outline-none focus-visible:bg-gray-100"
        >
          <Minus onClick={handleDecrement} className="size-5 text-primary" />
        </button>
        <div className="w-12 text-xl text-center p-2">{quantity}</div>

        <button
          type="button"
          className="cursor-pointer p-2 outline-none focus-visible:bg-gray-100"
        >
          <Plus onClick={handleIncrement} className="size-5 text-primary" />
        </button>
      </div>

      <MGButton className="h-full rounded-lg gap-2">
        <ShoppingCart className="max-xs:hidden" />
        <span>Add to Cart</span>
      </MGButton>
    </div>
  );
};

export default QuantityInput;
