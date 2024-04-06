import Link, { LinkProps } from "next/link";
import * as React from "react";
import { cn } from "@/lib/utils";

export interface myLinkProps
  extends LinkProps,
    React.HTMLAttributes<HTMLAnchorElement> {}

const MyLink = React.forwardRef<HTMLAnchorElement, myLinkProps>(
  ({ href, className, ...props }, ref) => {
    return (
      <Link
        href={href}
        className={cn("text-primary hover:text-primary/80", className)}
        {...props}
        ref={ref}
      />
    );
  }
);
MyLink.displayName = "Link";

export { MyLink as Link };
