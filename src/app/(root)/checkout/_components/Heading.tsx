"use client";

import { useEffect, useState } from "react";

import { useCart } from "@/lib/providers/ContextProvider";

const Heading = () => {
  const [mounted, setMounted] = useState(false);
  const { cart } = useCart();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted)
    return (
      <>
        <h1 className="text-3xl font-semibold text-slate-700">Checkout</h1>
        <p className="mt-3 h-5 w-[230px] animate-pulse rounded-full bg-slate-200"></p>
      </>
    );
  return (
    <>
      <h1 className="text-3xl font-semibold text-slate-700">Checkout</h1>
      <p className="mt-1 text-sm font-semibold text-slate-500 sm:text-base">
        You have <span className="text-primary">{cart.length}</span> product
        {cart.length > 1 ? "s" : ""} in the cart
      </p>
    </>
  );
};

export default Heading;
