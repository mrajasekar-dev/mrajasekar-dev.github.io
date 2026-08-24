import { cn } from "@/lib/utils";

export function SectionHeader({
  eyebrow,
  title,
  body,
  align = "left",
  as: Tag = "h2",
  className,
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-brand mb-3">
          {eyebrow}
        </p>
      ) : null}
      <Tag className="text-3xl sm:text-4xl font-semibold tracking-tight text-balance">
        {title}
      </Tag>
      {body ? (
        <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
          {body}
        </p>
      ) : null}
    </div>
  );
}
