import { cn } from "@/lib/utils";

export function ServiceStage({
  index,
  name,
  body,
  className,
}: {
  index: number;
  name: string;
  body: string;
  className?: string;
}) {
  return (
    <div className={cn("flex gap-5 py-4", className)}>
      <span className="font-mono text-sm text-brand tabular-nums">
        {String(index).padStart(2, "0")}
      </span>
      <div>
        <h3 className="text-base font-semibold">{name}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{body}</p>
      </div>
    </div>
  );
}
