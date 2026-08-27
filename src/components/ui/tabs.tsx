"use client"

import * as React from "react"
import { Tabs as TabsPrimitive } from "radix-ui"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col", className)}
      {...props}
    />
  )
}

const tabsListVariants = cva("inline-flex w-fit items-center", {
  variants: {
    variant: {
      pill: "gap-1 rounded-lg border border-border bg-card p-1",
      underline: "gap-6 border-b border-border",
    },
  },
  defaultVariants: { variant: "pill" },
})

type TabsVariant = NonNullable<VariantProps<typeof tabsListVariants>["variant"]>

const TabsVariantContext = React.createContext<TabsVariant>("pill")

function TabsList({
  className,
  variant = "pill",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List> & VariantProps<typeof tabsListVariants>) {
  return (
    <TabsVariantContext value={variant ?? "pill"}>
      <TabsPrimitive.List
        data-slot="tabs-list"
        className={cn(tabsListVariants({ variant }), className)}
        {...props}
      />
    </TabsVariantContext>
  )
}

const tabsTriggerVariants = cva(
  "inline-flex items-center justify-center gap-1.5 whitespace-nowrap transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
  {
    variants: {
      variant: {
        pill: "rounded-md px-4 py-2 text-sm font-medium data-[state=active]:bg-brand data-[state=active]:text-brand-foreground data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:text-foreground",
        underline:
          "-mb-px border-b-2 border-transparent pb-3 text-sm font-medium data-[state=active]:border-brand data-[state=active]:text-foreground data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:text-foreground",
      },
    },
    defaultVariants: { variant: "pill" },
  },
)

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  const variant = React.use(TabsVariantContext)
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(tabsTriggerVariants({ variant }), className)}
      {...props}
    />
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
