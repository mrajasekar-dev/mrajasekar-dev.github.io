import Link from "next/link";

import { siteConfig } from "@/config/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/70">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-semibold">{siteConfig.name}</p>
            <p className="text-sm text-muted-foreground">{siteConfig.title}</p>
            <p className="mt-2 text-sm text-muted-foreground">{siteConfig.location}</p>
            <p className="text-sm text-muted-foreground">{siteConfig.serviceArea}</p>
          </div>

          <div className="flex flex-col gap-1 text-sm sm:items-end">
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-foreground hover:text-brand transition-colors"
            >
              {siteConfig.email}
            </a>
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="text-foreground hover:text-brand transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-col-reverse gap-4 border-t border-border/70 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}
          </p>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
