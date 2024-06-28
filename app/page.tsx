"use client";

import React from "react";
import Link from "next/link";
import { allPages } from "contentlayer/generated";
import { getMDXComponent } from "next-contentlayer/hooks";

import Header from "@/components/header";
import { mdxComponents } from "@/components/mdx-components";
import {
  Card,
  CardContentContainer,
  CardPrimaryContent,
  CardPrimaryContentContainer,
  CardSecondaryContent,
  CardFooter,
} from "@/components/ui/card";

export default function Home() {
  const pages = allPages.sort((a, b) => a.order - b.order);
  return (
    <>
      <Header />
      <main>
        {pages.map((page) => {
          const MDXContentEn = getMDXComponent(page.descriptionEn.code);
          const MDXContentJa = getMDXComponent(page.descriptionJa.code);
          return (
            <Card
              key={page.slug}
              className="[&:not(:first-child)]:mt-5 py-0 lg:py-0"
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
                  page.title.toLowerCase() !== "contact" && (
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
        })}
      </main>
    </>
  );
}
