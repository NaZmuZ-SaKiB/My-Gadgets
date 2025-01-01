"use client";

import { useCart } from "@/lib/providers/ContextProvider";
import { TDeliveryOption } from "@/types/order.type";
import { formatCurrency } from "@/utils/currencyFormat";
import { useEffect, useState } from "react";

type TProps = {
  deliveryOption: TDeliveryOption;
};

const CheckoutOverview = ({ deliveryOption }: TProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { cart } = useCart();

  const subTotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const shippingCharge =
    deliveryOption === "pickup"
      ? 0
      : cart.reduce((acc, item) => acc + item.shippingCost * item.quantity, 0);

  const total = subTotal + shippingCharge;

  return (
    <div className="sm:rounded-xl max-sm:border-t max-sm:pt-3 sm:border border-slate-200 sm:p-4 col-span-2">
      <h2 className="text-lg font-semibold text-slate-700">Overview</h2>

      {mounted && (
        <table className="table-auto admin-table mt-3">
          <thead className="text-left">
            <tr>
              <th className="!bg-slate-100 !border-slate-200 !text-slate-700">
                Name
              </th>
              <th className="!bg-slate-100 !border-slate-200 !text-slate-700">
                Price
              </th>
              <th className="!bg-slate-100 !border-slate-200 !text-slate-700">
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
              <td colSpan={2} className="text-right font-semibold text-base">
                Sub Total
              </td>
              <td>{formatCurrency(subTotal)}</td>
            </tr>
            <tr>
              <td colSpan={2} className="text-right font-semibold text-base">
                Shipping Charge
              </td>
              <td>{formatCurrency(shippingCharge)}</td>
            </tr>
            <tr>
              <td colSpan={2} className="text-right font-semibold text-base">
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
