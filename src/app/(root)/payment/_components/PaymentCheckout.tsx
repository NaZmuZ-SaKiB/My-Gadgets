"use client";

import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

import { useOrderUpdateMutation } from "@/lib/queries/order.query";
import { formatCurrency } from "@/utils/currencyFormat";
import { frontendUrl } from "@/constants";

const PaymentCheckout = ({
  amount,
  orderId,
}: {
  amount: number;
  orderId: string;
}) => {
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const router = useRouter();

  const { mutateAsync: updateOrder } = useOrderUpdateMutation();

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: amount * 100 }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [amount]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      toast.error(submitError.message);
      setLoading(false);
      return;
    }

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${frontendUrl}/payment-success`,
      },
      redirect: "if_required",
    });

    if (error) {
      toast.error(error?.message);
    } else {
      try {
        await updateOrder({
          id: orderId,
          payload: {
            isPaid: true,
            transactionId: paymentIntent.id,
            paidAt: new Date(),
            paymentResult: JSON.stringify(paymentIntent),
          },
        });

        router.push("/payment-success");
      } catch (error: any) {
        console.log(error);
      }
    }

    setLoading(false);
  };

  if (!clientSecret || !stripe || !elements) {
    return (
      <div className="grid place-items-center">
        <LoaderCircle className="size-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-md bg-white p-2">
      {clientSecret && <PaymentElement />}

      <button
        disabled={!stripe || loading}
        className="mt-2 w-full rounded-md bg-slate-800 px-5 py-4 text-white hover:bg-slate-700 disabled:animate-pulse disabled:opacity-50"
      >
        {!loading ? `Pay ${formatCurrency(amount)}` : "Processing..."}
      </button>
    </form>
  );
};

export default PaymentCheckout;
