"use client";

import React from "react";
import { allPages, Page } from "contentlayer/generated";
import { getMDXComponent } from "next-contentlayer/hooks";

import Header from "@/components/header";
import { Card } from "@/components/ui/card";
import { mdxComponents } from "@/components/mdxComponents";
import Image from "next/image";

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
