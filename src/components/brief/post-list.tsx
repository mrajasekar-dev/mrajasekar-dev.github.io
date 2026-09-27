import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { channelLabels, type PostMeta } from "@/lib/blog";

export function formatPostDate(iso: string, month: "short" | "long" = "short") {
  return new Intl.DateTimeFormat("en-US", { month, day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(iso));
}

export function PostList({ posts }: { posts: PostMeta[] }) {
  return (
    <ul className="divide-y divide-rule border-y border-rule">
      {posts.map((post) => (
        <li key={post.slug}>
          <Link href={`/blog/${post.slug}`} className="group flex items-start justify-between gap-6 py-3">
            <div>
              <p className="annot">
                {formatPostDate(post.date)} · {channelLabels[post.channel]} · {post.readingTime} min read
              </p>
              <h3 className="mt-2 text-base font-medium tracking-tight text-balance transition-colors group-hover:text-brand sm:text-lg">
                {post.title}
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
            </div>
            <ArrowUpRight
              aria-hidden
              className="mt-1 size-5 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand"
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}
