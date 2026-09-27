import Link from "next/link";

import { Container } from "@/components/brief/container";
import { siteConfig } from "@/config/site";

/** A quiet contact line at the end of a page. */
export function CtaBand() {
  return (
    <section>
      <Container>
        <div className="border-t border-rule py-7 sm:py-9">
          <p className="text-sm font-medium text-brand">Contact</p>
          <p className="mt-3 max-w-2xl text-2xl leading-snug tracking-tight sm:text-3xl">
            You can reach me at{" "}
            <a href={`mailto:${siteConfig.email}`} className="underline decoration-rule underline-offset-[6px] hover:text-brand hover:decoration-brand">
              {siteConfig.email}
            </a>
            , on{" "}
            <a href={siteConfig.linkedin} target="_blank" rel="noreferrer noopener" className="underline decoration-rule underline-offset-[6px] hover:text-brand hover:decoration-brand">
              LinkedIn
            </a>
            , or by{" "}
            <Link href="/contact" className="underline decoration-rule underline-offset-[6px] hover:text-brand hover:decoration-brand">
              booking a call
            </Link>
            .
          </p>
        </div>
      </Container>
    </section>
  );
}
