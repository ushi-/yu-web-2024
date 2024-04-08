"use client";

import React, { useState } from "react";
import { allPages } from "contentlayer/generated";
import { getMDXComponent } from "next-contentlayer/hooks";

import { Hero } from "@/components/ui/typography";
import Header from "@/components/header";
import {
  Card,
  CardContentContainer,
  CardPrimaryContent,
  CardPrimaryContentContainer,
  CardSecondaryContent,
} from "@/components/ui/card";
import { heroMdxComponents } from "@/components/mdxComponents";

import { Button } from "@/components/ui/button";
import { Link } from "@/components/ui/link";

export default function Home() {
  const pages = allPages.sort((a, b) => a.order - b.order);
  const [segmentIndeces, setSegmentIndeces] = useState(
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
                const currentSegmentIndex = segmentIndeces[pageIndex];
                const expanded =
                  currentSegmentIndex >= page.heroTextSegmentsEn.length - 1;
                return (
                  <React.Fragment key={pageIndex}>
                    {page.heroTextSegmentsEn
                      .filter(
                        (segment, segmentIndex) =>
                          segmentIndex <= currentSegmentIndex
                      )
                      .map((segment, segmentIndex) => {
                        const MDXContent = getMDXComponent(segment.code);
                        return (
                          <React.Fragment key={pageIndex * 10 + segmentIndex}>
                            <MDXContent components={heroMdxComponents} />
                            <Hero> </Hero>
                          </React.Fragment>
                        );
                      })}
                    {expanded ? (
                      <Button>
                        <Link
                          href={page.url}
                          className=" text-primary-foreground hover:text-primaryry-foreground"
                        >
                          {page.title.toUpperCase()}
                        </Link>
                      </Button>
                    ) : (
                      <Button
                        variant="dot"
                        onClick={() => {
                          setSegmentIndeces((prev) =>
                            prev.map((prevValue, prevIndex) =>
                              prevIndex === pageIndex
                                ? prevValue + 1
                                : prevValue
                            )
                          );
                        }}
                      />
                    )}
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
