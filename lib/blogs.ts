import fs from "node:fs";
import path from "node:path";
import blogIndex from "@/content/blogs/index.json";

const CONTENT_DIR = path.join(process.cwd(), "content", "blogs");

export type BlogSummary = (typeof blogIndex)[number];

export type BlogPost = BlogSummary & {
  url: string;
  author: { name: string; creds: string; image: string };
  editor: string;
  bodyHtml: string;
  images: string[];
};

export const getAllBlogSlugs = (): string[] => blogIndex.map((post) => post.slug);

export const getBlogSummaries = (): BlogSummary[] => blogIndex;

export const getBlogBySlug = (slug: string): BlogPost | null => {
  const filePath = path.join(CONTENT_DIR, `${slug}.json`);
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, "utf-8")) as BlogPost;
};

/**
 * index.json is sorted newest -> oldest. "Previous" walks toward older
 * posts, "Next" walks toward newer ones (classic blog pagination).
 */
export const getAdjacentBlogs = (slug: string) => {
  const i = blogIndex.findIndex((post) => post.slug === slug);
  if (i === -1) return { previous: null, next: null };
  return {
    previous: blogIndex[i + 1] ?? null,
    next: blogIndex[i - 1] ?? null,
  };
};

export const getRelatedBlogs = (slug: string, category: string, limit = 3): BlogSummary[] =>
  blogIndex.filter((post) => post.slug !== slug && post.category === category).slice(0, limit);
