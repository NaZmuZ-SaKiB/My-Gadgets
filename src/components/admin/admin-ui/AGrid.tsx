import { ReactNode } from "react";
import { ClassValue } from "clsx";

import { cn } from "@/lib/utils";

type TProps = {
  children?: ReactNode;
  className?: ClassValue;
  reverse?: boolean;
  small?: boolean;
  equal?: boolean;
};

const AGrid = ({
  children,
  className,
  reverse = false,
  small = false,
  equal = false,
}: TProps) => {
  return (
    <div
      className={cn(
        "grid-cols-[40%_1fr] gap-4 @5xl:grid",
        {
          "grid-cols-[1fr_1fr]": equal,
          "grid-cols-[1fr_40%]": reverse,
          "grid-cols-[30%_1fr]": small,
          "grid-cols-[1fr_30%]": reverse && small,
        },
        className,
      )}
    >
      {children}
    </div>
  );
};

export default AGrid;
