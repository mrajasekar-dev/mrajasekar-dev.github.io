import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";

import { Chapter } from "@/components/brief/chapter";
import { CtaBand } from "@/components/brief/cta-band";
import { Emphasis } from "@/components/brief/emphasis";
import { PageHero } from "@/components/brief/page-hero";
import { TermGrid } from "@/components/brief/term-grid";
import { focusquest } from "@/content/focusquest";

export const metadata: Metadata = {
  title: "FocusQuest: Earn your scroll",
  description:
    "FocusQuest pauses YouTube and social media when your time is up and unlocks more time when you pass a quiz. 200 Salesforce developer interview questions built in, or import your own. Everything stays in your browser.",
  alternates: { canonical: "/products/focusquest" },
};

function Bullets({ items }: { items: readonly string[] }) {
  return (
    <ul className="flex flex-col gap-1.5 text-sm leading-relaxed text-foreground/80">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-brand" />
          {item}
        </li>
      ))}
    </ul>
  );
}

const downloadClassName =
  "group inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-full bg-foreground px-5 text-sm font-medium text-background transition-colors hover:bg-foreground/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

export default function FocusQuestPage() {
  return (
    <>
      <PageHero
        label="Chrome extension"
        title={<Emphasis text={focusquest.headline} />}
        intro={
          <>
            <p>{focusquest.intro}</p>
            <p className="annot mt-4">{focusquest.status}</p>
            <div className="mt-5 flex flex-wrap items-center gap-5">
              {/* A plain anchor: it's a file download, not a route. */}
              <a href={focusquest.downloadHref} download className={downloadClassName}>
                Download the zip
                <ArrowDown aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-y-0.5 motion-reduce:transition-none" />
              </a>
              <Link href="#install" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                How to install
              </Link>
            </div>
          </>
        }
      />

      <Chapter label="What it does" title="A time limit you pay back in answers">
        <div className="grid gap-8 sm:grid-cols-[1fr_16rem]">
          <Bullets items={focusquest.what} />
          <div>
            <p className="mb-3 font-medium">Sites it tracks</p>
            <ul className="flex flex-wrap gap-1.5">
              {focusquest.sites.map((site) => (
                <li key={site} className="rounded-full bg-paper px-2.5 py-1 text-xs text-muted-foreground">
                  {site}
                </li>
              ))}
            </ul>
            <p className="annot mt-3">Plus any site you add.</p>
          </div>
        </div>
      </Chapter>

      <Chapter label="How it works" title="Four steps, one timer">
        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {focusquest.steps.map((step, i) => (
            <li key={step.title}>
              <p className="annot">Step {i + 1}</p>
              <p className="mt-1 font-medium">{step.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
            </li>
          ))}
        </ol>
      </Chapter>

      <Chapter label="Screenshots" title="What you’ll see">
        <ul className="grid gap-4 sm:grid-cols-2">
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
        </ul>
      </Chapter>

      <Chapter label="Features" title="Built to make studying feel like a game">
        <TermGrid items={focusquest.features} />
      </Chapter>

      <Chapter label="Settings" title="Almost everything is adjustable">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {focusquest.customization.map((group) => (
            <div key={group.label}>
              <p className="font-medium">{group.label}</p>
              <ul className="mt-3 flex flex-col gap-1.5 text-sm text-muted-foreground">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Chapter>

      <Chapter id="install" label="Install" title="Get it running in Chrome">
        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <p className="mb-3 font-medium">Chrome Web Store</p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Coming soon. Once it&rsquo;s listed, installing and updating will be one click.
            </p>
          </div>
          <div>
            <p className="mb-3 font-medium">Unpacked, from the zip</p>
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
            <div className="mt-5">
              <a href={focusquest.downloadHref} download className={downloadClassName}>
                Download focusquest.zip
                <ArrowDown aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-y-0.5 motion-reduce:transition-none" />
              </a>
            </div>
          </div>
        </div>
      </Chapter>

      <Chapter label="Privacy" title="Nothing leaves your browser">
        <Bullets items={focusquest.privacy} />
        <Link
          href={focusquest.privacyHref}
          className="group mt-4 inline-flex items-center gap-1.5 text-sm font-medium hover:text-brand"
        >
          Read the privacy policy
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </Link>
        <p className="annot mt-6">Built with {focusquest.builtWith.join(" · ")}</p>
      </Chapter>

      <CtaBand lead="Questions or feedback on FocusQuest?" />
    </>
  );
}
