import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils";

const spacingByVariant = {
  sm: "py-10 sm:py-12",
  md: "py-14 sm:py-16",
  lg: "py-16 sm:py-20",
  top: "pt-10 pb-2 sm:pt-14",
} as const;

export function Section({
  children,
  className,
  spacing = "md",
  border = true,
  as: Tag = "section",
}: {
  children: ReactNode;
  className?: string;
  spacing?: keyof typeof spacingByVariant;
  border?: boolean;
  as?: ElementType;
}) {
  return (
    <Tag className={cn(border && "border-t border-border/70")}>
      <div className={cn("mx-auto max-w-6xl px-6", spacingByVariant[spacing], className)}>
        {children}
      </div>
    </Tag>
  );
}
