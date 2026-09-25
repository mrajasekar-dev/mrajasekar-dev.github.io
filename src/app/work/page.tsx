import type { Metadata } from "next";

import { PageHero } from "@/components/brief/page-hero";
import { Container } from "@/components/brief/container";
import { CaseNoteCard } from "@/components/brief/case-note-card";
import { CtaBand } from "@/components/brief/cta-band";
import { caseNotes } from "@/content/work";
import { independentProject } from "@/content/about";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected Salesforce projects: Health Cloud platforms, analytics dashboards, SAP and event-driven integrations.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <PageHero label="Work" title="Selected projects" />
      <section>
        <Container className="grid gap-4 pb-16 md:grid-cols-2 lg:grid-cols-3">
          {caseNotes.map((note) => (
            <CaseNoteCard key={note.slug} note={note} />
          ))}
          <article className="flex flex-col rounded-xl border border-dashed border-rule p-6">
            <p className="annot">Side project</p>
            <h3 className="mt-3 text-lg font-medium tracking-tight">{independentProject.name}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{independentProject.bullets[0]}</p>
          </article>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
