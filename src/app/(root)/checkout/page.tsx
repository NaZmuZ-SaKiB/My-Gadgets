import BreadcrumbBar from "@/components/global/shared/Breadcrumb";
import ShippingAddressSection from "./_components/ShippingAddressSection";
import Heading from "./_components/Heading";
import { isUserLoggedIn } from "@/lib/actions/auth.action";

const CheckoutPage = async () => {
  const user = await isUserLoggedIn();

  return (
    <div className="mg-container p-4">
      <BreadcrumbBar
        items={[{ label: "Cart", link: "/cart" }, { label: "Checkout" }]}
      />

      <div className="mt-5 sm:mt-3">
        <Heading />
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3">
        <ShippingAddressSection userId={`${user?._id}`} />
      </div>
    </div>
  );
};

export default CheckoutPage;
