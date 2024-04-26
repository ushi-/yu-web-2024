import type { MDXComponents } from "mdx/types";
import Image, { ImageProps } from "next/image";

import { H1, H2, H3, H4, P } from "@/components/ui/typography";
import { Link } from "@/components/ui/link";

export const mdxComponents: MDXComponents = {
  h1: ({ children }) => <H1>{children}</H1>,
  h2: ({ children }) => <H2>{children}</H2>,
  h3: ({ children }) => <H3>{children}</H3>,
  h4: ({ children }) => <H4>{children}</H4>,
  p: ({ children }) => <P>{children}</P>,
  a: ({ href, children }) => <Link href={href as string}>{children}</Link>,
  img: (props) => (
    <Image
      sizes="100vw"
      style={{ width: "100%", height: "auto" }}
      width={800}
      height={800}
      {...(props as ImageProps)}
    />
  ),
};
