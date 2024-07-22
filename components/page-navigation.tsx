import React from "react";
import Link from "next/link";
import { Page } from "contentlayer/generated";
import { getMDXComponent } from "next-contentlayer/hooks";

import { mdxComponents } from "@/components/mdx-components";
import {
  Card,
  CardContentContainer,
  CardPrimaryContent,
  CardPrimaryContentContainer,
  CardSecondaryContent,
  CardFooter,
} from "@/components/ui/card";

type PageNavigationProps = {
  page: Page;
  showAboutLink?: boolean;
};

const PageNavigation = ({
  page,
  showAboutLink = true,
}: PageNavigationProps) => {
  const MDXContentEn = getMDXComponent(page.descriptionEn.code);
  const MDXContentJa = getMDXComponent(page.descriptionJa.code);
  return (
    <Card key={page.slug} className="[&:not(:first-child)]:mt-5 py-0 lg:py-0">
      <CardContentContainer>
        <CardPrimaryContentContainer>
          <CardPrimaryContent>
            <MDXContentEn components={mdxComponents} />
          </CardPrimaryContent>
          <CardPrimaryContent>
            <MDXContentJa components={mdxComponents} />
          </CardPrimaryContent>
        </CardPrimaryContentContainer>
        {page.title.toLowerCase() !== "home" &&
          page.title.toLowerCase() !== "contact" &&
          (page.title.toLowerCase() !== "about" || showAboutLink) && (
            <CardFooter>
              <Link
                className="hover:text-primary/70 transition-colors"
                href={page.url}
              >
                {page.title}
              </Link>
            </CardFooter>
          )}
      </CardContentContainer>
      <CardSecondaryContent className="font-condensed"></CardSecondaryContent>
    </Card>
  );
};

export default PageNavigation;
