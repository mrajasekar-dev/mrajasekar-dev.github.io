import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";

import { Pill, StudioHeader, studioButton } from "@/components/studio/ui";
import { DeletePostButton } from "@/components/admin/delete-post-button";
import { listAllPosts } from "@/lib/blog-store";
import { channelLabels } from "@/lib/blog";

export const metadata = { title: "Writing" };

export default async function AdminPostsPage() {
  const posts = (await listAllPosts()).sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <div className="flex flex-col gap-6">
      <StudioHeader
        eyebrow="Content"
        title="Writing"
        actions={
          <Link href="/admin/posts/new" className={studioButton.ink}>
            <Plus className="size-4" aria-hidden /> New post
          </Link>
        }
      >
        {posts.filter((p) => p.published).length} published · {posts.filter((p) => !p.published).length} drafts
      </StudioHeader>

      {posts.length === 0 ? (
        <div className="rounded-lg border border-dashed border-rule p-12 text-center">
          <p className="display text-3xl">A blank page.</p>
          <p className="mt-2 text-sm text-muted-foreground">Your first post is one click away.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-rule bg-paper">
          <table className="w-full text-sm">
            <thead className="hidden border-b border-rule sm:table-header-group">
              <tr className="text-left">
                <th className="annot px-5 py-3 font-normal">Title</th>
                <th className="annot px-3 py-3 font-normal">Channel</th>
                <th className="annot px-3 py-3 font-normal">Date</th>
                <th className="annot px-3 py-3 font-normal">Status</th>
                <th className="px-5 py-3"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-rule">
              {posts.map((post) => (
                <tr key={post.slug} className="group flex flex-col gap-2 px-5 py-4 hover:bg-background sm:table-row sm:p-0">
                  <td className="sm:px-5 sm:py-4">
                    <Link href={`/admin/posts/${post.slug}/edit`} className="font-medium hover:text-brand">
                      {post.title}
                    </Link>
                    <p className="mt-0.5 font-mono text-xs text-muted-foreground">/blog/{post.slug}</p>
                  </td>
                  <td className="text-muted-foreground sm:px-3">{channelLabels[post.channel]}</td>
                  <td className="font-mono text-xs tabular-nums text-muted-foreground sm:px-3">{post.date.slice(0, 10)}</td>
                  <td className="sm:px-3">
                    <Pill tone={post.published ? "published" : "draft"}>{post.published ? "Published" : "Draft"}</Pill>
                  </td>
                  <td className="sm:px-5">
                    <div className="flex items-center justify-end gap-1">
                      {post.published ? (
                        <Link href={`/blog/${post.slug}`} target="_blank" className={studioButton.ghost} aria-label={`View ${post.title}`}>
                          <ArrowUpRight className="size-4" aria-hidden />
                        </Link>
                      ) : null}
                      <Link href={`/admin/posts/${post.slug}/edit`} className={studioButton.outline}>
                        Edit
                      </Link>
                      <DeletePostButton slug={post.slug} title={post.title} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
