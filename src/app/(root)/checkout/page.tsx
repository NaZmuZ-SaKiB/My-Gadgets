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

const CheckoutPage = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<TPaymentMethod>("cash-on-delivery");
  const [selectedDeliveryOption, setSelectedDeliveryOption] =
    useState<TDeliveryOption>("pickup");
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);

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
          <div></div>
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
    </div>
  );
};

export default CheckoutPage;
