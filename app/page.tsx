import Link from "next/link";
import { compareDesc, format, parseISO } from "date-fns";
import { allPages, Page } from "contentlayer/generated";

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

const PageSection = ({ page }: { page: Page }) => (
  <Card>
    <CardContentContainer>
      <CardPrimaryContentContainer>
        <CardPrimaryContent>{page.linkTextsEn[0]}</CardPrimaryContent>
        <CardPrimaryContent className="text-ja">
          {page.linkTextsJa[0]}
        </CardPrimaryContent>
      </CardPrimaryContentContainer>
      <CardFooter>
        <Link href={page.slug}> {page.title}</Link>
      </CardFooter>
    </CardContentContainer>
    <CardSecondaryContent />
  </Card>
);

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
