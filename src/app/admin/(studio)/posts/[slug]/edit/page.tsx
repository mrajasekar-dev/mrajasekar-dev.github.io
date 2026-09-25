import { notFound } from "next/navigation";

import { PostForm } from "@/components/admin/post-form";
import { getPostRecord } from "@/lib/blog-store";

export const metadata = { title: "Edit post" };

export default async function AdminEditPostPage({ params, searchParams }: PageProps<"/admin/posts/[slug]/edit">) {
  const { slug } = await params;
  const { saved } = await searchParams;
  const post = await getPostRecord(slug);
  if (!post) notFound();

  return <PostForm key={`${post.slug}-${post.date}`} post={post} justSaved={saved === "1"} />;
}
