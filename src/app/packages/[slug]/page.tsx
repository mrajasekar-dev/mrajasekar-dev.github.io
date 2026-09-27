import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

import { Chapter } from "@/components/brief/chapter";
import { CtaBand } from "@/components/brief/cta-band";
import { CtaLink } from "@/components/brief/cta-link";
import { Emphasis } from "@/components/brief/emphasis";
import { PageHero } from "@/components/brief/page-hero";
import { TermGrid } from "@/components/brief/term-grid";
import { getPackage, packages } from "@/content/packages";

export function generateStaticParams() {
  return packages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const pkg = getPackage((await params).slug);
  if (!pkg) return {};
  return {
    title: pkg.name,
    description: `${pkg.intro} From ${pkg.price}.`,
    alternates: { canonical: `/packages/${pkg.slug}` },
  };
}

function Bullets({ items }: { items: string[] }) {
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

export default async function PackagePage({ params }: { params: Promise<{ slug: string }> }) {
  const pkg = getPackage((await params).slug);
  if (!pkg) notFound();
  const quoteHref = `/contact?topic=${pkg.slug}`;

  return (
    <>
      <PageHero
        label="Fixed-price package"
        title={<Emphasis text={pkg.headline} />}
        intro={
          <>
            <p>{pkg.intro}</p>
            <p className="mt-4 flex flex-wrap items-baseline gap-x-2">
              <span className="text-2xl font-medium tracking-tight text-foreground">From {pkg.price}</span>
              <span className="text-sm">{pkg.timeline}</span>
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-5">
              <CtaLink href={quoteHref}>Get a fixed quote</CtaLink>
              <Link href="#included" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                What&rsquo;s included
              </Link>
            </div>
          </>
        }
      />

      <Chapter label="What you get" title="The outcome">
        <Bullets items={pkg.outcomes} />
      </Chapter>

      <Chapter id="included" label={`Included in ${pkg.price}`} title="The standard scope" intro={pkg.priceNote}>
        <TermGrid items={pkg.included} />
      </Chapter>

      <Chapter label="Add-ons" title="Priced before you commit">
        <ul className="border-t border-rule">
          {pkg.addons.map((addon) => (
            <li key={addon.name} className="grid gap-1 border-b border-rule py-3 sm:grid-cols-[14rem_1fr_7rem] sm:gap-6">
              <p className="font-medium">{addon.name}</p>
              <p className="text-sm leading-relaxed text-muted-foreground">{addon.body}</p>
              <p className="text-sm font-medium sm:text-right">{addon.price}</p>
            </li>
          ))}
        </ul>
      </Chapter>

      <Chapter label="Fine print" title="What you need, and what's not included">
        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <p className="mb-3 font-medium">You&rsquo;ll need</p>
            <Bullets items={pkg.prerequisites} />
          </div>
          <div>
            <p className="mb-3 font-medium">Not included</p>
            <Bullets items={pkg.excluded} />
          </div>
        </div>
      </Chapter>

      <Chapter label="Questions" title="What people ask first">
        <dl className="flex max-w-3xl flex-col gap-5">
          {pkg.faqs.map((faq) => (
            <div key={faq.q}>
              <dt className="font-medium">{faq.q}</dt>
              <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">{faq.a}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-6">
          <CtaLink href={quoteHref}>Get a fixed quote</CtaLink>
        </div>
      </Chapter>

      <CtaBand lead="Want this in your org?" />
    </>
  );
}
