import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";

import { Chapter } from "@/components/brief/chapter";
import { Container } from "@/components/brief/container";
import { Emphasis } from "@/components/brief/emphasis";
import { PageHero } from "@/components/brief/page-hero";
import { focusquest } from "@/content/focusquest";

export const metadata: Metadata = {
  title: "Salesforce Daily Quiz: a daily Salesforce interview quiz for Chrome",
  description:
    "A free Chrome extension with a daily five-question Salesforce challenge, 200 practice questions for interview prep, and an optional focus timer. Everything stays in your browser.",
  alternates: { canonical: "/products/salesforce-daily-quiz" },
};

const downloadClassName =
  "group inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-full bg-foreground px-5 text-sm font-medium text-background transition-colors hover:bg-foreground/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

export default function SalesforceDailyQuizPage() {
  return (
    <>
      <PageHero
        label="Chrome extension"
        title={<Emphasis text={focusquest.headline} />}
        intro={
          <>
            <p>{focusquest.intro}</p>
            <div className="mt-5 flex flex-wrap items-center gap-5">
              {/* A plain anchor: it's a file download, not a route. */}
              <a href={focusquest.downloadHref} download className={downloadClassName}>
                Download
                <ArrowDown aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-y-0.5 motion-reduce:transition-none" />
              </a>
              <p className="annot">{focusquest.status}</p>
            </div>
          </>
        }
      />

      <section>
        <Container as="ul" className="grid gap-4 pb-7 sm:grid-cols-2">
          {focusquest.screenshots.map((shot) => (
            <li key={shot.src}>
              <figure>
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  width={1280}
                  height={800}
                  sizes="(min-width: 960px) 440px, (min-width: 640px) 50vw, 100vw"
                  className="aspect-[16/10] h-auto w-full rounded-lg border border-rule bg-paper object-cover"
                />
                <figcaption className="annot mt-2">{shot.caption}</figcaption>
              </figure>
            </li>
          ))}
        </Container>
      </section>

      <Chapter id="install" label="Install" title="Three steps">
        <ol className="flex flex-col gap-1.5 text-sm leading-relaxed text-foreground/80">
          {focusquest.install.map((step, i) => (
            <li key={step} className="flex gap-3">
              <span aria-hidden className="w-4 shrink-0 font-medium text-brand">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
        <p className="mt-6 text-sm text-muted-foreground">
          No account, no tracking, nothing leaves your browser.{" "}
          <Link href={focusquest.privacyHref} className="group inline-flex items-center gap-1 font-medium text-foreground hover:text-brand">
            Privacy policy
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </Link>
        </p>
      </Chapter>
    </>
  );
}
