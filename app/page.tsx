"use client";

import { useState } from "react";
import { allPages, Page } from "contentlayer/generated";
import { getMDXComponent } from "next-contentlayer/hooks";
import React from "react";

import { H1, Hero } from "@/components/ui/typography";
import Header from "@/components/header";
import {
  Card,
  CardContentContainer,
  CardPrimaryContent,
  CardPrimaryContentContainer,
  CardSecondaryContent,
} from "@/components/ui/card";
import { heroMdxComponents } from "@/components/mdxComponents";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function Home() {
  const pages = allPages.sort((a, b) => a.order - b.order);
  const [linkTextIndeces, setLinkTextIndeces] = useState(
    new Array(pages.length).fill(0)
  );

  return (
    <>
      <Header />
      <Card>
        <CardContentContainer>
          <CardPrimaryContentContainer>
            <CardPrimaryContent>
              {pages.map((page, pageIndex) => {
                const currentLinkTextIndex = linkTextIndeces[pageIndex];
                return (
                  <React.Fragment key={pageIndex}>
                    {page.linkTextsEn
                      .filter(
                        (linkText, textIndex) =>
                          textIndex <= currentLinkTextIndex
                      )
                      .map((linkText, textIndex) => {
                        const MDXContent = getMDXComponent(linkText.code);
                        return (
                          <React.Fragment key={pageIndex * 10 + textIndex}>
                            <MDXContent components={heroMdxComponents} />
                            <Hero> </Hero>
                          </React.Fragment>
                        );
                      })}
                    <Button
                      onClick={() => {
                        setLinkTextIndeces((prev) =>
                          prev.map((prevValue, prevIndex) =>
                            prevIndex === pageIndex
                              ? Math.min(
                                  pages[pageIndex].linkTextsEn.length - 1,
                                  prevValue + 1
                                )
                              : prevValue
                          )
                        );
                      }}
                    >
                      Button
                    </Button>
                    <Hero> </Hero>
                  </React.Fragment>
                );
              })}
            </CardPrimaryContent>
            <CardPrimaryContent></CardPrimaryContent>
          </CardPrimaryContentContainer>
        </CardContentContainer>
        <CardSecondaryContent />
      </Card>
    </>
  );
}
