import type { ReactNode } from "react";

import { Container } from "@/components/brief/container";

export function PageHero({ label, title, intro, aside }: { label: string; title: ReactNode; intro?: ReactNode; aside?: ReactNode }) {
  return (
    <section>
      <Container className="grid gap-12 pt-16 pb-20 sm:pt-24 sm:pb-24 lg:grid-cols-12 lg:items-center">
        <div className={aside ? "lg:col-span-7" : "lg:col-span-9"}>
          <p className="text-sm font-medium text-brand">{label}</p>
          <h1 className="display mt-4 text-5xl text-balance sm:text-6xl">{title}</h1>
          {intro ? <div className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">{intro}</div> : null}
        </div>
        {aside ? <div className="lg:col-span-4 lg:col-start-9">{aside}</div> : null}
      </Container>
    </section>
  );
}
