import Link, { LinkProps } from "next/link";
import * as React from "react";
import { cn } from "@/lib/utils";

export interface myLinkProps
  extends LinkProps,
    React.HTMLAttributes<HTMLAnchorElement> {}

const MyLink = React.forwardRef<HTMLAnchorElement, myLinkProps>(
  ({ href, className, children, ...props }, ref) => {
    const isExternal =
      (href as string).startsWith("http") && typeof children === "string";
    return (
      <Link
        href={href}
        className={cn(
          "text-primary hover:text-primary/70 transition-colors",
          isExternal &&
            "after:ml-0.5 after:w-4 after:h-4 after:bg-center after:bg-contain after:translate-y-0.5 after:inline-block after:bg- after:text-center after:bg-no-repeat after:hover:opacity-70",
          isExternal && `after:bg-[url('/move-up-right.svg')]`,

          className
        )}
        target={isExternal ? "_blank" : undefined}
        {...props}
        ref={ref}
      >
        {children}
      </Link>
    );
  }
);
MyLink.displayName = "Link";

export { MyLink as Link };
