"use client";

import { icons } from "@/constants";
import { useGlobalContext } from "@/lib/providers/ContextProvider";
import Image from "next/image";

const Cart = () => {
  const { cart } = useGlobalContext();
  return (
    <div className="h-full relative">
      <Image src={icons.cart} alt="cart" className="size-6 mx-auto" />
      <span className="hidden xl:block text-sm">Cart</span>

      <span className="absolute size-[22px] text-[11px] text-white bg-slate-600 rounded-full grid place-items-center -top-2 -right-3">
        {cart.length}
      </span>
    </div>
  );
};

export default Cart;
