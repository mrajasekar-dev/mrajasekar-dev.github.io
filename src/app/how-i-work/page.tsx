import type { Metadata } from "next";

import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import { Principle } from "@/components/principle";
import { Reveal } from "@/components/reveal";
import { CTASection } from "@/components/cta-section";
import { principles, engineeringNote } from "@/content/methodology";

export const metadata: Metadata = {
  title: "How I Work",
  description:
    "Five principles that shape every Salesforce engagement — from understanding the problem before building, to leaving you stronger than before.",
  alternates: { canonical: "/how-i-work" },
};

export default function HowIWorkPage() {
  return (
    <>
      <Section as="div" spacing="top" border={false} className="max-w-3xl">
        <SectionHeader
          as="h1"
          eyebrow="How I work"
          title="Five principles, not a sales pitch."
          body="These aren't marketing language. They're the operating rules I hold myself to on every engagement."
        />
      </Section>

      <div className="mx-auto max-w-3xl px-6 pb-10 sm:pb-12">
        <div className="mt-2">
          {principles.map((p, i) => (
            <Principle
              key={p.number}
              number={p.number}
              title={p.title}
              body={p.body}
              isLast={i === principles.length - 1}
            />
          ))}
        </div>
      </div>

      <Section spacing="sm" className="max-w-3xl">
        <Reveal>
          <h2 className="text-lg font-semibold">{engineeringNote.heading}</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {engineeringNote.body}
          </p>
        </Reveal>
      </Section>

      <CTASection />
    </>
  );
}
