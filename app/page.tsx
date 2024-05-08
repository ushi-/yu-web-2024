"use client";

import React from "react";
import { allPages } from "contentlayer/generated";
import { getMDXComponent } from "next-contentlayer/hooks";

import Header from "@/components/header";
import { mdxComponents } from "@/components/mdx-components";

export default function Home() {
  // const pages = allPages.sort((a, b) => a.order - b.order);
  const page = allPages.find((page) => page.slug === "home");
  if (!page) return null;
  const MDXContent = getMDXComponent(page.body.code);
  return (
    <>
      <Header />
      <MDXContent components={mdxComponents} />
    </>
  );
}
