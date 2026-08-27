import type { Metadata } from "next";

import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import { ServiceStage } from "@/components/service-card";
import { Reveal } from "@/components/reveal";
import { CTASection } from "@/components/cta-section";
import { primaryService, secondaryService } from "@/content/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Salesforce Launch — a founder-led greenfield implementation service — plus senior Salesforce engineering partnership for teams that already have an admin or internal team.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <Section spacing="top" border={false}>
        <SectionHeader as="h1" eyebrow="Services" title="What I offer" />
      </Section>

      {/* Primary: Salesforce Launch */}
      <Section>
        <Reveal>
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
            {primaryService.name}
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {primaryService.summary}
          </p>
        </Reveal>
        <div className="mt-8 divide-y divide-border/70 border-t border-border/70">
          {primaryService.stages.map((stage, i) => (
            <ServiceStage key={stage.name} index={i + 1} name={stage.name} body={stage.body} />
          ))}
        </div>
      </Section>

      {/* Secondary: Engineering Partner */}
      <Section>
        <Reveal>
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
            {secondaryService.name}
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {secondaryService.target}
          </p>
          <p className="mt-4 max-w-2xl text-base font-medium">
            &ldquo;{secondaryService.positioning}&rdquo;
          </p>
          <p className="mt-2 text-sm text-muted-foreground">{secondaryService.distinction}</p>

          <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-muted-foreground sm:grid-cols-3">
            {secondaryService.work.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="size-1 rounded-full bg-brand" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      <CTASection
        title="Not sure which of these fits?"
        body="That's fine — most conversations start before that's clear. Tell me what's going on and we'll work out the right shape together."
      />
    </>
  );
}
