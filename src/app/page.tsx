import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/brief/container";
import { Chapter } from "@/components/brief/chapter";
import { CtaLink } from "@/components/brief/cta-link";
import { Emphasis } from "@/components/brief/emphasis";
import { CaseNoteCard } from "@/components/brief/case-note-card";
import { ProductCard } from "@/components/brief/product-card";
import { CtaBand } from "@/components/brief/cta-band";
import { experience } from "@/content/about";
import { caseNotes } from "@/content/work";
import { products } from "@/content/products";
import { siteConfig } from "@/config/site";
import { getSiteSettings } from "@/lib/site-settings";

export const metadata: Metadata = {
  title: { absolute: `${siteConfig.name} — ${siteConfig.title}` },
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const settings = await getSiteSettings();

  return (
    <>
      <section>
        <Container className="flex flex-col gap-6 pt-7 pb-7 sm:pt-9 sm:pb-9 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          <div className="min-w-0 lg:max-w-[42rem]">
            <p className="text-sm font-medium text-brand">
              {siteConfig.name} · {siteConfig.title}
            </p>
            <h1 className="display mt-2 text-3xl text-balance sm:text-4xl">
              <Emphasis text={settings.hero.tagline} />
            </h1>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed sm:text-base text-muted-foreground">
              Ex-Salesforce, 7x certified, strongest in integrations, Apex and LWC. Here is my work, the things I
              build, and how to reach me.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-5">
              <CtaLink href="/contact">{settings.hero.ctaLabel}</CtaLink>
              <a href={siteConfig.linkedin} target="_blank" rel="noreferrer noopener" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                LinkedIn
              </a>
            </div>
          </div>
          <div className="w-[180px] shrink-0 lg:w-[190px]">
            <Image
              src="/rajasekar-title.jpg"
              alt="Rajasekar M"
              width={1800}
              height={1557}
              priority
              sizes="190px"
              className="aspect-[4/5] h-auto w-full rounded-2xl object-cover"
            />
          </div>
        </Container>
      </section>

      <Chapter label="Experience" title="Experience">
        <ol className="flex flex-col gap-6">
          {experience.map((job) => (
            <li key={job.org} className="grid gap-1.5 sm:grid-cols-[12rem_1fr] sm:gap-8">
              <div>
                <p className="font-medium">{job.org}</p>
                <p className="annot">{job.period}</p>
              </div>
              <div>
                <p className="font-medium">{job.role}</p>
                <p className="text-sm text-muted-foreground">{job.summary}</p>
                <ul className="mt-2 flex flex-col gap-1 text-sm leading-relaxed text-foreground/80">
                  {job.bullets.slice(0, 2).map((b) => (
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

      <Chapter label="Work" title="Projects">
        <div className="grid gap-3 md:grid-cols-3">
          {caseNotes.slice(0, 3).map((note) => (
            <CaseNoteCard key={note.slug} note={note} />
          ))}
        </div>
        <Link href="/work" className="group mt-4 inline-flex items-center gap-1.5 text-sm font-medium hover:text-brand">
          All projects
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </Link>
      </Chapter>

      <Chapter id="products" label="Products" title="Products">
        <div className="grid gap-3 md:grid-cols-2">
          {products.map((product) => (
            <ProductCard key={product.name} product={product} />
          ))}
        </div>
      </Chapter>


      <CtaBand />
    </>
  );
}
