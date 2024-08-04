import { allNotes } from "contentlayer/generated";
import { notFound, redirect } from "next/navigation";
import { getMDXComponent } from "next-contentlayer/hooks";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight } from "lucide-react";

import Header from "@/components/header";
import {
  Card,
  CardContentContainer,
  CardPrimaryContent,
  CardPrimaryContentContainer,
  CardSecondaryContent,
} from "@/components/ui/card";
import { mdxComponents } from "@/components/mdx-components";
import BilingualSection from "@/components/bilingual-section";
import { H1, H3 } from "@/components/ui/typography";
import { Link } from "@/components/ui/link";

export const generateStaticParams = async () =>
  allNotes.map((post) => ({ slug: post.slug }));

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
  // Find the post for the current page.
  const post = allNotes.find((post) => post.slug === params.slug);

  // 404 if the post does not exist.
  if (!post) notFound();

  if (post.link) {
    redirect(post.link);
  }

  const prevPostIndex = allNotes.indexOf(post) - 1;
  const prevPost = prevPostIndex >= 0 ? allNotes.at(prevPostIndex) : null;
  const nextPostIndex = allNotes.indexOf(post) + 1;
  const nextPost =
    nextPostIndex < allNotes.length ? allNotes.at(nextPostIndex) : null;

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
              alt={post.titleEn}
              fill
              className="object-cover"
            />
          </div>
        </Card>
      )}
      <BilingualSection padded className="gap-2.5">
        <H1>{post.titleEn}</H1>
        <H1>{post.titleJa}</H1>
        <div className="flex flex-col">
          <H3 className="text-muted-foreground">{post.formattedDate}</H3>
          {post.meta &&
            post.meta.map((meta) => (
              <H3 key={meta} className="text-muted-foreground">
                {meta}
              </H3>
            ))}
        </div>
      </BilingualSection>
      <div className="p-2.5 lg:p-5">
        <MDXContent components={mdxComponents} />
      </div>
      <Card>
        <CardContentContainer>
          <CardPrimaryContentContainer>
            <CardPrimaryContent>
              {prevPost && (
                <Link href={prevPost.url}>
                  <div className="flex gap-1 items-middle">
                    <ArrowLeft size={20} strokeWidth={1.5} />
                    Previous note
                  </div>
                </Link>
              )}
            </CardPrimaryContent>
            <CardPrimaryContent>
              {nextPost && (
                <Link href={nextPost.url} className="flex justify-end">
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
