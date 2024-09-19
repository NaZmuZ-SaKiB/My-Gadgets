"use client";

import MGButton from "@/components/global/shared/MGButton";
import { useCart } from "@/lib/providers/ContextProvider";
import { runFireWorks } from "@/utils/runFireworks";
import { Check } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const PaymentSuccessPage = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { clearCart, setAmount, setOrderId } = useCart();

  useEffect(() => {
    setAmount(0);
    setOrderId("");
    clearCart();
    runFireWorks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!mounted) return null;

  return (
    <div className="max-sm:min-h-[90svh] min-h-[70svh] md:min-h-[60svh] grid place-items-center p-4">
      <div className="w-full max-w-screen-lg mx-auto bg-slate-50 px-4 py-12 sm:p-12 rounded-xl flex flex-col justify-center items-center">
        <p>
          <Check className="size-10 text-primary" />
        </p>
        <h2 className="capitalize mt-4 font-semibold text-2xl sm:text-3xl text-slate-700 text-center">
          Thank You For Your Order!
        </h2>
        <p className="text-center mt-1 text-slate-700 font-semibold">
          Check Your Email Inbox for the recept.
        </p>
        <p className="font-semibold text-slate-700 text-center mt-6">
          If you have any questions, please email{" "}
          <span className="text-primary-hover">order@my.gadgets.com</span>
        </p>
        <Link href={"/"} className="mt-8">
          <MGButton className="px-10">Continue Shopping</MGButton>
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
