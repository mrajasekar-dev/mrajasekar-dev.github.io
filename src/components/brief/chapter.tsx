import type { ReactNode } from "react";

import { Container } from "@/components/brief/container";
import { cn } from "@/lib/utils";

/** A page section: a quiet label and heading, then content. */
export function Chapter({
  id,
  label,
  title,
  intro,
  children,
  className,
}: {
  id?: string;
  label: string;
  title?: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("scroll-mt-20", className)}>
      <Container>
        <div className="border-t border-rule py-20 sm:py-24">
        <p className="text-sm font-medium text-brand">{label}</p>
        {title ? <h2 className="display mt-3 max-w-3xl text-3xl text-balance sm:text-[2.75rem]">{title}</h2> : null}
        {intro ? <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">{intro}</p> : null}
        {children ? <div className={title || intro ? "mt-12" : "mt-8"}>{children}</div> : null}
        </div>
      </Container>
    </section>
  );
}
