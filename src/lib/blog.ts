import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";

import { listAllPosts, getPostRecord, type BlogChannel, type BlogPostRecord } from "@/lib/blog-store";

export type { BlogChannel };

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

function estimateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function toMeta(record: BlogPostRecord): PostMeta {
  return {
    slug: record.slug,
    title: record.title,
    date: record.date,
    channel: record.channel,
    excerpt: record.excerpt,
    coverImage: record.coverImage,
    coverImageAlt: record.coverImageAlt,
    readingTime: estimateReadingTime(record.content),
  };
}

export async function getAllSlugs(): Promise<string[]> {
  const posts = await listAllPosts();
  return posts.filter((p) => p.published).map((p) => p.slug);
}

export async function getAllPosts(): Promise<PostMeta[]> {
  const posts = await listAllPosts();
  return posts
    .filter((p) => p.published)
    .map(toMeta)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostsByChannel(channel: BlogChannel): Promise<PostMeta[]> {
  const posts = await getAllPosts();
  return posts.filter((p) => p.channel === channel);
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const record = await getPostRecord(slug);
  if (!record || !record.published) {
    throw new Error(`Post not found: ${slug}`);
  }

  const processed = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(record.content);

  return {
    ...toMeta(record),
    html: String(processed),
  };
}
