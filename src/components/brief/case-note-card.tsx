import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import type { CaseNote } from "@/content/work";
import { cn } from "@/lib/utils";

export function CaseNoteCard({ note, className }: { note: CaseNote; className?: string }) {
  return (
    <article className={cn("relative flex flex-col rounded-lg border border-rule p-4 transition-colors hover:border-foreground/25", className)}>
      <p className="annot">{note.client}</p>
      <h3 className="mt-2 text-base font-medium leading-snug tracking-tight">
        {note.href?.startsWith("/") ? (
          <Link href={note.href} className="group inline-flex items-center gap-1 after:absolute after:inset-0 after:rounded-lg hover:text-brand">
            {note.title}
            <ArrowRight className="size-4 shrink-0 text-muted-foreground group-hover:text-brand" aria-hidden />
          </Link>
        ) : note.href ? (
          // The link's ::after covers the card, so the whole card is clickable.
          <a href={note.href} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1 after:absolute after:inset-0 after:rounded-lg hover:text-brand">
            {note.title}
            <ArrowUpRight className="size-4 shrink-0 text-muted-foreground group-hover:text-brand" aria-hidden />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        ) : (
          note.title
        )}
      </h3>
      {note.metric ? (
        <p className="mt-2 text-sm">
          <span className="font-semibold text-brand">{note.metric.figure}</span>{" "}
          <span className="text-muted-foreground">{note.metric.label}</span>
        </p>
      ) : null}
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{note.summary}</p>
      <ul className="mt-auto flex flex-wrap gap-1.5 pt-3">
        {note.tags.map((t) => (
          <li key={t} className="rounded-full bg-paper px-2.5 py-1 text-xs text-muted-foreground">
            {t}
          </li>
        ))}
      </ul>
    </article>
  );
}
