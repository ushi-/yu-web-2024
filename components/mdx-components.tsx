import type { MDXComponents } from "mdx/types";
import Image, { ImageProps } from "next/image";

import { H1, H2, H3, H4, P, Ulist, ListItem } from "@/components/ui/typography";
import { Link } from "@/components/ui/link";

export const mdxComponents: MDXComponents = {
  h1: ({ children }) => <H1>{children}</H1>,
  h2: ({ children }) => <H2>{children}</H2>,
  h3: ({ children }) => <H3>{children}</H3>,
  h4: ({ children }) => (
    <H4 className="mt-5 lg:mt-10 first:mt-0 first:lg:mt-0 mb-2.5 lg:mb-5">
      {children}
    </H4>
  ),
  p: ({ children }) => <P>{children}</P>,
  ul: ({ children }) => <Ulist>{children}</Ulist>,
  li: ({ children }) => <ListItem>{children}</ListItem>,
  a: ({ href, children }) => <Link href={href as string}>{children}</Link>,
  img: ({ src, ...props }) => {
    return (
      /* eslint-disable-next-line jsx-a11y/alt-text*/
      <Image
        className="object-cover"
        width={1280}
        height={1280}
        placeholder="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E"
        {...(props as ImageProps)}
      />
    );
  },
};
