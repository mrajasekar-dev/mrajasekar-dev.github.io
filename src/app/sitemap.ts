import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { getAllPosts } from "@/lib/blog";
import { packages } from "@/content/packages";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = [
    "",
    "/for-companies",
    ...packages.map((p) => `/packages/${p.slug}`),
    "/work",
    "/blog",
    "/about",
    "/products/focusquest",
    "/products/focusquest/privacy",
    "/contact",
    "/privacy",
    "/terms",
  ];

  const staticEntries: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));

  const posts = await getAllPosts();
  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...postEntries];
}
