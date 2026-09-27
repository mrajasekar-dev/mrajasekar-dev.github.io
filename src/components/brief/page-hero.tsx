import type { ReactNode } from "react";

import { Container } from "@/components/brief/container";

export function PageHero({ label, title, intro, aside }: { label: string; title: ReactNode; intro?: ReactNode; aside?: ReactNode }) {
  return (
    <section>
      <Container className="grid gap-6 pt-7 pb-7 sm:pt-9 sm:pb-9 lg:grid-cols-12 lg:items-center">
        <div className={aside ? "lg:col-span-7" : "lg:col-span-9"}>
          <p className="text-sm font-medium text-brand">{label}</p>
          <h1 className="display mt-2 text-3xl text-balance sm:text-4xl">{title}</h1>
          {intro ? <div className="mt-3 max-w-2xl text-[15px] leading-relaxed sm:text-base text-muted-foreground">{intro}</div> : null}
        </div>
        {aside ? <div className="lg:col-span-4 lg:col-start-9">{aside}</div> : null}
      </Container>
    </section>
  );
}
