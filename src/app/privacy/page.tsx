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
          This site is fully static — there is no server behind it, and nothing
          you type is transmitted anywhere or stored by the site itself. The
          contact form pre-fills an email to {siteConfig.email} using your own
          email client; it only sends if you review and hit send from there.
        </p>
        <p>
          This site runs no analytics or tracking scripts of any kind — no page
          views, no cookies, no visitor identifiers are collected.
        </p>
        <p>
          Any message you do send by email is handled the same way as any other
          email you&rsquo;d send {siteConfig.name} directly — it&rsquo;s never sold or
          shared with third parties. Questions can go to{" "}
          <a href={`mailto:${siteConfig.email}`} className="text-brand hover:underline underline-offset-4">
            {siteConfig.email}
          </a>
          .
        </p>
      </div>
    </Section>
  );
}
