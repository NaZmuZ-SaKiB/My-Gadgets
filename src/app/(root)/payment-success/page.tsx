"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Check, Loader2 } from "lucide-react";

import MGButton from "@/components/global/shared/MGButton";

import { useCart } from "@/lib/providers/ContextProvider";
import { runFireWorks } from "@/utils/runFireworks";

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

  if (!mounted)
    return (
      <div className="grid min-h-[90svh] place-items-center">
        <Loader2 className="size-14 animate-spin text-primary" />
      </div>
    );

  return (
    <div className="grid min-h-[70svh] place-items-center p-4 max-sm:min-h-[90svh] md:min-h-[60svh]">
      <div className="mx-auto flex w-full max-w-screen-lg flex-col items-center justify-center rounded-xl bg-slate-50 px-4 py-12 sm:p-12">
        <p>
          <Check className="size-10 text-primary" />
        </p>
        <h2 className="mt-4 text-center text-2xl font-semibold capitalize text-slate-700 sm:text-3xl">
          Thank You For Your Order!
        </h2>
        <p className="mt-1 text-center font-semibold text-slate-700">
          Check Your Email Inbox for the recept.
        </p>
        <p className="mt-6 text-center font-semibold text-slate-700">
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
