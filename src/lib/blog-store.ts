import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import { get, put } from "@vercel/blob";

export type BlogChannel = "technical" | "business";

export type BlogPostRecord = {
  slug: string;
  title: string;
  date: string;
  channel: BlogChannel;
  excerpt: string;
  coverImage: string;
  coverImageAlt: string;
  content: string;
  published: boolean;
};

const POSTS_PATHNAME = "posts.json";
const POSTS_DIR = path.join(process.cwd(), "src/content/posts");

type Frontmatter = {
  title: string;
  date: string;
  channel: BlogChannel;
  excerpt: string;
  coverImage: string;
  coverImageAlt: string;
};

function isBlobConfigured(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

/** The original markdown files — used for local dev without Blob credentials,
 * and as the one-time seed the first time Blob storage is provisioned. */
function readLocalPosts(): BlogPostRecord[] {
  if (!fs.existsSync(POSTS_DIR)) return [];

  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const slug = f.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(POSTS_DIR, f), "utf8");
      const { data, content } = matter(raw) as unknown as { data: Frontmatter; content: string };
      return { slug, ...data, content: content.trim(), published: true };
    });
}

async function readPostsBlob(): Promise<BlogPostRecord[] | null> {
  const result = await get(POSTS_PATHNAME, { access: "private" });
  if (!result) return null;

  const text = await new Response(result.stream).text();
  const parsed = JSON.parse(text) as { posts: BlogPostRecord[] };
  return parsed.posts;
}

async function writePostsBlob(posts: BlogPostRecord[]): Promise<void> {
  await put(POSTS_PATHNAME, JSON.stringify({ posts }, null, 2), {
    access: "private",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}

async function loadPosts(): Promise<BlogPostRecord[]> {
  if (!isBlobConfigured()) return readLocalPosts();

  const existing = await readPostsBlob();
  if (existing) return existing;

  // First run against a freshly-provisioned Blob store — seed it from the
  // markdown files so nothing already published is lost.
  const seeded = readLocalPosts();
  await writePostsBlob(seeded);
  return seeded;
}

export async function listAllPosts(): Promise<BlogPostRecord[]> {
  return loadPosts();
}

export async function getPostRecord(slug: string): Promise<BlogPostRecord | undefined> {
  const posts = await loadPosts();
  return posts.find((p) => p.slug === slug);
}

export async function savePostRecord(record: BlogPostRecord): Promise<void> {
  if (!isBlobConfigured()) {
    throw new Error("Blob storage isn't configured — can't save posts.");
  }

  const posts = await loadPosts();
  const idx = posts.findIndex((p) => p.slug === record.slug);
  if (idx === -1) posts.push(record);
  else posts[idx] = record;

  await writePostsBlob(posts);
}

export async function deletePostRecord(slug: string): Promise<void> {
  if (!isBlobConfigured()) {
    throw new Error("Blob storage isn't configured — can't delete posts.");
  }

  const posts = await loadPosts();
  await writePostsBlob(posts.filter((p) => p.slug !== slug));
}
