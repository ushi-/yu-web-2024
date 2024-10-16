// "use client";

import { allProjects } from "contentlayer/generated";
import { notFound } from "next/navigation";
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
import { H1, H3 } from "@/components/ui/typography";
import VideoPlayer from "@/components/video-player";
import { Link } from "@/components/ui/link";

export const generateStaticParams = async () => {
  const sortedProjects = allProjects.sort((a, b) =>
    compareDesc(a.date, b.date)
  );
  return sortedProjects.map((post) => ({ slug: post.slug }));
};

export const generateMetadata = ({
  params,
}: {
  params: { slug: string };
}): Metadata => {
  const post = allProjects.find((post) => post.slug === params.slug);
  if (!post) throw new Error(`Post not found for slug: ${params.slug}`);
  return {
    title: post.title,
    description: post.taglineEn,
    openGraph: {
      title: `${post.title} | Yosuke Ushigome`,
      description: post.taglineEn,
      url: post.url,
      images: [
        { url: post.image, alt: post.imageAlt ? post.imageAlt : post.title },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      creator: "@ushi_",
      images: [post.image],
    },
  };
};

export default async function Page({ params }: { params: { slug: string } }) {
  const sortedProjects = allProjects.sort((a, b) =>
    compareDesc(a.date, b.date)
  );

  // Find the post for the current page.
  const post = sortedProjects.find((post) => post.slug === params.slug);

  // 404 if the post does not exist.
  if (!post) notFound();

  const prevPostIndex = sortedProjects.indexOf(post) - 1;
  const prevPost = prevPostIndex >= 0 ? sortedProjects.at(prevPostIndex) : null;
  const nextPostIndex = sortedProjects.indexOf(post) + 1;
  const nextPost =
    nextPostIndex < sortedProjects.length
      ? sortedProjects.at(nextPostIndex)
      : null;

  // Parse the MDX file via the useMDXComponent hook.
  const MDXContent = getMDXComponent(post.body.code);

  return (
    <main>
      <Header anchors={[{ label: "projects", href: "/projects" }]} />
      <Card className="p-0 lg:py-0">
        <div className="w-full aspect-video relative bg-foreground">
          {post.video ? (
            <VideoPlayer url={post.video} />
          ) : (
            <Image
              src={post.image}
              alt={post.imageAlt ? post.imageAlt : post.title}
              fill
              className="object-cover"
              placeholder="blur"
              blurDataURL={post.imagePlaceholderData}
            />
          )}
        </div>
      </Card>
      <Card className="">
        <CardContentContainer>
          <CardPrimaryContentContainer>
            <CardPrimaryContent>
              <H1>{post.taglineEn}</H1>
            </CardPrimaryContent>
            <CardPrimaryContent>
              <H1>{post.taglineJa}</H1>
            </CardPrimaryContent>
          </CardPrimaryContentContainer>
          <CardFooter>{`${post.title}, ${post.year}`}</CardFooter>
        </CardContentContainer>
        <CardSecondaryContent className="font-condensed text-muted-foreground">
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
                <Link href={prevPost.url}>
                  <div className="flex gap-1 items-middle">
                    <ArrowLeft size={20} strokeWidth={1.5} />
                    Previous project
                  </div>
                </Link>
              )}
            </CardPrimaryContent>
            <CardPrimaryContent>
              {nextPost && (
                <Link href={nextPost.url} className="flex justify-end">
                  <div className="flex gap-1 items-middle">
                    Next project
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
