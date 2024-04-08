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

import { Button } from "@/components/ui/button";
import { Link } from "@/components/ui/link";

type HeroSegmentProps = {
  mdxCode: string;
};

const HeroSegment = ({ mdxCode }: HeroSegmentProps) => {};

export default function Home() {
  const pages = allPages.sort((a, b) => a.order - b.order);
  const [segmentIndeces, setSegmentIndeces] = useState<number[]>(
    new Array(pages.length).fill(0)
  );
  const [segmentLengths, setSegmentLengths] = useState<number[]>(
    new Array(pages.length).fill(0)
  );
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  return (
    <>
      <Header />
      <Card>
        <CardContentContainer>
          <CardPrimaryContentContainer>
            <CardPrimaryContent>
              {pages.map((page, pageIndex) => {
                const currentSegmentIndex = segmentIndeces[pageIndex];
                const currentSegmentLength = segmentLengths[pageIndex];
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
                            <MDXContent
                              components={{
                                p: ({ children }) => (
                                  <Hero
                                    length={
                                      segmentIndex === 0
                                        ? 1000
                                        : currentSegmentLength
                                    }
                                  >
                                    {children}
                                  </Hero>
                                ),
                                a: ({ href, children }) => (
                                  <Link href={href as string}>{children}</Link>
                                ),
                              }}
                            />
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
                          if (timeoutRef.current) {
                            clearInterval(timeoutRef.current);
                          }
                          timeoutRef.current = setInterval(() => {
                            setSegmentLengths((prev) => {
                              if (
                                currentSegmentLength >= page.maxSegmentLength
                              ) {
                                clearInterval(
                                  timeoutRef.current as NodeJS.Timeout
                                );
                              }
                              return prev.map((prevValue, prevIndex) =>
                                prevIndex === pageIndex
                                  ? prevValue + 1
                                  : prevValue
                              );
                            });
                          }, 15);
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
