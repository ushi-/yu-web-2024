import {
  defineDocumentType,
  defineNestedType,
  makeSource,
} from "contentlayer/source-files";
import slugify from "slugify";
import { format } from "date-fns";
import fs from "node:fs/promises";
import { getPlaiceholder } from "plaiceholder";

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
    imagePlaceholderData: {
      type: "string",
      resolve: async (post) => {
        const file = await fs.readFile(`./public${post.image}`);
        const { base64 } = await getPlaiceholder(file);
        return base64;
      },
    },
    thumbnailPlaceholderData: {
      type: "string",
      resolve: async (post) => {
        if (post.thumbnail === undefined) return null;
        const file = await fs.readFile(`./public${post.thumbnail}`);
        const { base64 } = await getPlaiceholder(file);
        return base64;
      },
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
    imagePlaceholderData: {
      type: "string",
      resolve: async (post) => {
        if (post.image === undefined) return null;
        const file = await fs.readFile(`./public${post.image}`);
        const { base64 } = await getPlaiceholder(file);
        return base64;
      },
    },
  },
}));

const Image = defineNestedType(() => ({
  name: "Image",
  fields: {
    src: {
      type: "string",
      required: true,
    },
    alt: {
      type: "string",
      required: true,
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
    heroImages: { type: "list", of: Image, required: false },
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
    heroImagesPlaceholderData: {
      type: "list",
      of: { type: "string" },
      resolve: async (post) => {
        if (post.heroImages === undefined) return null;
        // the list created by Contentlayer is not an array,
        // so we need to cast it to an array to access
        // _array property and use map method
        const heroImages = post.heroImages as any;
        if (heroImages === undefined) return null;
        const placeholderData = await Promise.all(
          heroImages._array.map(async (image: { src: string }) => {
            const file = await fs.readFile(`./public${image.src}`);
            const { base64 } = await getPlaiceholder(file);
            return base64;
          })
        );
        return placeholderData;
      },
    },
  },
}));

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Project, Page, Note],
});
