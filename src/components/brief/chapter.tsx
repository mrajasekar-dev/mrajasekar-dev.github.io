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
    <section id={id} className={cn("scroll-mt-16", className)}>
      <Container>
        <div className="border-t border-rule py-7 sm:py-9">
        <p className="text-sm font-medium text-brand">{label}</p>
        {title ? <h2 className="display mt-1.5 max-w-3xl text-xl text-balance sm:text-2xl">{title}</h2> : null}
        {intro ? <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">{intro}</p> : null}
        {children ? <div className={title || intro ? "mt-5" : "mt-4"}>{children}</div> : null}
        </div>
      </Container>
    </section>
  );
}
