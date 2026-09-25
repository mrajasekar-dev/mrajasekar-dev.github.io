import type { CaseNote } from "@/content/work";
import { cn } from "@/lib/utils";

export function CaseNoteCard({ note, className }: { note: CaseNote; className?: string }) {
  return (
    <article className={cn("flex flex-col rounded-xl border border-rule p-6 transition-colors hover:border-foreground/25", className)}>
      <p className="annot">{note.client}</p>
      <h3 className="mt-3 text-lg font-medium leading-snug tracking-tight">{note.title}</h3>
      {note.metric ? (
        <p className="mt-3 text-sm">
          <span className="font-semibold text-brand">{note.metric.figure}</span>{" "}
          <span className="text-muted-foreground">{note.metric.label}</span>
        </p>
      ) : null}
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{note.summary}</p>
      <ul className="mt-auto flex flex-wrap gap-1.5 pt-6">
        {note.tags.map((t) => (
          <li key={t} className="rounded-full bg-paper px-2.5 py-1 text-xs text-muted-foreground">
            {t}
          </li>
        ))}
      </ul>
    </article>
  );
}
