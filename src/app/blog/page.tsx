import type { Metadata } from "next";

import { PageHero } from "@/components/brief/page-hero";
import { Container } from "@/components/brief/container";
import { CtaBand } from "@/components/brief/cta-band";
import { PostList } from "@/components/brief/post-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAllPosts } from "@/lib/blog";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Writing",
  description: `Salesforce technical deep-dives and practical advice for businesses running on Salesforce, from ${siteConfig.name}.`,
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const posts = await getAllPosts();
  const technical = posts.filter((p) => p.channel === "technical");
  const business = posts.filter((p) => p.channel === "business");

  const empty = <p className="border-t border-rule py-10 text-muted-foreground">Nothing published here yet. Check back soon.</p>;

  return (
    <>
      <PageHero
        label="Blog"
        title="Writing"
        intro="Deep-dives for people building on Salesforce, and plain-language advice for the people running a business on top of it."
      />
      <section>
        <Container className="pb-7">
          <Tabs defaultValue="all">
            <TabsList className="mb-5">
              <TabsTrigger value="all">All ({posts.length})</TabsTrigger>
              <TabsTrigger value="technical">Technical ({technical.length})</TabsTrigger>
              <TabsTrigger value="business">For clients ({business.length})</TabsTrigger>
            </TabsList>
            <TabsContent value="all">{posts.length ? <PostList posts={posts} /> : empty}</TabsContent>
            <TabsContent value="technical">{technical.length ? <PostList posts={technical} /> : empty}</TabsContent>
            <TabsContent value="business">{business.length ? <PostList posts={business} /> : empty}</TabsContent>
          </Tabs>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
