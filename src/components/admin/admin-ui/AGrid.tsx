import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import { ReactNode } from "react";

type TProps = {
  children?: ReactNode;
  className?: ClassValue;
  reverse?: boolean;
  small?: boolean;
};

const AGrid = ({
  children,
  className,
  reverse = false,
  small = false,
}: TProps) => {
  return (
    <div
      className={cn(
        "grid grid-cols-[40%_1fr] gap-4",
        {
          "grid-cols-[1fr_40%]": reverse,
          "grid-cols-[30%_1fr]": small,
          "grid-cols-[1fr_30%]": reverse && small,
        },
        className
      )}
    >
      {children}
    </div>
  );
};

export default AGrid;
