import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { Chapter } from "@/components/brief/chapter";
import { CtaBand } from "@/components/brief/cta-band";
import { CtaLink } from "@/components/brief/cta-link";
import { Emphasis } from "@/components/brief/emphasis";
import { PageHero } from "@/components/brief/page-hero";
import { PlanCard } from "@/components/brief/plan-card";
import { TermGrid } from "@/components/brief/term-grid";
import { siteConfig } from "@/config/site";
import { checkAreas, companyFaqs, companyPlans, safeguards, signs, steps } from "@/content/companies";
import { packages } from "@/content/packages";

export const metadata: Metadata = {
  title: "For companies",
  description:
    "A fixed-price Salesforce Fix Sprint, integration packages and a fractional Salesforce admin and developer for US companies under 50 licences, from an ex-Salesforce, 7x certified engineer.",
  alternates: { canonical: "/for-companies" },
};

export default function ForCompaniesPage() {
  return (
    <>
      <PageHero
        label="For companies"
        title={<Emphasis text="Your Salesforce, *fixed and looked after.*" />}
        intro={
          <>
            <p>
              For companies with up to about 50 Salesforce licences and no full-time admin or developer. Start with a
              two-week, fixed-price Fix Sprint. Keep me on monthly only if it&rsquo;s useful.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-5">
              <CtaLink href="/contact?topic=fix-sprint">Book a free 20-minute call</CtaLink>
              <Link href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                See pricing
              </Link>
            </div>
          </>
        }
      />

      <Chapter label="Sound familiar?" title="Where most companies are when they call">
        <ul className="grid gap-x-8 gap-y-2 text-sm leading-relaxed text-foreground/80 sm:grid-cols-2">
          {signs.map((sign) => (
            <li key={sign} className="flex gap-3">
              <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-brand" />
              {sign}
            </li>
          ))}
        </ul>
      </Chapter>

      <Chapter id="pricing" label="Pricing" title="Two ways to work together" intro="Fixed prices, in USD. No retainers you can't leave.">
        <div className="grid gap-3 md:grid-cols-2">
          {companyPlans.map((plan) => (
            <PlanCard key={plan.name} plan={plan} />
          ))}
        </div>
      </Chapter>

      <Chapter label="Packages" title="Know exactly what you need?" intro="Fixed-scope projects with a starting price and a written quote before you commit.">
        <ul className="grid gap-3 md:grid-cols-2">
          {packages.map((pkg) => (
            <li key={pkg.slug}>
              <Link
                href={`/packages/${pkg.slug}`}
                className="group flex h-full flex-col rounded-lg border border-rule p-4 transition-colors hover:border-foreground/40"
              >
                <p className="annot">From {pkg.price} · {pkg.timeline}</p>
                <p className="mt-2 font-medium group-hover:text-brand">{pkg.name}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{pkg.outcomes[0]}.</p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium">
                  See the package
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Chapter>

      <Chapter label="The Fix Sprint" title="Where I look first">
        <TermGrid items={checkAreas} />
      </Chapter>

      <Chapter label="How it starts" title="From first call to a working org in about two weeks">
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <li key={step.title} className="rounded-lg border border-rule p-4">
              <p className="annot">Step {i + 1}</p>
              <p className="mt-2 font-medium">{step.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
            </li>
          ))}
        </ol>
      </Chapter>

      <Chapter label="Safe to say yes" title="Hiring someone remote, without the risk">
        <TermGrid items={safeguards} />
      </Chapter>

      <Chapter label="Who you'd work with" title="Ex-Salesforce, 7x certified">
        <div className="flex max-w-2xl flex-col gap-4 text-[15px] leading-relaxed text-muted-foreground">
          <p>
            I spent four and a half years in Salesforce&rsquo;s own Professional Services team, delivering for
            automotive, healthcare and non-profit customers. Today I design and build Salesforce solutions for US clients.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium">
            <Link href="/work" className="group inline-flex items-center gap-1.5 text-foreground hover:text-brand">
              Case studies
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
            <a
              href={siteConfig.trailheadVerify}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 text-foreground hover:text-brand"
            >
              Verify certifications on Trailhead
              <ArrowUpRight className="size-4" aria-hidden />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        </div>
      </Chapter>

      <Chapter label="Questions" title="What people ask first">
        <dl className="flex max-w-3xl flex-col gap-5">
          {companyFaqs.map((faq) => (
            <div key={faq.q}>
              <dt className="font-medium">{faq.q}</dt>
              <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">{faq.a}</dd>
            </div>
          ))}
        </dl>
      </Chapter>

      <CtaBand lead="Salesforce giving you trouble?" />
    </>
  );
}
