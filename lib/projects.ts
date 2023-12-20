import path from "path";

import getPosts, { type Post } from "./posts";

export interface Project extends Post {}

export async function getProjects() {
  const posts = (await getPosts("projects")) as Project[];
  return posts.filter((post) => post !== null);
}

export async function getProject(slug: string) {
  const posts = await getProjects();
  return posts.find((post) => post.slug === slug);
}
