import { allNotes } from "contentlayer/generated";
import { notFound, redirect } from "next/navigation";
import { getMDXComponent } from "next-contentlayer/hooks";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { compareDesc } from "date-fns";

import Header from "@/components/header";
import {
  Card,
  CardContentContainer,
  CardPrimaryContent,
  CardPrimaryContentContainer,
  CardSecondaryContent,
  CardFooter,
} from "@/components/ui/card";
import { mdxComponents } from "@/components/mdx-components";
import { H1, H3, P } from "@/components/ui/typography";
import { Link } from "@/components/ui/link";

export const generateStaticParams = async () => {
  const sortedNotes = allNotes.sort((a, b) => compareDesc(a.date, b.date));
  return sortedNotes.map((post) => ({ slug: post.slug }));
};

export const generateMetadata = ({
  params,
}: {
  params: { slug: string };
}): Metadata => {
  const post = allNotes.find((post) => post.slug === params.slug);
  if (!post) throw new Error(`Post not found for slug: ${params.slug}`);
  return {
    title: post.titleEn,
    description: post.formattedDate,
    openGraph: {
      title: `${post.titleEn} | Yosuke Ushigome`,
      description: post.formattedDate,
      url: post.url,
      images: post.image
        ? [
            {
              url: post.image,
              alt: post.imageAlt ? post.imageAlt : post.titleEn,
            },
          ]
        : [],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      creator: "@ushi_",
      images: post.image
        ? [
            {
              url: post.image,
              alt: post.imageAlt ? post.imageAlt : post.titleEn,
            },
          ]
        : [],
    },
  };
};

export default async function Page({ params }: { params: { slug: string } }) {
  const sortedNotes = allNotes.sort((a, b) => compareDesc(a.date, b.date));
  // Find the post for the current page.
  const post = sortedNotes.find((post) => post.slug === params.slug);

  // 404 if the post does not exist.
  if (!post) notFound();

  if (post.link) {
    redirect(post.link);
  }

  const prevPostIndex = sortedNotes.indexOf(post) - 1;
  const prevPost = prevPostIndex >= 0 ? sortedNotes.at(prevPostIndex) : null;
  const nextPostIndex = sortedNotes.indexOf(post) + 1;
  const nextPost =
    nextPostIndex < sortedNotes.length ? sortedNotes.at(nextPostIndex) : null;

  // Parse the MDX file via the useMDXComponent hook.
  const MDXContent = getMDXComponent(post.body.code);

  return (
    <main>
      <Header anchors={[{ label: "notes", href: "/notes" }]} />
      {post.image && (
        <Card className="p-0 lg:py-0">
          <div className="w-full aspect-video relative">
            <Image
              src={post.image}
              alt={
                post.imageAlt
                  ? post.imageAlt
                  : post.titleEn
                  ? post.titleEn
                  : post.titleJa
                  ? post.titleJa
                  : ""
              }
              fill
              className="object-cover transition-opacity duration-300"
              placeholder="blur"
              blurDataURL={post.imagePlaceholderData}
            />
          </div>
        </Card>
      )}
      <Card>
        <CardContentContainer>
          <div className="flex flex-col gap-1">
            <CardPrimaryContentContainer>
              {(post.language === "en" || post.language === "en+ja") && (
                <CardPrimaryContent>
                  <H1>{post.titleEn}</H1>
                </CardPrimaryContent>
              )}
              {(post.language === "ja" || post.language === "en+ja") && (
                <CardPrimaryContent>
                  <H1>{post.titleJa}</H1>
                </CardPrimaryContent>
              )}
            </CardPrimaryContentContainer>
            {(post.subtitleEn || post.subtitleJa) && (
              <CardPrimaryContentContainer>
                {(post.language === "en" || post.language === "en+ja") &&
                  post.subtitleEn && (
                    <CardPrimaryContent>
                      <P className="inline mr-2">{post.subtitleEn}</P>
                    </CardPrimaryContent>
                  )}
                {(post.language === "ja" || post.language === "en+ja") &&
                  post.subtitleJa && (
                    <CardPrimaryContent>
                      <P className="inline mr-2">{post.subtitleJa}</P>
                    </CardPrimaryContent>
                  )}
              </CardPrimaryContentContainer>
            )}
          </div>
          <CardFooter className="group-hover:text-primary/70 transition-colors">
            {post.formattedDate}
          </CardFooter>
        </CardContentContainer>
        <CardSecondaryContent>
          <div className="flex flex-col">
            {post.meta &&
              post.meta.map((meta) => (
                <H3 key={meta} className="text-muted-foreground">
                  {meta}
                </H3>
              ))}
          </div>
        </CardSecondaryContent>
      </Card>
      <div className="p-2.5 lg:p-5">
        <MDXContent components={mdxComponents} />
      </div>
      <Card>
        <CardContentContainer>
          <CardFooter></CardFooter>
        </CardContentContainer>
        <CardSecondaryContent />
      </Card>
      <Card>
        <CardContentContainer>
          <CardPrimaryContentContainer>
            <CardPrimaryContent>
              {prevPost && (
                <Link href={prevPost.link ? prevPost.link : prevPost.url}>
                  <div className="flex gap-1 items-middle">
                    <ArrowLeft size={20} strokeWidth={1.5} />
                    Previous note
                  </div>
                </Link>
              )}
            </CardPrimaryContent>
            <CardPrimaryContent>
              {nextPost && (
                <Link
                  href={nextPost.link ? nextPost.link : nextPost.url}
                  className="flex justify-end"
                >
                  <div className="flex gap-1 items-middle">
                    Next note
                    <ArrowRight size={20} strokeWidth={1.5} />
                  </div>
                </Link>
              )}
            </CardPrimaryContent>
          </CardPrimaryContentContainer>
        </CardContentContainer>
        <CardSecondaryContent />
      </Card>
    </main>
  );
}
