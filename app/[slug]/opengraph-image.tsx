import { renderOg, ogSize } from "@/lib/og";
import { siteConfig } from "@/site.config";
import { getAllArticles, getArticle, getSilo, templateLabel } from "@/lib/content";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Sew & Hoop";
export const dynamicParams = false;

export function generateStaticParams() {
  return [...siteConfig.silos.map((s) => ({ slug: s.slug })), ...getAllArticles().map((a) => ({ slug: a.slug }))];
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const silo = getSilo(slug);
  if (silo) return renderOg({ title: silo.name, kicker: "Buying guides · Reviews · How-tos" });
  const a = getArticle(slug);
  const s = a ? getSilo(a.silo) : undefined;
  return renderOg({ title: a?.fm.title ?? siteConfig.name, kicker: a ? `${templateLabel[a.fm.template]}${s ? ` · ${s.name}` : ""}` : undefined });
}
