"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/lib/providers/ContextProvider";

const Heading = () => {
  const [mounted, setMounted] = useState(false);
  const { cart } = useCart();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <>
      <h1 className="text-3xl font-semibold text-slate-700">Checkout</h1>
      <p className="text-slate-500 font-semibold mt-1 text-sm sm:text-base">
        You have <span className="text-primary">{cart.length}</span> product
        {cart.length > 1 ? "s" : ""} in the cart
      </p>
    </>
  );
};

export default Heading;
