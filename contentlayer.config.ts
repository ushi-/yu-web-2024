import { defineDocumentType, makeSource } from "contentlayer/source-files";
import slugify from "slugify";

export const Project = defineDocumentType(() => ({
  name: "Project",
  filePathPattern: `projects/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (post) => `/projects/${slugify(post.title, { lower: true })}`,
    },
    slug: {
      type: "string",
      resolve: (post) => slugify(post.title, { lower: true }),
    },
  },
}));

export const Page = defineDocumentType(() => ({
  name: "Page",
  filePathPattern: `*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    order: { type: "number", required: true },
    linkTextsEn: { type: "list", of: { type: "string" }, required: true },
    linkTextsJa: { type: "list", of: { type: "string" }, required: true },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (post) => `/${slugify(post.title, { lower: true })}`,
    },
    slug: {
      type: "string",
      resolve: (post) => slugify(post.title, { lower: true }),
    },
  },
}));

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Project, Page],
});
