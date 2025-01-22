"use client";

import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { formatCurrency } from "@/utils/currencyFormat";
import { useCart } from "@/lib/providers/ContextProvider";
import PaymentCheckout from "./_components/PaymentCheckout";
import { Loader2 } from "lucide-react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string,
);

const PaymentPage = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { amount, orderId } = useCart();

  if (!mounted)
    return (
      <div className="grid min-h-[90svh] place-items-center">
        <Loader2 className="size-14 animate-spin text-primary" />
      </div>
    );

  return (
    <div className="mx-auto mt-5 max-w-screen-sm rounded-xl border border-slate-300 p-10 text-center text-slate-700">
      <div className="mb-10">
        <h1 className="mb-2 text-4xl font-semibold">Payment</h1>
        <h2 className="text-2xl">Amount {formatCurrency(amount)}</h2>
      </div>

      <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          amount: amount * 100,
          currency: "bdt",
        }}
      >
        <PaymentCheckout amount={amount} orderId={orderId} />
      </Elements>
    </div>
  );
};

export default PaymentPage;
