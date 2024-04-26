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
import { mdxComponents } from "@/components/mdxComponents";

export default function Home() {
  // const pages = allPages.sort((a, b) => a.order - b.order);
  const page = allPages.find((page) => page.slug === "home");
  if (!page) return null;
  const MDXContent = getMDXComponent(page.body.code);
  return (
    <>
      <Header />
      <Card className="p-0 lg:py-0">
        <div className=" bg-primary w-full aspect-[16/9]" />
      </Card>
      <MDXContent components={mdxComponents} />
    </>
  );
}
