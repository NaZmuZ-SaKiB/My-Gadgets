import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import { ReactNode } from "react";

type TProps = {
  children?: ReactNode;
  className?: ClassValue;
};

const AFloatingBox = ({ children, className }: TProps) => {
  return (
    <div
      className={cn(
        "p-2 xs:p-4 rounded-xl bg-white hover:shadow-xl hover:shadow-slate-200 transition-shadow duration-300",
        className
      )}
    >
      {children}
    </div>
  );
};

export default AFloatingBox;
