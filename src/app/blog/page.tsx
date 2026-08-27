import type { Metadata } from "next";
import { Building2, Code2 } from "lucide-react";

import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import { BlogCard } from "@/components/blog-card";
import { CTASection } from "@/components/cta-section";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getPostsByChannel } from "@/lib/blog";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Blog",
  description: `Salesforce technical deep-dives and practical advice for businesses working with Salesforce, from ${siteConfig.name}.`,
  alternates: { canonical: "/blog" },
};

function EmptyState() {
  return (
    <p className="py-8 text-sm text-muted-foreground">
      Nothing published here yet — check back soon.
    </p>
  );
}

export default function BlogPage() {
  const technical = getPostsByChannel("technical");
  const business = getPostsByChannel("business");

  return (
    <>
      <Section as="div" spacing="top" border={false} className="pb-6">
        <SectionHeader
          as="h1"
          eyebrow="Blog"
          title="Two tracks: technical depth, and practical for the business side."
          body="Deep-dives for people building on Salesforce, and plain-language advice for the people running a business on top of it."
        />
      </Section>

      <Section spacing="lg" border={false} className="pt-0">
        <Tabs defaultValue="technical">
          <TabsList variant="underline">
            <TabsTrigger value="technical">
              <Code2 className="size-4" /> Technical
            </TabsTrigger>
            <TabsTrigger value="business">
              <Building2 className="size-4" /> For Clients
            </TabsTrigger>
          </TabsList>

          <TabsContent value="technical" className="divide-y divide-border/70">
            {technical.length ? (
              technical.map((post) => <BlogCard key={post.slug} post={post} />)
            ) : (
              <EmptyState />
            )}
          </TabsContent>

          <TabsContent value="business" className="divide-y divide-border/70">
            {business.length ? (
              business.map((post) => <BlogCard key={post.slug} post={post} />)
            ) : (
              <EmptyState />
            )}
          </TabsContent>
        </Tabs>
      </Section>

      <CTASection />
    </>
  );
}
