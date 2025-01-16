"use client";

import { useCompare } from "@/lib/providers/ContextProvider";
import { cn } from "@/lib/utils";
import { TProduct } from "@/types/product.type";
import { Shuffle } from "lucide-react";
import { useEffect, useState } from "react";

type TProps = {
  product: TProduct;
};

const CompareButton = ({ product }: TProps) => {
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
      className={cn("cursor-pointer p-2 hover:text-slate-900", {
        "cursor-default text-slate-300 hover:text-slate-300": isAdded,
      })}
      onClick={handleClick}
    >
      <Shuffle />
    </div>
  );
};

export default CompareButton;
