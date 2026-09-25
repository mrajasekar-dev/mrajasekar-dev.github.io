import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Container } from "@/components/brief/container";
import { CtaBand } from "@/components/brief/cta-band";
import { formatPostDate } from "@/components/brief/post-list";
import { channelLabels, getAllSlugs, getPostBySlug } from "@/lib/blog";
import { siteConfig } from "@/config/site";

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <article>
        <header>
          <Container className="pt-10 pb-12 sm:pt-16">
            <div className="flex items-center justify-between">
              <Link href="/blog" className="annot inline-flex items-center gap-1.5 hover:text-foreground">
                <ArrowLeft className="size-3.5" aria-hidden /> All writing
              </Link>
              <p className="annot text-brand">{channelLabels[post.channel]}</p>
            </div>
            <div className="mx-auto mt-12 max-w-3xl">
              <h1 className="display text-4xl text-balance sm:text-5xl">{post.title}</h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{post.excerpt}</p>
              <p className="annot mt-8 flex flex-wrap gap-x-4 gap-y-1">
                <span>{siteConfig.name}</span>
                <span>{formatPostDate(post.date, "long")}</span>
                <span>{post.readingTime} min read</span>
              </p>
            </div>
          </Container>
        </header>

        <Container className="max-w-4xl pb-6">
          {/* eslint-disable-next-line @next/next/no-img-element -- local SVG / Blob illustration */}
          <img
            src={post.coverImage}
            alt={post.coverImageAlt}
            width={1200}
            height={675}
            className="w-full rounded-xl border border-rule bg-paper"
          />
        </Container>

        <Container className="max-w-3xl py-12 sm:py-16">
          <div
            className="prose prose-lg prose-neutral max-w-none dark:prose-invert prose-headings:font-medium prose-headings:tracking-tight prose-a:text-brand prose-a:underline-offset-4 prose-strong:text-foreground prose-code:before:content-none prose-code:after:content-none prose-pre:border prose-pre:border-rule prose-pre:bg-paper prose-pre:text-foreground prose-img:rounded-lg prose-img:border prose-img:border-rule"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </Container>
      </article>

      <CtaBand />
    </>
  );
}
