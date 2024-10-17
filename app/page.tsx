"use client";

import React from "react";
import { allPages } from "contentlayer/generated";
import Image from "next/image";

import Header from "@/components/header";
import PageNavigation from "@/components/page-navigation";
import MultiImageCard from "@/components/multi-image-card";

export default function Home() {
  const pages = allPages.sort((a, b) => a.order - b.order);
  const page = pages.find((page) => page.slug === "home");

  return (
    <>
      <Header />
      <main className="">
        {page?.heroImages && (
          <MultiImageCard>
            {page.heroImages.map((image, i) => (
              <Image
                key={image.src}
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-opacity duration-300"
                placeholder="blur"
                blurDataURL={page.heroImagesPlaceholderData[i]}
                priority
              />
            ))}
          </MultiImageCard>
        )}

        {pages.map((page) => (
          <PageNavigation key={page.slug} page={page} />
        ))}
      </main>
    </>
  );
}
