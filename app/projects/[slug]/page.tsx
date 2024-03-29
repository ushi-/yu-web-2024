import { allProjects } from "contentlayer/generated";
import { notFound } from "next/navigation";
import { getMDXComponent } from "next-contentlayer/hooks";

import Header from "@/components/header";
import { mdxComponents } from "@/components/mdxComponents";
import BilingualSection from "@/components/bilingualSection";
import { H1, H3 } from "@/components/ui/typography";

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
    <>
      <Header anchors={[{ label: "projects", href: "/projects" }]} />
      <BilingualSection>
        <H1>{post.taglineEn}</H1>
        <H1>{post.taglineJa}</H1>
        <div>
          <H3>{`${post.title}, ${post.year}`}</H3>
        </div>
      </BilingualSection>
      <MDXContent components={mdxComponents} />
    </>
  );
}
