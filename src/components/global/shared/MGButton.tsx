import React from "react";
import { VariantProps } from "class-variance-authority";

import { Button, buttonVariants } from "@/components/ui/button";

import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const MGButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, ...props }: ButtonProps, ref) => {
    return (
      <Button
        className={cn(
          "no-focus rounded-xl",
          {
            "text-primbg-primary border-primary bg-transparent hover:bg-primary hover:text-white":
              props.variant === "outline",
          },
          {
            "bg-primary hover:bg-primary-hover focus-visible:bg-primary-hover focus-visible:text-white":
              props.variant === undefined ||
              props.variant === null ||
              props.variant === "default",
          },
          className,
        )}
        {...props}
        ref={ref}
      >
        {children}
      </Button>
    );
  },
);

MGButton.displayName = "MGButton";

export default MGButton;
