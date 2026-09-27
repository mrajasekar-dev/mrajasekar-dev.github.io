import { cn } from "@/lib/utils";

/** Short titled statements in two columns, used for terms, services and safeguards. */
export function TermGrid({ items, className }: { items: readonly { title: string; body: string }[]; className?: string }) {
  return (
    <dl className={cn("grid gap-x-8 gap-y-4 sm:grid-cols-2", className)}>
      {items.map((item) => (
        <div key={item.title}>
          <dt className="font-medium">{item.title}</dt>
          <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.body}</dd>
        </div>
      ))}
    </dl>
  );
}
