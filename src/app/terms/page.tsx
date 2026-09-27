import type { Metadata } from "next";

import { PageHero } from "@/components/brief/page-hero";
import { Container } from "@/components/brief/container";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms for using this website.",
  alternates: { canonical: "/terms" },
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <>
      <PageHero label="Legal" title="Terms of use" />
      <Container className="max-w-3xl pb-7">
        <div className="flex flex-col gap-5 leading-relaxed text-foreground/85">
          <p>
            This website describes {siteConfig.name}&rsquo;s Salesforce consulting practice and provides a way to get in
            touch. Nothing on it is a binding offer or agreement.
          </p>
          <p>
            The engagement principles described on this site reflect how I work. Each engagement&rsquo;s scope,
            timeline, price and terms are agreed in writing, directly between you and {siteConfig.name}, before any work
            begins.
          </p>
          <p>
            Questions:{" "}
            <a href={`mailto:${siteConfig.email}`} className="text-brand underline underline-offset-4">
              {siteConfig.email}
            </a>
            .
          </p>
        </div>
      </Container>
    </>
  );
}
