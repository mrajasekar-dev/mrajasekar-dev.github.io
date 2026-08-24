import type { Metadata } from "next";

import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import { ContactForm } from "@/components/contact-form";
import { Scheduler } from "@/components/scheduler";
import { LinkedinIcon } from "@/components/icons";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Start a conversation with ${siteConfig.name} about a Salesforce implementation, an existing org, or engineering support.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <Section as="div" spacing="top" border={false} className="max-w-3xl pb-14 sm:pb-16">
      <SectionHeader
        as="h1"
        eyebrow="Contact"
        title="Have a Salesforce problem worth talking through?"
        body="If you're implementing Salesforce, struggling with an existing org, or simply trying to work out what the right solution looks like, let's talk. You don't need to have the requirements figured out before reaching out."
      />

      <div className="mt-6 flex flex-col gap-3 text-sm text-muted-foreground sm:flex-row sm:items-center sm:gap-6">
        <a href={`mailto:${siteConfig.email}`} className="text-brand hover:underline underline-offset-4">
          {siteConfig.email}
        </a>
        <a
          href={siteConfig.linkedin}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-1.5 text-brand hover:underline underline-offset-4"
        >
          <LinkedinIcon className="size-4" />
          Connect on LinkedIn
        </a>
      </div>

      <div className="mt-8 border-t border-border/70 pt-8">
        <h2 className="text-lg font-semibold">Book a call directly</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Pick a time that works for you — you&rsquo;ll get a calendar invite with a Google
          Meet link right away.
        </p>
        <div className="mt-5">
          <Scheduler />
        </div>
      </div>

      <div className="mt-10 border-t border-border/70 pt-8">
        <h2 className="text-lg font-semibold">Or send a message instead</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Prefer to write out the details first? This works too.
        </p>
        <div className="mt-5">
          <ContactForm />
        </div>
      </div>
    </Section>
  );
}
