import { allNotes } from "contentlayer/generated";
import { notFound } from "next/navigation";
import { getMDXComponent } from "next-contentlayer/hooks";
import Image from "next/image";

import Header from "@/components/header";
import { Card } from "@/components/ui/card";
import { mdxComponents } from "@/components/mdx-components";
import BilingualSection from "@/components/bilingual-section";
import { H1, H3 } from "@/components/ui/typography";

export const generateStaticParams = async () =>
  allNotes.map((post) => ({ slug: post.slug }));

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
  const post = allNotes.find((post) => post.slug === params.slug);
  if (!post) throw new Error(`Post not found for slug: ${params.slug}`);
  return { title: post.titleEn };
};

export default async function Page({ params }: { params: { slug: string } }) {
  // Find the post for the current page.
  const post = allNotes.find((post) => post.slug === params.slug);

  // 404 if the post does not exist.
  if (!post) notFound();

  // Parse the MDX file via the useMDXComponent hook.
  const MDXContent = getMDXComponent(post.body.code);

  return (
    <>
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
      <BilingualSection>
        <H1>{post.titleEn}</H1>
        <H1>{post.titleJa}</H1>
        <div className="flex flex-col">
          <H3>{post.formattedDate}</H3>
          {post.meta && post.meta.map((meta) => <H3 key={meta}>{meta}</H3>)}
        </div>
      </BilingualSection>
      <MDXContent components={mdxComponents} />
    </>
  );
}
