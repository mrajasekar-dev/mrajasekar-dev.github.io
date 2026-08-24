import { ImageResponse } from "next/og";

import { siteConfig } from "@/config/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default function OpengraphImage() {
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
          <div style={{ fontSize: 60, fontWeight: 600, lineHeight: 1.1, maxWidth: 900 }}>
            {siteConfig.tagline}
          </div>
          <div style={{ fontSize: 26, color: "#5b5b5b" }}>{siteConfig.title}</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
