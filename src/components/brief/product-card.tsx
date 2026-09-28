import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import type { Product } from "@/content/products";
import { cn } from "@/lib/utils";

/** A product I've built; the whole card links to the live app, or to its page on this site. */
export function ProductCard({ product, className }: { product: Product; className?: string }) {
  const internal = product.href.startsWith("/");
  const label = product.linkLabel ?? (internal ? "Details" : new URL(product.href).host);
  const Icon = internal ? ArrowRight : ArrowUpRight;
  const cardClassName = cn("group flex flex-col rounded-lg border border-rule p-4 transition-colors hover:border-foreground/25", className);

  const body = (
    <>
      <p className="annot">{product.tagline}</p>
      <h3 className="mt-2 flex items-center gap-1.5 text-base font-medium leading-snug tracking-tight">
        {product.name}
        <Icon
          className={cn(
            "size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-brand",
            !internal && "group-hover:-translate-y-0.5",
          )}
          aria-hidden
        />
        {internal ? null : <span className="sr-only">(opens in a new tab)</span>}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{product.summary}</p>
      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-3">
        <ul className="flex flex-wrap gap-1.5">
          {product.tags.map((t) => (
            <li key={t} className="rounded-full bg-paper px-2.5 py-1 text-xs text-muted-foreground">
              {t}
            </li>
          ))}
        </ul>
        <span className="text-sm font-medium group-hover:text-brand">{label}</span>
      </div>
    </>
  );

  return internal ? (
    <Link href={product.href} className={cardClassName}>
      {body}
    </Link>
  ) : (
    <a href={product.href} target="_blank" rel="noopener noreferrer" className={cardClassName}>
      {body}
    </a>
  );
}
