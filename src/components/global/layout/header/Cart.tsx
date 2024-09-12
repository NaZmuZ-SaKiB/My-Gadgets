"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { icons } from "@/constants";
import { useCart } from "@/lib/providers/ContextProvider";
import { formatCurrency } from "@/utils/currencyFormat";
import { Trash2, X } from "lucide-react";
import Image from "next/image";
import MGButton from "../../shared/MGButton";
import Link from "next/link";
import { useState } from "react";

const Cart = () => {
  const [open, setOpen] = useState(false);
  const { cart, removeFromCart } = useCart();

  const total = cart.reduce(
    (acc, item) =>
      acc + item.price * item.quantity + item.shippingCost * item.quantity,
    0
  );
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <div className="h-full relative">
          <Image src={icons.cart} alt="cart" className="size-6 mx-auto" />
          <span className="hidden xl:block text-sm">Cart</span>

          <span className="absolute size-[22px] text-[11px] text-white bg-slate-600 rounded-full grid place-items-center -top-2 -right-3">
            {cart.length}
          </span>
        </div>
      </SheetTrigger>
      <SheetContent className="px-3 py-4 z-[110] flex flex-col gap-4">
        <SheetHeader className="flex flex-row justify-between items-start">
          <SheetTitle className="text-2xl text-slate-700">Cart</SheetTitle>
          <SheetClose className="!mt-0">
            <X className="size-6 p-0.5 text-slate-500 border rounded-full border-slate-500" />
          </SheetClose>
        </SheetHeader>

        <div className="flex-1 flex flex-col gap-3 overflow-y-auto">
          {cart.map((item) => (
            <div key={`cart-${item._id}`} className="flex items-center gap-3">
              <Image src={item.image} alt={item.name} height={70} width={70} />
              <div className="flex-1">
                <h3 className="text-xs font-semibold text-slate-700">
                  {item.name}
                </h3>

                <div className="mt-2 flex justify-between items-center gap-3">
                  <p className="text-sm">
                    {item.quantity} x {formatCurrency(item.price)}
                  </p>

                  <Trash2
                    className="size-5 text-red-500 cursor-pointer"
                    onClick={() => removeFromCart(item._id)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <SheetFooter className="w-full block">
          <div className="flex justify-between items-center">
            <p className="text-lg font-semibold text-slate-700 gap-2 flex-wrap">
              Total
            </p>
            <p className="text-2xl font-semibold text-primary">
              {formatCurrency(total)}
            </p>
          </div>

          <div className="!ml-0 flex gap-2 justify-between mt-3">
            <Link
              href="/cart"
              className="flex-1"
              onClick={() => setOpen(false)}
            >
              <MGButton className="w-full rounded-md" variant="outline">
                View Cart
              </MGButton>
            </Link>
            <Link
              href="/checkout"
              className="flex-1"
              onClick={() => setOpen(false)}
            >
              <MGButton className="w-full rounded-md">Checkout</MGButton>
            </Link>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
