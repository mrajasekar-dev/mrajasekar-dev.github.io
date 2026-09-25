"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { GithubIcon, LinkedinIcon, XIcon } from "@/components/icons";
import { Container } from "@/components/brief/container";
import { nav, siteConfig } from "@/config/site";

export function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;
  const year = new Date().getFullYear();

  return (
    <footer className="mt-12">
      <Container>
        <div className="flex flex-col gap-8 border-t border-rule py-10 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-semibold tracking-tight">{siteConfig.name}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {siteConfig.title} · {siteConfig.location}
          </p>
          <a href={`mailto:${siteConfig.email}`} className="mt-3 inline-block text-sm hover:text-brand">
            {siteConfig.email}
          </a>
        </div>
        <div className="flex flex-col gap-4 sm:items-end">
          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-foreground">
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4 text-muted-foreground">
            {[
              { href: siteConfig.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
              { href: siteConfig.github, label: "GitHub", Icon: GithubIcon },
              { href: siteConfig.twitter, label: "X", Icon: XIcon },
            ].map(({ href, label, Icon }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer noopener" aria-label={label} className="hover:text-foreground">
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>
        </div>
      </Container>
      <Container className="flex justify-between pb-10 text-xs text-muted-foreground">
        <p>© {year} {siteConfig.name}</p>
        <div className="flex gap-5">
          <Link href="/privacy" className="hover:text-foreground">Privacy</Link>
          <Link href="/terms" className="hover:text-foreground">Terms</Link>
        </div>
      </Container>
    </footer>
  );
}
