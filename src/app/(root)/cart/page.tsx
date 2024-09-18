"use client";

import BreadcrumbBar from "@/components/global/shared/Breadcrumb";
import { useCart } from "@/lib/providers/ContextProvider";
import { formatCurrency } from "@/utils/currencyFormat";
import Image from "next/image";
import Quantity from "./_components/Quantity";
import { Trash2 } from "lucide-react";
import Link from "next/link";
import MGButton from "@/components/global/shared/MGButton";
import { useEffect, useState } from "react";

const CartPage = () => {
  const [mounted, setMounted] = useState(false);
  const { cart, clearCart } = useCart();

  useEffect(() => {
    setMounted(true);
  }, []);

  const subTotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const totalShipping = cart.reduce(
    (acc, item) => acc + item.shippingCost * item.quantity,
    0
  );

  const total = subTotal + totalShipping;

  if (!mounted) return null;

  return (
    <div className="mg-container p-4">
      <BreadcrumbBar items={[{ label: "Shop" }, { label: "Cart" }]} />

      <div className="mt-5 sm:mt-3 sm:rounded-xl sm:border sm:border-slate-200 sm:p-4">
        {cart.length > 0 && (
          <div className="flex items-end gap-3 justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-slate-700">
                Your Cart
              </h1>
              <p className="text-slate-500 font-semibold mt-1 text-sm sm:text-base">
                You have <span className="text-primary">{cart.length}</span>{" "}
                product
                {cart.length > 1 ? "s" : ""} in the cart
              </p>
            </div>

            <div
              className="shrink-0 flex items-center gap-1 text-sm text-slate-500 border border-slate-500 rounded-lg px-2 py-1 cursor-pointer"
              onClick={clearCart}
            >
              <Trash2 className="size-4" />
              <span className="mt-0.5">Clear Cart</span>
            </div>
          </div>
        )}

        <div className="mt-6">
          {cart.length > 0 ? (
            <table className="table-auto admin-table rounded-md overflow-hidden">
              <thead className="text-left">
                <tr>
                  <th className="max-md:hidden">Image</th>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th className="max-md:hidden">Unit Price</th>
                  <th className="max-md:hidden">Shipping</th>
                  <th>Total</th>
                </tr>
              </thead>

              <tbody>
                {cart.map((item) => (
                  <tr key={`cart-page-item-${item._id}`}>
                    <td className="max-md:hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={50}
                        height={50}
                        className="object-contain"
                      />
                    </td>
                    <td>{item.name}</td>
                    <td>
                      <Quantity
                        defaultValue={item.quantity}
                        productId={item._id.toString()}
                      />
                    </td>
                    <td className="max-md:hidden">
                      {formatCurrency(item.price)}
                    </td>
                    <td className="max-md:hidden">
                      {formatCurrency(item.shippingCost * item.quantity)}
                    </td>
                    <td>
                      {formatCurrency(
                        item.price * item.quantity +
                          item.shippingCost * item.quantity
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="rounded-xl border border-slate-200 px-5 py-10">
              <p className="text-3xl text-slate-400 font-bold text-center">
                Cart is Empty
              </p>
            </div>
          )}

          {cart.length > 0 && (
            <div className="mt-6 flex justify-end">
              <div className="flex flex-col gap-2">
                <p className="text-right grid grid-cols-3 py-2 items-end border-b border-slate-200">
                  <span className="md:text-lg font-semibold text-slate-700">
                    Sub-Total:
                  </span>
                  <span className="col-span-2 text-xl md:text-2xl font-semibold text-primary">
                    {formatCurrency(subTotal)}
                  </span>
                </p>

                <p className="text-right grid grid-cols-3 py-2 items-end border-b border-slate-200">
                  <span className="md:text-lg font-semibold text-slate-700">
                    Shipping:
                  </span>
                  <span className="col-span-2 text-xl md:text-2xl font-semibold text-primary">
                    {formatCurrency(totalShipping)}
                  </span>
                </p>

                <p className="text-right grid grid-cols-3 py-2 items-end border-b border-slate-200">
                  <span className="md:text-lg font-semibold text-slate-700">
                    Total:
                  </span>
                  <span className="col-span-2 text-xl md:text-2xl font-semibold text-primary">
                    {formatCurrency(total)}
                  </span>
                </p>

                <Link href="/checkout" className="mt-3 self-end w-full">
                  <MGButton className="w-full rounded-md">Checkout</MGButton>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
