"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";

import { nav, siteConfig } from "@/config/site";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

export function Monogram({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "grid size-8 place-items-center rounded-full bg-foreground text-xs font-semibold tracking-tight text-background",
        className,
      )}
    >
      RM
    </span>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname.startsWith("/admin")) return null;

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-[background-color,border-color] duration-300",
        scrolled
          ? "border-b border-rule bg-background/80 backdrop-blur-md"
          : "border-b border-transparent",
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:rounded-md focus:bg-foreground focus:px-3 focus:py-2 focus:text-background"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-14 max-w-[960px] items-center justify-between gap-6 px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label={`${siteConfig.name}, home`}>
          <span className="text-[0.95rem] font-semibold tracking-tight">{siteConfig.name}</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative rounded-md px-3 py-2 text-sm transition-colors hover:text-foreground",
                  active ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex">
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="grid size-10 place-items-center rounded-md hover:bg-foreground/5"
          >
            <Menu className="size-5" />
          </button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetContent side="right" className="w-full bg-background sm:max-w-sm">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-3">
                  <Monogram /> {siteConfig.name}
                </SheetTitle>
              </SheetHeader>
              <nav aria-label="Mobile" className="flex flex-col px-4">
                {nav.map((item) => (
                  <SheetClose asChild key={item.href}>
                    <Link
                      href={item.href}
                      className="flex items-baseline gap-4 border-b border-rule py-4 text-xl font-medium"
                    >
                      {item.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
