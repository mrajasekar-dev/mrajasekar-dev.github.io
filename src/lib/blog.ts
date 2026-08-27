import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";

const POSTS_DIR = path.join(process.cwd(), "src/content/posts");

export type BlogChannel = "technical" | "business";

export const channelLabels: Record<BlogChannel, string> = {
  technical: "Technical",
  business: "For Clients",
};

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  channel: BlogChannel;
  excerpt: string;
  coverImage: string;
  coverImageAlt: string;
  readingTime: number;
};

export type Post = PostMeta & { html: string };

type Frontmatter = {
  title: string;
  date: string;
  channel: BlogChannel;
  excerpt: string;
  coverImage: string;
  coverImageAlt: string;
};

function readSlugs(): string[] {
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

function readRaw(slug: string) {
  const file = fs.readFileSync(path.join(POSTS_DIR, `${slug}.md`), "utf8");
  return matter(file) as unknown as { data: Frontmatter; content: string };
}

function estimateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function toMeta(slug: string, data: Frontmatter, content: string): PostMeta {
  return {
    slug,
    title: data.title,
    date: data.date,
    channel: data.channel,
    excerpt: data.excerpt,
    coverImage: data.coverImage,
    coverImageAlt: data.coverImageAlt,
    readingTime: estimateReadingTime(content),
  };
}

export function getAllSlugs(): string[] {
  return readSlugs();
}

export function getAllPosts(): PostMeta[] {
  return readSlugs()
    .map((slug) => {
      const { data, content } = readRaw(slug);
      return toMeta(slug, data, content);
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostsByChannel(channel: BlogChannel): PostMeta[] {
  return getAllPosts().filter((p) => p.channel === channel);
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const { data, content } = readRaw(slug);

  const processed = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(content);

  return {
    ...toMeta(slug, data, content),
    html: String(processed),
  };
}
