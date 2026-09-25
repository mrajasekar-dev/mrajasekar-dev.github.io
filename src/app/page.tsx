import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/brief/container";
import { Chapter } from "@/components/brief/chapter";
import { CtaLink } from "@/components/brief/cta-link";
import { Emphasis } from "@/components/brief/emphasis";
import { CaseNoteCard } from "@/components/brief/case-note-card";
import { CtaBand } from "@/components/brief/cta-band";
import { PostList } from "@/components/brief/post-list";
import { experience } from "@/content/about";
import { caseNotes } from "@/content/work";
import { siteConfig } from "@/config/site";
import { getSiteSettings } from "@/lib/site-settings";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: { absolute: `${siteConfig.name} — ${siteConfig.title}` },
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const [settings, posts] = await Promise.all([getSiteSettings(), getAllPosts().catch(() => [])]);

  return (
    <>
      <section>
        <Container className="grid gap-14 pt-16 pb-20 sm:pt-24 sm:pb-24 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <p className="text-sm font-medium text-brand">
              {siteConfig.name} · {siteConfig.title}
            </p>
            <h1 className="display mt-5 text-5xl text-balance sm:text-6xl">
              <Emphasis text={settings.hero.tagline} />
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground">
              I&rsquo;m a Senior Salesforce Developer at GoKarya, working with US clients. Before that I was a developer at
              Salesforce. Most of my work is solution design, Apex, LWC and integrations.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-6">
              <CtaLink href="/contact">{settings.hero.ctaLabel}</CtaLink>
              <Link href="/work" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                View work
              </Link>
            </div>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <Image
              src="/rajasekar-title.jpg"
              alt="Rajasekar M"
              width={1800}
              height={1557}
              priority
              sizes="(min-width: 1024px) 360px, 100vw"
              className="aspect-[4/5] h-auto w-full rounded-2xl object-cover"
            />
          </div>
        </Container>
      </section>

      <Chapter label="Experience" title="Where I’ve worked">
        <ol className="flex flex-col gap-12">
          {experience.map((job) => (
            <li key={job.org} className="grid gap-3 sm:grid-cols-[14rem_1fr] sm:gap-10">
              <div>
                <p className="text-lg font-medium">{job.org}</p>
                <p className="annot">{job.period}</p>
              </div>
              <div>
                <p className="font-medium">{job.role}</p>
                <p className="text-sm text-muted-foreground">{job.summary}</p>
                <ul className="mt-4 flex flex-col gap-2 text-sm leading-relaxed text-foreground/80">
                  {job.bullets.map((b) => (
                    <li key={b} className="flex gap-3">
                      <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-brand" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </Chapter>

      <Chapter label="Work" title="Recent projects">
        <div className="grid gap-4 md:grid-cols-3">
          {caseNotes.slice(0, 3).map((note) => (
            <CaseNoteCard key={note.slug} note={note} />
          ))}
        </div>
        <Link href="/work" className="group mt-8 inline-flex items-center gap-1.5 text-sm font-medium hover:text-brand">
          All projects
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </Link>
      </Chapter>

      {posts.length ? (
        <Chapter label="Writing" title="Recent posts">
          <PostList posts={posts.slice(0, 3)} />
        </Chapter>
      ) : null}

      <CtaBand />
    </>
  );
}
