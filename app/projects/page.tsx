import Link from "next/link";
import { compareDesc, format, parseISO } from "date-fns";
import { allProjects, Project } from "contentlayer/generated";

import { H1 } from "@/components/ui/typography";
import Header from "@/components/header";

function PostCard(post: Project) {
  return (
    <div className="mb-8">
      <h2 className="mb-1 text-xl">
        <Link
          href={post.url}
          className="text-blue-700 hover:text-blue-900 dark:text-blue-400"
        >
          {post.title}
        </Link>
      </h2>
      <time dateTime={post.date} className="mb-2 block text-xs text-gray-600">
        {format(parseISO(post.date), "LLLL d, yyyy")}
      </time>
    </div>
  );
}

export default function Home() {
  const posts = allProjects.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );

  return (
    <>
      <Header />
      <H1>Next.js + Contentlayer Example</H1>
      {posts.map((post, idx) => (
        <PostCard key={idx} {...post} />
      ))}
    </>
  );
}
