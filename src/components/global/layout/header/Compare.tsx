"use client";

import { icons } from "@/constants";
import { useCompare } from "@/lib/providers/ContextProvider";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Compare = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { compare } = useCompare();
  return (
    <div className="relative hidden xl:block">
      <Link
        href="/compare"
        className="cursor-pointer text-slate-600 hover:text-slate-800"
      >
        <Image src={icons.compare} alt="compare" className="mx-auto size-6" />
        <span className="text-sm">Compare</span>
      </Link>

      {mounted && (
        <span className="absolute -top-2 right-0 grid size-[22px] place-items-center rounded-full bg-slate-600 text-[11px] text-white">
          {compare.length}
        </span>
      )}
    </div>
  );
};

export default Compare;
