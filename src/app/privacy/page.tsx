import type { Metadata } from "next";

import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How contact form information is handled.",
  alternates: { canonical: "/privacy" },
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <Section as="div" spacing="top" border={false} className="max-w-2xl pb-14 sm:pb-16">
      <SectionHeader as="h1" eyebrow="Legal" title="Privacy" />
      <div className="mt-6 flex flex-col gap-4 text-sm leading-relaxed text-muted-foreground">
        <p>
          This site collects only what you submit through the contact form: your
          name, work email, company, role, and the details you choose to share
          about your project. That information is used solely to respond to you.
        </p>
        <p>
          No analytics on this site tie page views to your identity. Aggregate,
          anonymous traffic and performance metrics (page views, referrers, Core
          Web Vitals) are collected via Vercel Analytics and Speed Insights to
          understand how the site is used and to keep it fast.
        </p>
        <p>
          Your contact details are never sold or shared with third parties. If
          you&rsquo;d like anything you&rsquo;ve submitted removed, email{" "}
          <a href={`mailto:${siteConfig.email}`} className="text-brand hover:underline underline-offset-4">
            {siteConfig.email}
          </a>{" "}
          and it will be handled directly.
        </p>
      </div>
    </Section>
  );
}
