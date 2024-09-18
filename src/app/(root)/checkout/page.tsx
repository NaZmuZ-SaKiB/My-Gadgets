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

const CheckoutPage = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<TPaymentMethod>("cash-on-delivery");
  const [selectedDeliveryOption, setSelectedDeliveryOption] =
    useState<TDeliveryOption>("pickup");
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const { data, isLoading } = useIsUserLoggedInQuery();

  return (
    <div className="mg-container p-4">
      <BreadcrumbBar
        items={[{ label: "Cart", link: "/cart" }, { label: "Checkout" }]}
      />

      <div className="mt-5 sm:mt-8">
        <Heading />
      </div>

      <div className="mt-8 grid grid-cols-3 gap-3">
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
        />

        <DeliveryMethodSection
          selectedDeliveryMethod={selectedDeliveryOption}
          setSelectedDeliveryMethod={setSelectedDeliveryOption}
        />

        <CheckoutOverview deliveryOption={selectedDeliveryOption} />
      </div>

      <div className="border-t-2 border-slate-100 mt-5 p-3 flex items-center justify-between gap-3 flex-wrap">
        <p className="text-sm">
          <input
            type="checkbox"
            onChange={(e) => setTermsAccepted(e.target.checked)}
            className="cursor-pointer"
          />{" "}
          &nbsp; I have read and accepted the{" "}
          <Link
            className="text-primary-hover font-medium"
            href="/terms-conditions"
          >
            Terms & Conditions
          </Link>
          ,{" "}
          <Link
            className="text-primary-hover font-medium"
            href="/privacy-policy"
          >
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link
            className="text-primary-hover font-medium"
            href="/refund-return-policy"
          >
            Refund & Return Policy
          </Link>
        </p>

        <MGButton className="rounded-lg gap-2" disabled={!termsAccepted}>
          <ShoppingBag className="size-4" /> Place Order
        </MGButton>
      </div>
    </div>
  );
};

export default CheckoutPage;
