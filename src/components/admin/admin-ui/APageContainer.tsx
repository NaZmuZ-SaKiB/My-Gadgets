import { ReactNode } from "react";
import { ClassValue } from "clsx";

import { cn } from "@/lib/utils";

type TProps = {
  children: ReactNode;
  className?: ClassValue;
};

const APageContainer = ({ children, className }: TProps) => {
  return (
    <div
      className={cn(
        "flex h-[calc(100svh-60px)] flex-col gap-3 overflow-auto overflow-x-hidden p-2 xs:gap-5 xs:p-4",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default APageContainer;
