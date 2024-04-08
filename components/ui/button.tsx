import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  cn(
    "inline items-center justify-center whitespace-nowrap",
    "font-condensed",
    "rounded-full",
    "h-4 md:h-5 lg:h-6 xl:h-8",
    "bg-primary text-primary-foreground",
    "hover:bg-primary/90 ",
    "transition-colors",
    "disabled:pointer-events-none disabled:opacity-50",
    "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
  ),
  {
    variants: {
      variant: {
        default:
          "px-2 md:px-2.5 lg:px-3 xl:px-4 text-sm md:text-base lg:text-lg xl:text-xl",
        dot: "-mt-8 w-4 translate-y-[2px] md:w-5 md:translate-y-[2.5px] lg:w-6 lg:translate-y-[3px] xl:w-8 xl:translate-y-[4px]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
