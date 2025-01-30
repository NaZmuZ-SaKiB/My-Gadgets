"use client";

import { icons } from "@/constants";
import { useCompare } from "@/lib/providers/ContextProvider";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import MGButton from "./MGButton";

const FloatingCompareButton = () => {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { compare, clearCompare } = useCompare();

  if (!mounted) return null;

  return (
    <div
      className={cn(
        "fixed bottom-36 right-5 z-50 hidden rounded-md border border-slate-600 bg-slate-50 p-1 text-slate-50 transition-all",
        {
          "block !h-auto max-w-[350px] overflow-hidden p-0": open,
          "size-16 flex-col items-center justify-center gap-1 xl:flex": !open,
        },
      )}
    >
      <div
        onClick={() => compare.length > 0 && setOpen(true)}
        className={cn("cursor-pointer", {
          hidden: open,
        })}
      >
        <Image
          src={icons.compare}
          alt="compare"
          className="mx-auto size-5 max-xl:relative max-xl:top-1"
        />
        <span className="text-center text-xs font-semibold text-slate-700">
          Compare
        </span>

        {mounted && (
          <span className="absolute -right-2 -top-3 grid size-6 place-items-center rounded-full bg-slate-600 text-xs text-slate-50">
            {compare.length}
          </span>
        )}
      </div>

      <div
        className={cn("", {
          hidden: !open,
        })}
      >
        <div className="flex items-center justify-between bg-slate-900 px-3 py-1.5 text-slate-50">
          <span>Compare Products</span>
          <span className="cursor-pointer" onClick={() => setOpen(false)}>
            <X className="size-5" />
          </span>
        </div>

        <div>
          {compare.map((item) => (
            <div
              key={`compare-${item._id}`}
              className="flex items-center gap-3 border-b px-3 py-1"
            >
              <Image
                src={item.images[0].secureUrl}
                alt={item.name}
                height={50}
                width={50}
              />
              <div className="flex-1">
                <Link href={`/products/${item.slug}/${item._id}`}>
                  <h3 className="text-xs font-semibold text-slate-700 hover:underline">
                    {item.name}
                  </h3>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-end px-3 py-1.5">
          <MGButton
            size="sm"
            variant="ghost"
            className="rounded-md text-slate-500"
            onClick={() => {
              setOpen(false);
              clearCompare();
            }}
          >
            Clear
          </MGButton>
          <Link
            href="/compare"
            className="block text-center text-xs font-semibold text-primary"
          >
            <MGButton
              size="sm"
              className="rounded-md"
              onClick={() => setOpen(false)}
            >
              Compare Now
            </MGButton>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FloatingCompareButton;
