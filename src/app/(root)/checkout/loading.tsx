import BreadcrumbBar from "@/components/global/shared/Breadcrumb";
import ShippingAddressLoading from "./_components/ShippingAddressLoading";
import PaymentMethodSection from "./_components/PaymentMethodSection";
import DeliveryMethodSection from "./_components/DeliveryMethodSection";
import CheckoutOverviewLoading from "./_components/CheckoutOverviewLoading";
import Link from "next/link";
import MGButton from "@/components/global/shared/MGButton";
import { ShoppingBag } from "lucide-react";

const CheckoutPageLoading = () => {
  return (
    <div className="mg-container pt-4">
      <BreadcrumbBar
        items={[{ label: "Cart", link: "/cart" }, { label: "Checkout" }]}
      />

      <div className="mt-5 sm:mt-8">
        <h1 className="text-3xl font-semibold text-slate-700">Checkout</h1>
        <p className="mt-3 h-5 w-[230px] animate-pulse rounded-full bg-slate-200"></p>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-3">
        <ShippingAddressLoading />

        <PaymentMethodSection
          selectedPaymentMethod={"cash-on-delivery"}
          setSelectedPaymentMethod={() => {}}
          setTransactionId={() => {}}
        />

        <DeliveryMethodSection
          selectedDeliveryMethod={"pickup"}
          setSelectedDeliveryMethod={() => {}}
        />

        <CheckoutOverviewLoading />
      </div>

      <div className="mt-5 flex items-center gap-x-3 gap-y-4 border-t-2 border-slate-100 py-3 max-lg:flex-col lg:justify-between">
        <p className="text-sm">
          <input type="checkbox" className="cursor-pointer" />
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

        <MGButton type="button" className="cursor-pointer gap-2 rounded-lg">
          <ShoppingBag className="size-4" /> Place Order
        </MGButton>
      </div>
    </div>
  );
};

export default CheckoutPageLoading;
