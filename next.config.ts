import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/admin/appearance", destination: "/admin/site", permanent: true },
      { source: "/how-i-work", destination: "/about", permanent: true },
      { source: "/services", destination: "/about", permanent: true },
      { source: "/products/focusquest", destination: "/products/salesforce-daily-quiz", permanent: true },
      { source: "/products/focusquest/privacy", destination: "/products/salesforce-daily-quiz/privacy", permanent: true },
    ];
  },
};

export default nextConfig;
