import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { VariantProps } from "class-variance-authority";
import React from "react";

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
          "rounded-xl bg-primary focus-visible:bg-primary-hover focus-visible:text-white hover:bg-primary-hover no-focus",
          {
            "bg-transparent border-primary text-primbg-primary hover:bg-primary hover:text-white":
              props.variant === "outline",
          },
          className
        )}
        {...props}
        ref={ref}
      >
        {children}
      </Button>
    );
  }
);

MGButton.displayName = "MGButton";

export default MGButton;
