import type { Plan } from "@/content/engagement";

/** A priced offer: name, price, one-line summary and what's included. */
export function PlanCard({ plan }: { plan: Plan }) {
  return (
    <article className="flex flex-col rounded-lg border border-rule p-4">
      <p className="annot">{plan.name}</p>
      <p className="mt-2 flex flex-wrap items-baseline gap-x-2">
        <span className="text-2xl font-medium tracking-tight">{plan.price}</span>
        <span className="text-sm text-muted-foreground">{plan.cadence}</span>
      </p>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{plan.summary}</p>
      <ul className="mt-3 flex flex-col gap-1 text-sm leading-relaxed text-foreground/80">
        {plan.points.map((point) => (
          <li key={point} className="flex gap-3">
            <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-brand" />
            {point}
          </li>
        ))}
      </ul>
    </article>
  );
}
