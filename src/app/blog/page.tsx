import type { Metadata } from "next";

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
    <p className="text-sm text-muted-foreground">Nothing published here yet — check back soon.</p>
  );
}

export default function BlogPage() {
  const technical = getPostsByChannel("technical");
  const business = getPostsByChannel("business");

  return (
    <>
      <Section as="div" spacing="top" border={false}>
        <SectionHeader
          as="h1"
          eyebrow="Blog"
          title="Two tracks: technical depth, and practical for the business side."
          body="Deep-dives for people building on Salesforce, and plain-language advice for the people running a business on top of it."
        />
      </Section>

      <Section spacing="top" border={false}>
        <Tabs defaultValue="technical">
          <TabsList>
            <TabsTrigger value="technical">Technical</TabsTrigger>
            <TabsTrigger value="business">For Clients</TabsTrigger>
          </TabsList>

          <TabsContent value="technical" className="mt-8">
            {technical.length ? (
              <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2">
                {technical.map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>
            ) : (
              <EmptyState />
            )}
          </TabsContent>

          <TabsContent value="business" className="mt-8">
            {business.length ? (
              <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2">
                {business.map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>
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
