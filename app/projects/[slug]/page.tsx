// "use client";

import { allProjects } from "contentlayer/generated";
import { notFound } from "next/navigation";
import { getMDXComponent } from "next-contentlayer/hooks";
import Image from "next/image";
// import ReactPlayer from "react-player";

import Header from "@/components/header";
import { Card } from "@/components/ui/card";
import { mdxComponents } from "@/components/mdx-components";
import BilingualSection from "@/components/bilingual-section";
import { H1, H3 } from "@/components/ui/typography";
import VideoPlayer from "@/components/video-player";

export const generateStaticParams = async () =>
  allProjects.map((post) => ({ slug: post.slug }));

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
  const post = allProjects.find((post) => post.slug === params.slug);
  if (!post) throw new Error(`Post not found for slug: ${params.slug}`);
  return { title: post.title };
};

export default async function Page({ params }: { params: { slug: string } }) {
  // Find the post for the current page.
  const post = allProjects.find((post) => post.slug === params.slug);

  // 404 if the post does not exist.
  if (!post) notFound();

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
              alt={post.title}
              fill
              className="object-cover"
            />
          )}
        </div>
      </Card>
      <BilingualSection padded className="gap-2.5">
        <H1>{post.taglineEn}</H1>
        <H1>{post.taglineJa}</H1>
        <div className="flex flex-col">
          <H3 className="text-muted-foreground">{`${post.title}, ${post.year}`}</H3>
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
    </main>
  );
}
