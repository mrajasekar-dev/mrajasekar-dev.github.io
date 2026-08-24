import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Section } from "@/components/section";
import { primaryCta } from "@/config/site";

export function CTASection({
  title = "Have a Salesforce problem worth talking through?",
  body = "If you're implementing Salesforce, struggling with an existing org, or simply trying to work out what the right solution looks like, let's talk. You don't need to have the requirements figured out before reaching out.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <Section spacing="lg" className="max-w-3xl text-center">
      <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">{title}</h2>
      <p className="mt-3 text-base leading-relaxed text-muted-foreground sm:text-lg">{body}</p>
      <div className="mt-6 flex justify-center">
        <Button asChild size="lg" className="h-11 px-6 text-[0.95rem]">
          <Link href={primaryCta.href}>{primaryCta.label} →</Link>
        </Button>
      </div>
    </Section>
  );
}
