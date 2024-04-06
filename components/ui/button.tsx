import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline items-center justify-center whitespace-nowrap text-sm font-condensed ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 ",
  {
    variants: {
      variant: {
        default: "h-4 w-4 lg:h-6 lg:w-6 xl:h-8 xl:w-8",
        dot: "-mt-8 h-4 w-4 translate-y-[2px] md:h-5 md:w-5 md:translate-y-[2.5px] lg:h-6 lg:w-6 lg:translate-y-[3px] xl:h-8 xl:w-8 xl:translate-y-[4px]",
      },
    },
    defaultVariants: {
      variant: "dot",
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
