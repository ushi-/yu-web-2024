"use client";

import React from "react";
import { allPages } from "contentlayer/generated";
import { getMDXComponent } from "next-contentlayer/hooks";

import Header from "@/components/header";
import PageNavigation from "@/components/page-navigation";
import { mdxComponents } from "@/components/mdx-components";

export default function Home() {
  const pages = allPages.sort((a, b) => a.order - b.order);
  const page = allPages.find((page) => page.slug === "home");
  if (!page) return null;
  const MDXContent = getMDXComponent(page.body.code);
  const homeSecondaryContent = <MDXContent components={mdxComponents} />;

  return (
    <>
      <Header />
      <main className="">
        {homeSecondaryContent}
        {pages.map((page) => (
          <PageNavigation
            key={page.slug}
            page={page}
            // secondaryContent={
            //   page.slug === "home" ? homeSecondaryContent : null
            // }
          />
        ))}
      </main>
    </>
  );
}
