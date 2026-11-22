import type { NextConfig } from "next";
import { siteConfig } from "./site.config";

const nextConfig: NextConfig = {
  // Flat URLs with a trailing slash: sewandhoop.com/how-to-sew-a-hem/
  trailingSlash: true,
  poweredByHeader: false,
  reactStrictMode: true,
  // Content files are read from disk at build time, make sure Vercel bundles them.
  outputFileTracingIncludes: {
    "/**": ["./content/**/*", "./data/**/*", "./assets/**/*"],
  },
  async headers() {
    return [
      // Whole-site noindex header while indexing is switched off in site.config.ts
      ...(siteConfig.allowIndexing ? [] : [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }]),
      {
        source: "/:all*(svg|png|jpg|jpeg|webp|avif|woff2|ico)",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
