import Link from "next/link";

import { channelLabels, type PostMeta } from "@/lib/blog";

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));
}

export function BlogCard({ post }: { post: PostMeta }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <div className="overflow-hidden rounded-lg border border-border bg-card">
        {/* eslint-disable-next-line @next/next/no-img-element -- local SVG illustration, next/image optimization doesn't apply */}
        <img
          src={post.coverImage}
          alt={post.coverImageAlt}
          width={800}
          height={450}
          loading="lazy"
          className="aspect-[16/9] w-full object-cover"
        />
      </div>
      <p className="mt-4 font-mono text-xs uppercase tracking-[0.14em] text-brand">
        {channelLabels[post.channel]}
      </p>
      <h3 className="mt-2 text-lg font-semibold leading-snug transition-colors group-hover:text-brand">
        {post.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
      <p className="mt-3 text-xs text-muted-foreground">
        {formatDate(post.date)} · {post.readingTime} min read
      </p>
    </Link>
  );
}
