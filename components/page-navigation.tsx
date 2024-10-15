import React from "react";
import { Page } from "contentlayer/generated";
import { getMDXComponent } from "next-contentlayer/hooks";

import { Link } from "@/components/ui/link";
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
  secondaryContent?: React.ReactNode;
};

const PageNavigation = ({
  page,
  showAboutLink = true,
  secondaryContent = null,
}: PageNavigationProps) => {
  const MDXContentEn = getMDXComponent(page.descriptionEn.code);
  const MDXContentJa = getMDXComponent(page.descriptionJa.code);
  return (
    <Card
      key={page.slug}
      className="[&:not(:first-child)]:mt-5 py-0 lg:py-0 flex-col-reverse gap-5"
    >
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
                {page.title.toLowerCase()}
              </Link>
            </CardFooter>
          )}
      </CardContentContainer>
      <CardSecondaryContent>{secondaryContent}</CardSecondaryContent>
    </Card>
  );
};

export default PageNavigation;
