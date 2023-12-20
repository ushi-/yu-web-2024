import { getProjects, getProject, type Project } from "@/lib/projects";

export async function generateStaticParams() {
  const posts = await getProjects();
  return posts.map((post: Project) => ({
    slug: post.slug,
  }));
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const project = await getProject(slug);

  return <div>My Post: {project ? project.title : "undefined"}</div>;
}
