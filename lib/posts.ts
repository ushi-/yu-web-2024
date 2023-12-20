import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { cache } from "react";
import slugify from "slugify";

export interface Post {
  title: string;
  date: string;
  published?: boolean;
  slug: string;
  content: string;
}

export const getPosts = cache(async (dir: string) => {
  const fullDir = path.join("content", dir);
  const posts = await fs.readdir(fullDir);
  return Promise.all(
    posts
      .filter((file) => path.extname(file) === ".mdx")
      .map(async (file) => {
        const filePath = path.join(fullDir, file);
        const postContent = await fs.readFile(filePath, "utf8");
        const { data, content } = matter(postContent);
        const slug = slugify(data.title, { lower: true });
        // if (data.published === false) {
        //   return null;
        // }
        return { ...data, slug, content } as Post;
      })
  );
});

export default getPosts;
