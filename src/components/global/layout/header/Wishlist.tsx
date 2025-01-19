"use client";

import { icons } from "@/constants";
import { useWishlistGetQuery } from "@/lib/queries/wishlist.query";
import Image from "next/image";
import Link from "next/link";

const Wishlist = () => {
  const { data, isLoading } = useWishlistGetQuery();
  const count = data?.data?.products?.length || 0;

  return (
    <div className="relative hidden xl:block">
      <Link
        href="/wishlist"
        className="hidden cursor-pointer text-slate-600 hover:text-slate-800 xl:block"
      >
        <Image src={icons.heart} alt="wishlist" className="mx-auto size-6" />
        <span className="text-sm">Wishlist</span>
      </Link>

      {!isLoading && (
        <span className="absolute -top-2 right-0 grid size-[22px] place-items-center rounded-full bg-slate-600 text-[11px] text-white">
          {count}
        </span>
      )}
    </div>
  );
};

export default Wishlist;
