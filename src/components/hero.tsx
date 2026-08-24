import Link from "next/link";

import { Button } from "@/components/ui/button";
import { LinkedinIcon } from "@/components/icons";
import { primaryCta, secondaryCta, siteConfig } from "@/config/site";

export function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-6 pt-10 pb-12 sm:pt-14 sm:pb-16">
      <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
        {siteConfig.name} · {siteConfig.title}
      </p>

      <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.08] tracking-tight text-balance sm:text-6xl">
        {siteConfig.tagline}
      </h1>

      <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
        {siteConfig.description}
      </p>

      <div className="mt-7 flex flex-wrap items-center gap-4">
        <Button asChild size="lg" className="h-11 px-5 text-[0.95rem]">
          <Link href={primaryCta.href}>{primaryCta.label} →</Link>
        </Button>
        <Button asChild variant="outline" size="lg" className="h-11 px-5 text-[0.95rem]">
          <Link href={secondaryCta.href} target="_blank" rel="noreferrer noopener">
            <LinkedinIcon className="size-4" />
            {secondaryCta.label}
          </Link>
        </Button>
      </div>

      <p className="mt-6 max-w-xl text-sm text-muted-foreground">
        Built for growing companies implementing Salesforce for the first time —
        and for teams that already have Salesforce and need senior engineering
        to get it right. Engagements are fully remote.
      </p>
    </section>
  );
}
