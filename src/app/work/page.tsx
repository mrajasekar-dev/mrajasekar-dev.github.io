import type { Metadata } from "next";

import { PageHero } from "@/components/brief/page-hero";
import { Container } from "@/components/brief/container";
import { CaseNoteCard } from "@/components/brief/case-note-card";
import { CtaBand } from "@/components/brief/cta-band";
import { caseNotes } from "@/content/work";

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
        <Container className="grid gap-3 pb-7 md:grid-cols-2 lg:grid-cols-3">
          {caseNotes.map((note) => (
            <CaseNoteCard key={note.slug} note={note} />
          ))}
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
