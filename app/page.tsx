"use client";

import React from "react";
import { allPages } from "contentlayer/generated";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getMDXComponent } from "next-contentlayer/hooks";

import Header from "@/components/header";
import MultiImageCard from "@/components/multi-image-card";
import { mdxComponents } from "@/components/mdx-components";

export default function Home() {
  const pages = allPages.sort((a, b) => a.order - b.order);
  const page = pages.find((page) => page.slug === "home");

  if (!page) notFound();

  const MDXContent = getMDXComponent(page.body.code);

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

        <div className="p-2.5 lg:p-5 ">
          <MDXContent components={mdxComponents} />
        </div>
      </main>
    </>
  );
}
