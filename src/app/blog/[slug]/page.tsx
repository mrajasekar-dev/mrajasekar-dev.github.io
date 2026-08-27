import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Section } from "@/components/section";
import { CTASection } from "@/components/cta-section";
import { channelLabels, getAllSlugs, getPostBySlug } from "@/lib/blog";
import { siteConfig } from "@/config/site";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug).catch(() => null);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
    },
  };
}

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug).catch(() => null);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: `${siteConfig.url}${post.coverImage}`,
    datePublished: post.date,
    author: { "@type": "Person", name: siteConfig.name, url: siteConfig.url },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Section as="div" spacing="top" border={false} className="max-w-3xl">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-4" /> Back to blog
        </Link>

        <p className="mt-6 font-mono text-xs uppercase tracking-[0.14em] text-brand">
          {channelLabels[post.channel]}
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          {post.title}
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">
          {formatDate(post.date)} · {post.readingTime} min read
        </p>
      </Section>

      <Section spacing="sm" border={false} className="max-w-3xl">
        {/* eslint-disable-next-line @next/next/no-img-element -- local SVG illustration */}
        <img
          src={post.coverImage}
          alt={post.coverImageAlt}
          width={1200}
          height={675}
          className="w-full rounded-xl border border-border"
        />
      </Section>

      <Section spacing="sm" className="max-w-3xl" border={false}>
        <div
          className="prose prose-neutral max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-brand prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-img:border prose-img:border-border prose-strong:text-foreground prose-code:before:content-none prose-code:after:content-none dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </Section>

      <CTASection />
    </>
  );
}
