import { defineDocumentType, makeSource } from "contentlayer/source-files";
import slugify from "slugify";
import { format } from "date-fns";

export const Project = defineDocumentType(() => ({
  name: "Project",
  filePathPattern: `projects/*/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
    taglineEn: { type: "string", required: true },
    taglineJa: { type: "string", required: true },
    image: { type: "string", required: true },
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
    year: {
      type: "string",
      resolve: (post) => format(new Date(post.date), "yyyy"),
    },
  },
}));

export const Note = defineDocumentType(() => ({
  name: "Note",
  filePathPattern: `notes/*/*.mdx`,
  contentType: "mdx",
  fields: {
    titleEn: { type: "string", required: true },
    titleJa: { type: "string", required: true },
    date: { type: "date", required: true },
    image: { type: "string", required: false },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (post) => `/notes/${slugify(post.titleEn, { lower: true })}`,
    },
    slug: {
      type: "string",
      resolve: (post) => slugify(post.titleEn, { lower: true }),
    },
  },
}));

export const Page = defineDocumentType(() => ({
  name: "Page",
  filePathPattern: `*/index.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    order: { type: "number", required: true },
    descriptionEn: { type: "mdx", required: true },
    descriptionJa: { type: "mdx", required: true },
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
  documentTypes: [Project, Page, Note],
});
