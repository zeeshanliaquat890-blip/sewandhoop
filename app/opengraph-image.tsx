import { renderOg, ogSize } from "@/lib/og";
import { siteConfig } from "@/site.config";

export const size = ogSize;
export const contentType = "image/png";
export const alt = siteConfig.name;

export default function Image() {
  return renderOg({ title: "Find the sewing machine you'll actually love using.", kicker: siteConfig.tagline });
}
