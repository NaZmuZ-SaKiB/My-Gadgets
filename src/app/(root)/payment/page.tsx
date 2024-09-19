"use client";

import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { formatCurrency } from "@/utils/currencyFormat";
import { useCart } from "@/lib/providers/ContextProvider";
import PaymentCheckout from "./_components/PaymentCheckout";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
);

const PaymentPage = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { amount, orderId } = useCart();

  if (!mounted) return null;

  return (
    <div className="max-w-screen-sm mx-auto mt-5 p-10 text-slate-700 text-center rounded-xl border border-slate-300">
      <div className="mb-10">
        <h1 className="text-4xl font-semibold mb-2">Payment</h1>
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
