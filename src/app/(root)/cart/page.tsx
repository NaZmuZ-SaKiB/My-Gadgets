"use client";

import Link from "next/link";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

import CartPageLoading from "./loading";
import Quantity from "./_components/Quantity";
import MGButton from "@/components/global/shared/MGButton";
import BreadcrumbBar from "@/components/global/shared/Breadcrumb";

import { useCart } from "@/lib/providers/ContextProvider";
import { formatCurrency } from "@/utils/currencyFormat";

const CartPage = () => {
  const [mounted, setMounted] = useState(false);
  const { cart, clearCart } = useCart();

  useEffect(() => {
    setMounted(true);
  }, []);

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (!mounted) return <CartPageLoading />;

  return (
    <div className="mg-container pt-4">
      <BreadcrumbBar items={[{ label: "Shop" }, { label: "Cart" }]} />

      <div className="mt-5 sm:mt-3 sm:rounded-xl sm:border sm:border-slate-200 sm:p-4">
        {cart.length > 0 && (
          <div className="flex items-end justify-between gap-3">
            <div>
              <h1 className="text-3xl font-semibold text-slate-700">
                Your Cart
              </h1>
              <p className="mt-1 text-sm font-semibold text-slate-500 sm:text-base">
                You have <span className="text-primary">{cart.length}</span>{" "}
                product
                {cart.length > 1 ? "s" : ""} in the cart
              </p>
            </div>

            <div
              className="flex shrink-0 cursor-pointer items-center gap-1 rounded-lg border border-slate-500 px-2 py-1 text-sm text-slate-500"
              onClick={clearCart}
            >
              <Trash2 className="size-4" />
              <span className="mt-0.5">Clear Cart</span>
            </div>
          </div>
        )}

        <div className="mt-6">
          {cart.length > 0 ? (
            <table className="primary-table table table-auto">
              <thead className="text-left">
                <tr>
                  <th className="max-md:hidden">Image</th>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th className="max-md:hidden">Unit Price</th>
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
                        maxQuantity={item.maxQuantity}
                      />
                    </td>
                    <td className="max-md:hidden">
                      {formatCurrency(item.price)}
                    </td>
                    <td>{formatCurrency(item.price * item.quantity)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="rounded-xl border border-slate-200 px-5 py-10">
              <p className="text-center text-3xl font-bold text-slate-400">
                Cart is Empty
              </p>
            </div>
          )}

          {cart.length > 0 && (
            <div className="mt-5 flex justify-end">
              <div className="flex flex-col gap-2">
                <p className="flex items-end gap-5">
                  <span className="font-semibold text-slate-700 md:text-lg">
                    Total:
                  </span>
                  <span className="col-span-2 text-xl font-semibold text-primary md:text-2xl">
                    {formatCurrency(total)}
                  </span>
                </p>

                <Link href="/checkout" className="mt-3 w-full self-end">
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
