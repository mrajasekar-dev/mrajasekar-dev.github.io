import Link from "next/link";
import { Building2, Code2 } from "lucide-react";

import { Reveal } from "@/components/reveal";
import { channelLabels, type PostMeta } from "@/lib/blog";

const channelIcons = {
  technical: Code2,
  business: Building2,
} as const;

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));
}

export function BlogCard({ post }: { post: PostMeta }) {
  const ChannelIcon = channelIcons[post.channel];

  return (
    <Reveal>
      <Link
        href={`/blog/${post.slug}`}
        className="group flex flex-col gap-5 py-8 first:pt-0 sm:flex-row sm:items-center sm:gap-8"
      >
        <div className="w-full shrink-0 overflow-hidden rounded-lg border border-border sm:w-64">
          {/* eslint-disable-next-line @next/next/no-img-element -- local SVG illustration, next/image optimization doesn't apply */}
          <img
            src={post.coverImage}
            alt={post.coverImageAlt}
            width={800}
            height={450}
            loading="lazy"
            className="aspect-[16/9] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>

        <div className="flex-1">
          <p className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.14em] text-brand">
            <ChannelIcon className="size-3.5" />
            {channelLabels[post.channel]}
          </p>
          <h3 className="mt-2 text-xl font-semibold leading-snug tracking-tight transition-colors group-hover:text-brand">
            {post.title}
          </h3>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
            {post.excerpt}
          </p>
          <p className="mt-3 text-xs text-muted-foreground">
            {formatDate(post.date)} · {post.readingTime} min read
          </p>
        </div>
      </Link>
    </Reveal>
  );
}
