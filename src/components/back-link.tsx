"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { Container } from "@/components/brief/container";

/** Where "back" goes from a page. Top-level pages return to Home; deeper pages return to their parent. */
function parentOf(pathname: string): { href: string; label: string } {
  if (pathname.startsWith("/products/") && pathname.split("/").length > 3) {
    return { href: pathname.split("/").slice(0, 3).join("/"), label: "Back to product" };
  }
  if (pathname.startsWith("/products/")) return { href: "/#products", label: "Back to Home" };
  return { href: "/", label: "Back to Home" };
}

export function BackLink() {
  const pathname = usePathname();
  if (pathname === "/" || pathname.startsWith("/admin")) return null;
  const { href, label } = parentOf(pathname);

  return (
    <Container className="pt-5">
      <Link href={href} className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" aria-hidden />
        {label}
      </Link>
    </Container>
  );
}
