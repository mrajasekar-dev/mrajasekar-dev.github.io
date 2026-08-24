import type { Metadata } from "next";

import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms for using this website.",
  alternates: { canonical: "/terms" },
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <Section as="div" spacing="top" border={false} className="max-w-2xl pb-14 sm:pb-16">
      <SectionHeader as="h1" eyebrow="Legal" title="Terms" />
      <div className="mt-6 flex flex-col gap-4 text-sm leading-relaxed text-muted-foreground">
        <p>
          This website is informational. It describes {siteConfig.name}&rsquo;s Salesforce
          consulting practice and provides a way to get in touch — it isn&rsquo;t a
          transactional platform, and nothing on it constitutes a binding offer or
          agreement.
        </p>
        <p>
          Any engagement — scope, timeline, and terms — is agreed separately and
          directly between you and {siteConfig.name} before any work begins.
        </p>
        <p>
          Questions about these terms can be sent to{" "}
          <a href={`mailto:${siteConfig.email}`} className="text-brand hover:underline underline-offset-4">
            {siteConfig.email}
          </a>
          .
        </p>
      </div>
    </Section>
  );
}
