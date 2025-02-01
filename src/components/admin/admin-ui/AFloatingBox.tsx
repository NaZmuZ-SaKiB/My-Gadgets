import { ClassValue } from "clsx";
import { ReactNode } from "react";

import { cn } from "@/lib/utils";

type TProps = {
  children?: ReactNode;
  className?: ClassValue;
};

const AFloatingBox = ({ children, className }: TProps) => {
  return (
    <div
      className={cn(
        "rounded-xl bg-white p-2 transition-shadow duration-300 hover:shadow-xl hover:shadow-slate-200 xs:p-4",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default AFloatingBox;
