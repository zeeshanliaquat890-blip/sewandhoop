import { notFound } from "next/navigation";
import Link from "next/link";
import { siteConfig } from "@/site.config";
import { pageMetadata, breadcrumbLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { toolRegistry } from "@/components/tools/registry";
import { getArticlesForSilo, getSilo } from "@/lib/content";
import { ArticleCard } from "@/components/ArticleCard";

export const dynamicParams = false;
export function generateStaticParams() {
  return siteConfig.tools.map((t) => ({ tool: t.slug }));
}

type Props = { params: Promise<{ tool: string }> };

export async function generateMetadata({ params }: Props) {
  const { tool } = await params;
  const t = siteConfig.tools.find((x) => x.slug === tool);
  if (!t) return {};
  return pageMetadata({ title: `${t.name} (Free Tool)`, description: t.description, path: `/tools/${t.slug}/` });
}

export default async function ToolPage({ params }: Props) {
  const { tool } = await params;
  const t = siteConfig.tools.find((x) => x.slug === tool);
  const Comp = toolRegistry[tool];
  if (!t || !Comp) notFound();
  const silo = getSilo(t.silo);
  const related = getArticlesForSilo(t.silo).filter((a) => a.fm.template !== "informational").slice(0, 3);
  const crumbs = [{ name: "Home", url: "/" }, { name: "Tools", url: "/tools/" }, { name: t.name, url: `/tools/${t.slug}/` }];
  return (
    <div className="mx-auto max-w-prose px-4 pt-8 sm:px-6">
      <JsonLd
        data={[
          breadcrumbLd(crumbs),
          { "@context": "https://schema.org", "@type": "WebApplication", name: t.name, description: t.description, applicationCategory: "UtilitiesApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: 0, priceCurrency: "USD" } },
        ]}
      />
      <Breadcrumbs items={crumbs} />
      <p className="kicker mt-6">Free tool{silo ? ` · ${silo.name}` : ""}</p>
      <h1 className="mt-2 text-[2.3rem] leading-tight sm:text-[2.8rem]">{t.name}</h1>
      <p className="mt-3 text-[1.2rem] leading-relaxed text-ink-soft">{t.description}</p>
      <div className="mt-8"><Comp /></div>
      {related.length > 0 && (
        <section className="mt-14">
          <h2 className="text-[1.7rem]">Related buying guides</h2>
          <div className="mt-5 grid gap-4">
            {related.map((a) => <ArticleCard key={a.slug} article={a} showSilo={false} />)}
          </div>
        </section>
      )}
      {silo && <p className="mt-10"><Link href={`/${silo.slug}/`} className="font-bold">All {silo.name.toLowerCase()} guides →</Link></p>}
    </div>
  );
}
