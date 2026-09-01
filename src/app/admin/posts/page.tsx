import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DeletePostButton } from "@/components/admin/delete-post-button";
import { listAllPosts } from "@/lib/blog-store";
import { channelLabels } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Posts",
  robots: { index: false, follow: false },
};

// Always read the current Blob-backed post list — never serve a stale
// build-time snapshot.
export const dynamic = "force-dynamic";

export default async function AdminPostsPage() {
  const posts = (await listAllPosts()).sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Link
        href="/admin"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" /> Back to admin
      </Link>

      <div className="mt-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Blog posts</h1>
        <Button asChild size="sm">
          <Link href="/admin/posts/new">
            <Plus className="size-4" /> New post
          </Link>
        </Button>
      </div>

      <div className="mt-6 flex flex-col divide-y divide-border rounded-xl border border-border">
        {posts.length === 0 ? (
          <p className="p-5 text-sm text-muted-foreground">No posts yet.</p>
        ) : (
          posts.map((post) => (
            <div key={post.slug} className="flex items-center justify-between gap-4 p-4">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{post.title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {channelLabels[post.channel]} · {post.date} ·{" "}
                  {post.published ? "Published" : "Draft"}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <Button asChild variant="outline" size="sm">
                  <Link href={`/admin/posts/${post.slug}/edit`}>Edit</Link>
                </Button>
                <DeletePostButton slug={post.slug} title={post.title} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
