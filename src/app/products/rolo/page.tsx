import type { Metadata } from "next";

import { Container } from "@/components/brief/container";
import { CtaLink } from "@/components/brief/cta-link";
import { Emphasis } from "@/components/brief/emphasis";
import { PageHero } from "@/components/brief/page-hero";
import { ThemedShot } from "@/components/brief/themed-shot";
import { rolo } from "@/content/rolo";

export const metadata: Metadata = {
  title: "Rolo: turn your followers into a pipeline",
  description: "Merge your social and email exports into one list of real people, see who's warm, and follow up. A lightweight CRM for solo sellers.",
  alternates: { canonical: "/products/rolo" },
};

export default function RoloPage() {
  const [lead, ...rest] = rolo.shots;

  return (
    <>
      <PageHero
        label="Web app"
        title={<Emphasis text={rolo.headline} />}
        intro={
          <>
            <p>{rolo.intro}</p>
            <div className="mt-5">
              <CtaLink href={rolo.appHref} external>Open Rolo</CtaLink>
            </div>
          </>
        }
      />

      <section>
        <Container className="flex flex-col gap-6 pb-9">
          <figure>
            <ThemedShot base={`/products/rolo/${lead.name}`} width={lead.width} height={lead.height} alt={lead.alt} sizes="(min-width: 960px) 880px, 100vw" />
            <figcaption className="annot mt-2">{lead.caption}</figcaption>
          </figure>
          <ul className="grid gap-6 sm:grid-cols-2">
            {rest.map((shot) => (
              <li key={shot.name}>
                <figure>
                  <ThemedShot base={`/products/rolo/${shot.name}`} width={shot.width} height={shot.height} alt={shot.alt} sizes="(min-width: 960px) 440px, (min-width: 640px) 50vw, 100vw" />
                  <figcaption className="annot mt-2">{shot.caption}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
