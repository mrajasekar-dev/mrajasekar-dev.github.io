import { ArrowUpRight } from "lucide-react";

import type { Product } from "@/content/products";
import { cn } from "@/lib/utils";

/** A product I've built; the whole card links out to the live app. */
export function ProductCard({ product, className }: { product: Product; className?: string }) {
  return (
    <a
      href={product.href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("group flex flex-col rounded-lg border border-rule p-4 transition-colors hover:border-foreground/25", className)}
    >
      <p className="annot">{product.tagline}</p>
      <h3 className="mt-2 flex items-center gap-1.5 text-base font-medium leading-snug tracking-tight">
        {product.name}
        <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand" aria-hidden />
        <span className="sr-only">(opens in a new tab)</span>
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
        <span className="text-sm font-medium group-hover:text-brand">{new URL(product.href).host}</span>
      </div>
    </a>
  );
}
