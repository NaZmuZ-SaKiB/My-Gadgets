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
        "flex h-[calc(100svh-60px)] flex-col gap-3 overflow-auto p-2 xs:gap-5 xs:p-4",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default APageContainer;
