import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";

type Variant = "ink" | "outline" | "signal";

const variants: Record<Variant, string> = {
  ink: "bg-foreground text-background hover:bg-foreground/85",
  signal: "bg-brand text-brand-foreground hover:bg-brand/90",
  outline: "border border-rule text-foreground hover:border-foreground/40 hover:bg-paper",
};

export function CtaLink({
  href,
  children,
  variant = "ink",
  size = "md",
  external,
  className,
  ...rest
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: "md" | "lg";
  external?: boolean;
  className?: string;
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">) {
  const Icon = external ? ArrowUpRight : ArrowRight;
  return (
    <Link
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      {...rest}
      className={cn(
        "group inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
        size === "lg" ? "h-12 px-6 text-[0.9375rem]" : "h-10 px-5 text-sm",
        variants[variant],
        className,
      )}
    >
      {children}
      <Icon aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none" />
    </Link>
  );
}
