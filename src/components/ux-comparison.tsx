import { cn } from "@/lib/utils";

function Panel({
  label,
  variant,
}: {
  label: string;
  variant: "cluttered" | "clean";
}) {
  const cluttered = variant === "cluttered";

  return (
    <div
      className={cn(
        "rounded-lg border p-4 sm:p-5",
        cluttered ? "border-border bg-muted/60" : "border-border bg-card",
      )}
    >
      <div className="mb-4 flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground">{label}</span>
        <span
          className={cn(
            "size-1.5 rounded-full",
            cluttered ? "bg-destructive/60" : "bg-brand",
          )}
        />
      </div>

      {/* abstract illustrative representation only — not a real Salesforce screenshot */}
      <div className={cn("grid gap-2", cluttered ? "grid-cols-3" : "grid-cols-1")}>
        {cluttered ? (
          <>
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="h-6 rounded-sm bg-foreground/10"
                style={{ opacity: 0.35 + (i % 3) * 0.15 }}
              />
            ))}
            <div className="col-span-3 mt-1 h-3 w-2/3 rounded-sm bg-foreground/10" />
            <div className="col-span-3 h-3 w-1/2 rounded-sm bg-foreground/10" />
            <div className="col-span-3 mt-2 h-8 rounded-sm bg-foreground/15" />
          </>
        ) : (
          <>
            <div className="h-3 w-1/3 rounded-sm bg-foreground/15" />
            <div className="mt-2 h-10 rounded-md bg-brand/10" />
            <div className="mt-3 h-3 w-1/2 rounded-sm bg-foreground/10" />
            <div className="mt-4 h-9 w-28 rounded-md bg-brand" />
          </>
        )}
      </div>
    </div>
  );
}

export function UxComparison() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Panel label="Ten clicks to get anything done" variant="cluttered" />
      <Panel label="One clear path to the outcome" variant="clean" />
    </div>
  );
}
