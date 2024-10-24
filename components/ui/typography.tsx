import * as React from "react";

import { cn, detectLang, Language } from "@/lib/utils";

export const H1 = React.forwardRef<
  HTMLHeadingElement,
  React.ComponentProps<"h1">
>(({ className, children, ...props }, ref) => {
  let lang = detectLang(children);
  return (
    <h1
      className={cn(
        "scroll-m-20 text-base md:text-lg lg:text-xl xl:text-2xl font-bold md:font-normal",
        lang === "jpn" &&
          "text-base-ja md:text-lg-ja lg:text-xl-ja xl:text-2xl-ja font-ja font-bold md:font-medium",
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </h1>
  );
});
H1.displayName = "H1";

export const H2 = React.forwardRef<
  HTMLHeadingElement,
  React.ComponentProps<"h2">
>(({ className, children, ...props }, ref) => {
  let lang = detectLang(children);
  return (
    <h2
      className={cn(
        "scroll-m-20 text-base md:text-lg lg:text-xl xl:text-xl",
        lang === "jpn" &&
          "text-base-ja md:text-lg-ja lg:text-xl-ja xl:text-xl-ja font-ja font-medium",
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </h2>
  );
});
H2.displayName = "H2";

export const H3 = React.forwardRef<
  HTMLHeadingElement,
  React.ComponentProps<"h3">
>(({ className, ...props }, ref) => (
  <h3
    className={cn("scroll-m-20 text-base font-condensed", className)}
    ref={ref}
    {...props}
  />
));
H3.displayName = "H3";

export const H4 = React.forwardRef<
  HTMLHeadingElement,
  React.ComponentProps<"h4">
>(({ className, children, ...props }, ref) => {
  let lang = detectLang(children);
  return (
    <h4
      className={cn(
        "scroll-m-20 text-base font-bold",
        lang === "jpn" && "text-base-ja font-ja font-medium",
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </h4>
  );
});
H4.displayName = "H4";

export const P = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentProps<"p">
>(({ className, children, ...props }, ref) => {
  let lang = detectLang(children);
  return (
    <p
      className={cn(
        "[&:not(:first-child)]:mt-5 text-base w-full",
        lang === "jpn" && "text-base-ja font-ja  font-medium",
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </p>
  );
});
P.displayName = "P";

export const Blockquote = React.forwardRef<
  HTMLQuoteElement,
  React.ComponentProps<"blockquote">
>(({ className, ...props }, ref) => (
  <blockquote
    className={cn("text-lg mt-5 pl-5 border-l-2", className)}
    ref={ref}
    {...props}
  />
));
Blockquote.displayName = "Blockquote";

export const Ulist = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    className={cn("pl-[0.95em] indent-[-0.95em]", className)}
    ref={ref}
    {...props}
  />
));
Ulist.displayName = "Ulist";

export const ListItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, children, ...props }, ref) => {
  let lang = detectLang(children);
  return (
    <li
      className={cn(
        "before:content-['–_']",
        lang === "jpn" && "text-base-ja font-ja font-medium indent-[-0.85em]",
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </li>
  );
});
ListItem.displayName = "ListItem";

interface HeroProps extends React.ComponentProps<"span"> {
  language?: Language;
}

export const Hero = React.forwardRef<HTMLSpanElement, HeroProps>(
  ({ language, className, children, ...props }, ref) => {
    let lang = language
      ? language === "en"
        ? "eng"
        : "jpn"
      : detectLang(children);
    return (
      <span
        className={cn(
          "text-base",
          lang === "jpn" && "text-base-ja font-ja  font-medium",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </span>
    );
  }
);
Hero.displayName = "Hero";
