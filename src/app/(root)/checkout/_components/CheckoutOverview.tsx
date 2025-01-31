"use client";

import { useCart } from "@/lib/providers/ContextProvider";
import { TDeliveryOption } from "@/types/order.type";
import { formatCurrency } from "@/utils/currencyFormat";
import { useEffect, useState } from "react";
import CheckoutOverviewLoading from "./CheckoutOverviewLoading";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type TProps = {
  deliveryOption: TDeliveryOption;
};

const CheckoutOverview = ({ deliveryOption }: TProps) => {
  const [mounted, setMounted] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const { cart } = useCart();

  const subTotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const shippingCharge =
    deliveryOption === "pickup"
      ? 0
      : cart.reduce((acc, item) => acc + item.shippingCost * item.quantity, 0);

  const total = subTotal + shippingCharge;

  if (!mounted) return <CheckoutOverviewLoading />;

  if (cart.length === 0) {
    toast.info("Your cart is empty. Please add some items to proceed.");
    router.back();
  }

  return (
    <div className="col-span-2 border-slate-200 max-sm:border-t max-sm:pt-3 sm:rounded-xl sm:border sm:p-4">
      <h2 className="text-lg font-semibold text-slate-700">Overview</h2>

      {mounted && (
        <table className="admin-table mt-3 table-auto">
          <thead className="text-left">
            <tr>
              <th className="!border-slate-200 !bg-slate-100 !text-slate-700">
                Name
              </th>
              <th className="!border-slate-200 !bg-slate-100 !text-slate-700">
                Price
              </th>
              <th className="!border-slate-200 !bg-slate-100 !text-slate-700">
                Total
              </th>
            </tr>
          </thead>

          <tbody>
            {cart.map((item) => (
              <tr key={`cart-page-item-${item._id}`}>
                <td>{item.name}</td>

                <td className="">
                  {item.quantity} x {formatCurrency(item.price)}
                </td>
                <td>{formatCurrency(item.price * item.quantity)}</td>
              </tr>
            ))}
            <tr>
              <td colSpan={2} className="text-right text-base font-semibold">
                Sub Total
              </td>
              <td>{formatCurrency(subTotal)}</td>
            </tr>
            <tr>
              <td colSpan={2} className="text-right text-base font-semibold">
                Shipping Charge
              </td>
              <td>{formatCurrency(shippingCharge)}</td>
            </tr>
            <tr>
              <td colSpan={2} className="text-right text-base font-semibold">
                Total
              </td>
              <td>{formatCurrency(total)}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CheckoutOverview;
