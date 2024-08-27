import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import { ReactNode } from "react";

type TProps = {
  children: ReactNode;
  className?: ClassValue;
};

const APageContainer = ({ children, className }: TProps) => {
  return (
    <div
      className={cn(
        "p-2 xs:p-4 flex flex-col gap-3 xs:gap-5 h-[calc(100svh-60px)] overflow-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export default APageContainer;
