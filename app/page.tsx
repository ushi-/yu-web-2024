"use client";

import Link from "next/link";
import { useState } from "react";
import { allPages, Page } from "contentlayer/generated";
import { ArrowRight, Plus } from "lucide-react";

import { H1 } from "@/components/ui/typography";
import Header from "@/components/header";
import {
  Card,
  CardContentContainer,
  CardPrimaryContent,
  CardPrimaryContentContainer,
  CardSecondaryContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const PageSection = ({ page }: { page: Page }) => {
  const [linkTextIndex, setLinkTextIndex] = useState(0);
  const linkTextEn = page.linkTextsEn.slice(0, linkTextIndex + 1).join(" ");
  const linkTextJa = page.linkTextsJa.slice(0, linkTextIndex + 1).join("");
  return (
    <Card>
      <CardContentContainer>
        <CardPrimaryContentContainer>
          <CardPrimaryContent>
            <H1>{linkTextEn}</H1>
          </CardPrimaryContent>
          <CardPrimaryContent>
            <H1>{linkTextJa}</H1>
          </CardPrimaryContent>
        </CardPrimaryContentContainer>
        <CardFooter>
          <div className="lg:text-xl xl:text-2xl">
            {linkTextIndex < page.linkTextsEn.length - 1 ? (
              <Button
                variant="ghost"
                onClick={() => {
                  setLinkTextIndex((index) => index + 1);
                }}
              >
                {page.title}
              </Button>
            ) : (
              <Link href={page.slug}>{page.title}</Link>
            )}
          </div>
        </CardFooter>
      </CardContentContainer>
      <CardSecondaryContent />
    </Card>
  );
};

export default function Home() {
  const pages = allPages.sort((a, b) => a.order - b.order);

  return (
    <>
      <Header />
      {pages.map((page, idx) => (
        <PageSection key={idx} page={page} />
      ))}
    </>
  );
}
