import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";

import { Hero } from "@/components/hero";
import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import { Reveal } from "@/components/reveal";
import { CTASection } from "@/components/cta-section";
import { UxComparison } from "@/components/ux-comparison";
import { problems, whatIDo, uxPhilosophyTeaser } from "@/content/home";
import { principles } from "@/content/methodology";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `${siteConfig.name} — ${siteConfig.title}`,
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* The problems I see */}
      <Section>
        <SectionHeader
          eyebrow="What I've observed"
          title="Salesforce projects don't usually fail because Salesforce is difficult."
          body="They fail because the problem was never properly understood."
        />
        <div className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {problems.map((problem) => (
            <Reveal key={problem.title}>
              <h3 className="text-base font-semibold leading-snug">{problem.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {problem.body}
              </p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* What I do */}
      <Section>
        <SectionHeader eyebrow="What I do" title="Salesforce Launch, end to end." />
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {whatIDo.map((item) => (
            <Reveal key={item.title}>
              <h3 className="text-base font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
            </Reveal>
          ))}
        </div>
        <div className="mt-8">
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:underline underline-offset-4"
          >
            See the full service breakdown <ArrowRight className="size-4" />
          </Link>
        </div>
      </Section>

      {/* UX philosophy teaser */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <SectionHeader title={uxPhilosophyTeaser.heading} body={uxPhilosophyTeaser.body} />
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              Minimal data entry, clear layouts, and workflows that match how your team
              actually works — not how the data model happens to be structured.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <UxComparison />
          </Reveal>
        </div>
      </Section>

      {/* How I Work teaser */}
      <Section>
        <SectionHeader eyebrow="How I work" title="Five principles that shape every engagement." />
        <div className="mt-8 grid gap-x-10 gap-y-2 sm:grid-cols-2">
          {principles.slice(0, 3).map((p) => (
            <Reveal key={p.number} className="flex items-baseline gap-3 py-1.5">
              <span className="font-mono text-xs text-brand">{p.number}</span>
              <span className="text-sm font-medium">{p.title}</span>
            </Reveal>
          ))}
        </div>
        <div className="mt-6">
          <Link
            href="/how-i-work"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:underline underline-offset-4"
          >
            Read all five principles <ArrowRight className="size-4" />
          </Link>
        </div>
      </Section>

      <CTASection />
    </>
  );
}
