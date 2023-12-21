import * as React from "react";

import { cn } from "@/lib/utils";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "p-2.5 lg:p-5 flex flex-col lg:flex-row gap-2.5 lg:gap-5",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardContentContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex-[2_2_20px] lg:flex-[2_2_20px] flex flex-col",
      className
    )}
    {...props}
  />
));
CardContentContainer.displayName = "CardContentContainer";

const CardPrimaryContentContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-row gap-2.5  lg:gap-5", className)}
    {...props}
  />
));
CardPrimaryContentContainer.displayName = "CardPrimaryContentContainer";

const CardPrimaryContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex-1 bg-slate-200", className)} {...props} />
));
CardPrimaryContent.displayName = "CardPrimaryContent";

const CardSecondaryContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex-[1_1_0%] bg-slate-600", className)}
    {...props}
  />
));
CardSecondaryContent.displayName = "CardSecondaryContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("", className)} {...props} />
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardContentContainer,
  CardPrimaryContentContainer,
  CardPrimaryContent,
  CardSecondaryContent,
  CardFooter,
};
