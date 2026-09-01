import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { PostForm } from "@/components/admin/post-form";

export const metadata: Metadata = {
  title: "New post",
  robots: { index: false, follow: false },
};

export default function AdminNewPostPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <Link
        href="/admin/posts"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" /> Back to posts
      </Link>

      <h1 className="mt-6 text-2xl font-semibold tracking-tight">New post</h1>

      <PostForm />
    </div>
  );
}
