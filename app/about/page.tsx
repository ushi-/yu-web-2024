import { notFound } from "next/navigation";
import { getMDXComponent } from "next-contentlayer/hooks";

import Header from "@/components/header";
import { mdxComponents } from "@/components/mdxComponents";

import { allPages } from "contentlayer/generated";

export const generateMetadata = () => {
  return { title: "About" };
};

export default async function Page() {
  // Find the post for the current page.
  const post = allPages.find((post) => post.slug === "about");

  // 404 if the post does not exist.
  if (!post) notFound();

  // Parse the MDX file via the useMDXComponent hook.
  const MDXContent = getMDXComponent(post.body.code);

  return (
    <>
      <Header anchors={[{ label: "about", href: "/about" }]} />
      {/* Some code ... */}
      <MDXContent components={mdxComponents} />
    </>
  );
}
