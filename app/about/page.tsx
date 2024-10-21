import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMDXComponent } from "next-contentlayer/hooks";

import Header from "@/components/header";
import { mdxComponents } from "@/components/mdx-components";

import { allPages } from "contentlayer/generated";

export const metadata: Metadata = {
  title: "About",
};

export default async function Page() {
  const pages = allPages
    .sort((a, b) => a.order - b.order)
    .filter((page) => page.slug !== "contact");
  const post = pages.find((post) => post.slug === "about");

  // 404 if the post does not exist.
  if (!post) notFound();

  // Parse the MDX file via the useMDXComponent hook.
  const MDXContent = getMDXComponent(post.body.code);

  return (
    <>
      <Header currentUrl="/about" />
      <main className="pt-5 lg:pt-10">
        <div className="p-2.5 lg:p-5">
          <MDXContent components={mdxComponents} />
        </div>
      </main>
    </>
  );
}
