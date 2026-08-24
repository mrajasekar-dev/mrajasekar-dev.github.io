import { Reveal } from "@/components/reveal";

export function Principle({
  number,
  title,
  body,
  isLast = false,
}: {
  number: string;
  title: string;
  body: string;
  isLast?: boolean;
}) {
  return (
    <Reveal>
      <div className="relative flex gap-6 pb-8 sm:gap-8">
        {!isLast ? (
          <span
            aria-hidden
            className="absolute top-11 left-[19px] h-[calc(100%-1rem)] w-px bg-border sm:left-[23px]"
          />
        ) : null}
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-card font-mono text-sm text-brand sm:size-12">
          {number}
        </span>
        <div className="pt-1.5">
          <h2 className="text-lg font-semibold sm:text-xl">{title}</h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {body}
          </p>
        </div>
      </div>
    </Reveal>
  );
}
