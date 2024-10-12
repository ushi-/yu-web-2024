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
    imageAlt: { type: "string", required: false },
    thumbnail: { type: "string", required: false },
    thumbnailAlt: { type: "string", required: false },
    thumbnailOrientation: {
      type: "enum",
      options: ["landscape", "portrait", "square"],
      default: "landscape",
      required: false,
    },
    meta: { type: "list", of: { type: "string" }, required: false },
    video: { type: "string", required: false },
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
    slug: { type: "string", required: true },
    language: { type: "enum", options: ["en", "ja", "en+ja"], required: true },
    titleEn: { type: "string", required: false },
    titleJa: { type: "string", required: false },
    subtitleEn: { type: "string", required: false },
    subtitleJa: { type: "string", required: false },
    date: { type: "date", required: true },
    image: { type: "string", required: false },
    imageAlt: { type: "string", required: false },
    meta: { type: "list", of: { type: "string" }, required: false },
    link: { type: "string", required: false },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (post) => `/notes/${post.slug}`,
    },
    formattedDate: {
      type: "string",
      resolve: (post) => format(new Date(post.date), "yyyy-MM-dd"),
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
