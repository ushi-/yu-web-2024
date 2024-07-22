"use client";

import React from "react";
import { allPages } from "contentlayer/generated";

import Header from "@/components/header";
import PageNavigation from "@/components/page-navigation";

export default function Home() {
  const pages = allPages.sort((a, b) => a.order - b.order);
  return (
    <>
      <Header />
      <main className="pt-5 lg:pt-10">
        {pages.map((page) => (
          <PageNavigation key={page.slug} page={page} />
        ))}
      </main>
    </>
  );
}
