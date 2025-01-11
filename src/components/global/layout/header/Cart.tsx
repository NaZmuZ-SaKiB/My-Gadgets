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
import { useEffect, useState } from "react";

const Cart = () => {
  const [open, setOpen] = useState(false);
  const { cart, removeFromCart } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="cursor-pointer">
        <div className="relative h-full">
          <Image
            src={icons.cart}
            alt="cart"
            className="mx-auto size-6 max-xl:relative max-xl:top-1"
          />
          <span className="hidden text-sm xl:block">Cart</span>

          {mounted && (
            <span className="absolute -right-3 -top-2 grid size-[22px] place-items-center rounded-full bg-slate-600 text-[11px] text-white">
              {cart.length}
            </span>
          )}
        </div>
        <div className="fixed bottom-5 right-5 z-50 hidden size-14 flex-col items-center justify-center gap-1 rounded-md border border-slate-600 bg-slate-50 p-1 text-slate-50 xl:flex">
          <Image
            src={icons.cart}
            alt="cart"
            className="mx-auto size-5 max-xl:relative max-xl:top-1"
          />
          <span className="text-center text-xs font-semibold text-slate-700">
            Cart
          </span>

          {mounted && (
            <span className="absolute -right-2 -top-3 grid size-6 place-items-center rounded-full bg-slate-600 text-xs text-slate-50">
              {cart.length}
            </span>
          )}
        </div>
      </SheetTrigger>
      <SheetContent className="z-[110] flex flex-col gap-4 px-3 py-4">
        <SheetHeader className="flex flex-row items-start justify-between">
          <SheetTitle className="text-2xl text-slate-700">Cart</SheetTitle>
          <SheetClose className="!mt-0">
            <X className="size-6 rounded-full border border-slate-500 p-0.5 text-slate-500" />
          </SheetClose>
        </SheetHeader>

        <div className="flex flex-1 flex-col gap-3 overflow-y-auto">
          {cart.map((item) => (
            <div key={`cart-${item._id}`} className="flex items-center gap-3">
              <Image src={item.image} alt={item.name} height={70} width={70} />
              <div className="flex-1">
                <h3 className="text-xs font-semibold text-slate-700">
                  {item.name}
                </h3>

                <div className="mt-2 flex items-center justify-between gap-3">
                  <p className="text-sm">
                    {item.quantity} x {formatCurrency(item.price)}
                  </p>

                  <Trash2
                    className="size-5 cursor-pointer text-red-500"
                    onClick={() => removeFromCart(item._id)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <SheetFooter className="block w-full">
          <div className="flex items-center justify-between">
            <p className="flex-wrap gap-2 text-lg font-semibold text-slate-700">
              Total
            </p>
            <p className="text-2xl font-semibold text-primary">
              {formatCurrency(total)}
            </p>
          </div>

          <div className="!ml-0 mt-3 flex justify-between gap-2">
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
