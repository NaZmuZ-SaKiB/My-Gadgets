import { cn } from "@/lib/utils";

const ProductCardLoader = ({ size = "sm" }: { size?: "sm" | "lg" }) => {
  return (
    <div
      className={cn("h-[300px] animate-pulse rounded-xl bg-slate-100", {
        "h-[500px]": size === "lg",
      })}
    ></div>
  );
};

export default ProductCardLoader;
