"use client";

import BreadcrumbBar from "@/components/global/shared/Breadcrumb";
import ShippingAddressSection from "./_components/ShippingAddressSection";
import Heading from "./_components/Heading";
import { useIsUserLoggedInQuery } from "@/lib/queries/auth.query";
import { useState } from "react";
import { TDeliveryOption, TPaymentMethod } from "@/types/order.type";
import PaymentMethodSection from "./_components/PaymentMethodSection";
import DeliveryMethodSection from "./_components/DeliveryMethodSection";
import CheckoutOverview from "./_components/CheckoutOverview";
import Link from "next/link";
import MGButton from "@/components/global/shared/MGButton";
import { ShoppingBag } from "lucide-react";
import { useOrderCreateMutation } from "@/lib/queries/order.query";
import { useCart } from "@/lib/providers/ContextProvider";
import { z } from "zod";
import { OrderValidation } from "@/lib/validations/order.validation";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { AQTags } from "@/constants";
import { useRouter } from "next/navigation";

const CheckoutPage = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<TPaymentMethod>("cash-on-delivery");
  const [selectedDeliveryOption, setSelectedDeliveryOption] =
    useState<TDeliveryOption>("pickup");
  const [selectedAddress, setSelectedAddress] = useState<string>("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [transactionId, setTransactionId] = useState<string>("");

  const queryClient = useQueryClient();
  const router = useRouter();

  const { cart, setAmount, setOrderId } = useCart();

  const { data, isLoading } = useIsUserLoggedInQuery();

  const { mutateAsync: createOrderFn, isPending } = useOrderCreateMutation();

  const shippingCharge =
    selectedDeliveryOption === "pickup"
      ? 0
      : cart.reduce((acc, item) => acc + item.shippingCost * item.quantity, 0);

  const subTotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const handleCreateOrder = async (paymentResult?: string) => {
    const order: z.infer<typeof OrderValidation.create> = {
      orderItems: cart.map((item) => ({
        name: item.name,
        slug: item.slug,
        image: item.image,
        price: item.price,
        quantity: item.quantity,
        product: item._id,
      })),

      shippingAddress: selectedAddress,
      paymentMethod: selectedPaymentMethod,
      deliveryOption: selectedDeliveryOption,
      shippingCharge: selectedDeliveryOption === "pickup" ? 0 : shippingCharge,
      totalPrice: subTotal + shippingCharge,
    };

    if (selectedPaymentMethod === "bank-transfer") {
      order.transactionId = transactionId;
      order.isPaid = false;
      order.paidAt = new Date();
    }

    if (selectedPaymentMethod === "stripe") order.isPaid = false;

    try {
      const result = await createOrderFn(order);
      console.log(result);

      if (result?.success) {
        queryClient.invalidateQueries({
          queryKey: [AQTags.ORDER, AQTags.ALL],
          exact: false,
        });
      } else {
        toast.error(result?.message || "A server error occurred.");
      }

      return { id: result?.data?._id, success: result?.success };
    } catch (error: any) {
      toast.error(error?.message || "A client error occurred.");
    }
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      toast.message("Please select a shipping address.");
      return;
    }

    if (!termsAccepted) {
      toast.message("Please accept the terms and conditions.");
      return;
    }

    if (selectedPaymentMethod === "bank-transfer" && !transactionId) {
      toast.message("Transaction ID is required.");
      return;
    }

    const order = await handleCreateOrder();

    if (order?.success) {
      if (selectedPaymentMethod !== "stripe") {
        router.push("/payment-success");
      } else {
        setAmount(subTotal + shippingCharge);
        setOrderId(order?.id);
        router.push("/payment");
      }
    }
  };

  return (
    <div className="mg-container pt-4">
      <BreadcrumbBar
        items={[{ label: "Cart", link: "/cart" }, { label: "Checkout" }]}
      />

      <div className="mt-5 sm:mt-8">
        <Heading />
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-3">
        {isLoading ? (
          <div className="row-span-2">Loading...</div>
        ) : (
          <ShippingAddressSection
            userId={`${data?._id}`}
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
          />
        )}

        <PaymentMethodSection
          selectedPaymentMethod={selectedPaymentMethod}
          setSelectedPaymentMethod={setSelectedPaymentMethod}
          setTransactionId={setTransactionId}
        />

        <DeliveryMethodSection
          selectedDeliveryMethod={selectedDeliveryOption}
          setSelectedDeliveryMethod={setSelectedDeliveryOption}
        />

        <CheckoutOverview deliveryOption={selectedDeliveryOption} />
      </div>

      <div className="mt-5 flex items-center gap-x-3 gap-y-4 border-t-2 border-slate-100 py-3 max-lg:flex-col lg:justify-between">
        <p className="text-sm">
          <input
            type="checkbox"
            onChange={(e) => setTermsAccepted(e.target.checked)}
            className="cursor-pointer"
          />{" "}
          &nbsp; I have read and accepted the{" "}
          <Link
            className="font-medium text-primary-hover"
            href="/terms-conditions"
          >
            Terms & Conditions
          </Link>
          ,{" "}
          <Link
            className="font-medium text-primary-hover"
            href="/privacy-policy"
          >
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link
            className="font-medium text-primary-hover"
            href="/refund-return-policy"
          >
            Refund & Return Policy
          </Link>
        </p>

        <MGButton
          type="button"
          className="cursor-pointer gap-2 rounded-lg"
          disabled={isPending}
          onClick={handlePlaceOrder}
        >
          <ShoppingBag className="size-4" /> Place Order
        </MGButton>
      </div>
    </div>
  );
};

export default CheckoutPage;
