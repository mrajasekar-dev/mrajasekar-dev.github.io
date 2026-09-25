import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function StudioHeader({ eyebrow, title, actions, children }: { eyebrow?: string; title: ReactNode; actions?: ReactNode; children?: ReactNode }) {
  return (
    <header className="flex flex-col gap-4 border-b border-rule pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow ? <p className="annot">{eyebrow}</p> : null}
        <h1 className="display mt-2 text-4xl sm:text-5xl">{title}</h1>
        {children ? <div className="mt-2 text-sm text-muted-foreground">{children}</div> : null}
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
    </header>
  );
}

export function Panel({ title, action, children, className }: { title?: ReactNode; action?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section className={cn("rounded-lg border border-rule bg-paper", className)}>
      {title ? (
        <div className="flex items-center justify-between gap-3 border-b border-rule px-5 py-3">
          <h2 className="annot">{title}</h2>
          {action}
        </div>
      ) : null}
      {children}
    </section>
  );
}

const pillTone = {
  new: "bg-brand/12 text-brand",
  replied: "bg-foreground/8 text-foreground/80",
  won: "bg-ok/15 text-ok",
  archived: "bg-foreground/5 text-muted-foreground",
  published: "bg-ok/15 text-ok",
  draft: "bg-amber-500/15 text-amber-700 dark:text-amber-400",
  booking: "bg-foreground text-background",
  message: "bg-foreground/8 text-foreground/80",
} as const;

export function Pill({ tone, children }: { tone: keyof typeof pillTone; children: ReactNode }) {
  return (
    <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-wider", pillTone[tone])}>
      {children}
    </span>
  );
}

export const studioButton = {
  ink: "inline-flex h-9 items-center gap-1.5 rounded-md bg-foreground px-3.5 text-sm font-medium text-background transition-colors hover:bg-foreground/85 disabled:opacity-60",
  outline:
    "inline-flex h-9 items-center gap-1.5 rounded-md border border-rule bg-background px-3.5 text-sm font-medium transition-colors hover:border-foreground/40 disabled:opacity-60",
  ghost: "inline-flex h-8 items-center gap-1.5 rounded-md px-2.5 text-sm text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground",
};
