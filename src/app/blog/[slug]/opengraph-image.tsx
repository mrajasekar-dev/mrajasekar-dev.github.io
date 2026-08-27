import { ImageResponse } from "next/og";

import { channelLabels, getAllSlugs, getPostBySlug } from "@/lib/blog";
import { siteConfig } from "@/config/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export default async function BlogOpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          backgroundColor: "#f8f6f3",
          color: "#17181a",
          fontFamily: "Helvetica, Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 8,
              backgroundColor: "#17181a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#3a5ba0",
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            R
          </div>
          <div style={{ fontSize: 22, color: "#5b5b5b" }}>{siteConfig.name}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 20, color: "#3a5ba0", fontWeight: 700, letterSpacing: 2 }}>
            {channelLabels[post.channel].toUpperCase()}
          </div>
          <div style={{ fontSize: 54, fontWeight: 600, lineHeight: 1.15, maxWidth: 1000 }}>
            {post.title}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
