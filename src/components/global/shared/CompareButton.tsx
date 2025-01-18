"use client";

import { useCompare } from "@/lib/providers/ContextProvider";
import { cn } from "@/lib/utils";
import { TProduct } from "@/types/product.type";
import { ClassValue } from "clsx";
import { useEffect, useState } from "react";

type TProps = {
  product: TProduct;
  children: React.ReactNode;
  className?: ClassValue;
};

const CompareButton = ({ product, children, className }: TProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { compare, addToCompare } = useCompare();

  const isAdded = !!compare.find((item) => item._id === product._id);

  const handleClick = () => {
    if (!isAdded) {
      addToCompare(product);
    }
  };

  if (!mounted) return null;
  return (
    <div
      onClick={handleClick}
      className={cn(
        "cursor-pointer",
        className,
        {
          "cursor-default !text-slate-300 hover:!text-slate-300 [&>*]:cursor-default":
            isAdded,
        },
        className,
      )}
    >
      {children}
    </div>
  );
};

export default CompareButton;
