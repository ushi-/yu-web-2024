import React from "react";
import { allPages, Page } from "contentlayer/generated";
import { getMDXComponent } from "next-contentlayer/hooks";
import Image from "next/image";

import { Hero } from "@/components/ui/typography";
import Header from "@/components/header";
import {
  Card,
  CardContentContainer,
  CardPrimaryContent,
  CardPrimaryContentContainer,
  CardSecondaryContent,
} from "@/components/ui/card";

import { Link } from "@/components/ui/link";
import { cn, Language } from "@/lib/utils";

interface HeroTextProps {
  pages: Page[];
  language: Language;
}

const HeroText = ({ pages, language }: HeroTextProps) => {
  return pages.map((page, pageIndex) => {
    const MDXContent = getMDXComponent(
      page[language === "en" ? "heroTextEn" : "heroTextJa"].code
    );
    return (
      <React.Fragment key={pageIndex}>
        <MDXContent
          components={{
            p: ({ children }) => <Hero>{children}</Hero>,
            a: ({ href, children }) => (
              <Link href={href as string}>{children}</Link>
            ),
          }}
        />
        <Hero language={language}>
          {language === "en" ? " (" : "（"}
          <Link href={page.url}>{`—\u2006${page.title}`}</Link>
          {language === "en" ? "). " : "）。"}
        </Hero>
      </React.Fragment>
    );
  });
};

export default function Home() {
  const pages = allPages.sort((a, b) => a.order - b.order);
  return (
    <>
      <Header />
      <Card className="p-0 lg:py-0">
        {pages.map((page, pageIndex) => {
          return page.image ? (
            <React.Fragment key={pageIndex}>
              <Image
                key={pageIndex}
                src={page.image}
                alt={page.title}
                width={1280}
                height={720}
                className="aspect-ratio-9/16"
              />
            </React.Fragment>
          ) : null;
        })}
      </Card>
      <Card>
        <CardContentContainer>
          <CardPrimaryContentContainer>
            <CardPrimaryContent>
              <HeroText pages={pages} language="en" />
            </CardPrimaryContent>
            <CardPrimaryContent>
              <HeroText pages={pages} language="ja" />
            </CardPrimaryContent>
          </CardPrimaryContentContainer>
        </CardContentContainer>
        <CardSecondaryContent></CardSecondaryContent>
      </Card>
    </>
  );
}
