"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, FileText, Inbox, LayoutGrid, Palette } from "lucide-react";

import { Monogram } from "@/components/navbar";
import { ThemeToggle } from "@/components/theme-toggle";
import { LogoutButton } from "@/components/admin/logout-button";
import { cn } from "@/lib/utils";

const items = [
  { href: "/admin", label: "Overview", icon: LayoutGrid, exact: true },
  { href: "/admin/inbox", label: "Inbox", icon: Inbox },
  { href: "/admin/posts", label: "Writing", icon: FileText },
  { href: "/admin/site", label: "Site", icon: Palette },
] as const;

export function StudioSidebar({ newCount }: { newCount: number }) {
  const pathname = usePathname();

  return (
    <aside className="flex shrink-0 flex-col border-rule bg-paper md:sticky md:top-0 md:h-dvh md:w-60 md:border-r">
      <div className="flex items-center justify-between gap-3 border-b border-rule px-4 py-4 md:border-b-0">
        <Link href="/admin" className="flex items-center gap-2.5">
          <Monogram className="size-7 text-lg" />
          <span className="leading-tight">
            <span className="block text-sm font-semibold">Studio</span>
            <span className="block text-xs text-muted-foreground">rajasekar-m</span>
          </span>
        </Link>
        <div className="md:hidden">
          <ThemeToggle />
        </div>
      </div>

      <nav aria-label="Studio" className="flex gap-1 overflow-x-auto px-3 py-2 md:flex-col md:py-4">
        {items.map(({ href, label, icon: Icon, ...rest }) => {
          const active = "exact" in rest ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex shrink-0 items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors",
                active ? "bg-foreground text-background" : "text-foreground/75 hover:bg-foreground/5 hover:text-foreground",
              )}
            >
              <Icon className="size-4" aria-hidden />
              {label}
              {label === "Inbox" && newCount > 0 ? (
                <span
                  className={cn(
                    "ml-auto rounded-full px-1.5 py-px font-mono text-[0.65rem] tabular-nums",
                    active ? "bg-background text-foreground" : "bg-brand text-brand-foreground",
                  )}
                >
                  {newCount}
                </span>
              ) : null}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto hidden flex-col gap-2 border-t border-rule p-3 md:flex">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between rounded-md px-3 py-2 text-sm text-foreground/75 hover:bg-foreground/5 hover:text-foreground"
        >
          View live site <ArrowUpRight className="size-3.5" aria-hidden />
        </Link>
        <div className="flex items-center justify-between px-1">
          <LogoutButton />
          <ThemeToggle />
        </div>
      </div>
    </aside>
  );
}
