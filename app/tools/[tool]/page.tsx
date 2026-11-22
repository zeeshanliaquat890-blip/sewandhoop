import { notFound } from "next/navigation";
import Link from "next/link";
import { siteConfig } from "@/site.config";
import { staticMetadata, breadcrumbLd, faqLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { toolRegistry, toolCtx } from "@/components/tools/registry";
import { toolContent } from "@/lib/tool-content";
import { getArticlesForSilo, getSilo } from "@/lib/content";
import { ArticleCard } from "@/components/ArticleCard";
import { Faq } from "@/components/Faq";
import { IconTool, IconArrow } from "@/components/Icons";

export const dynamicParams = false;
export function generateStaticParams() {
  return siteConfig.tools.map((t) => ({ tool: t.slug }));
}

type Props = { params: Promise<{ tool: string }> };

export async function generateMetadata({ params }: Props) {
  const { tool } = await params;
  const t = siteConfig.tools.find((x) => x.slug === tool);
  if (!t) return {};
  return staticMetadata(`/tools/${t.slug}/`);
}

export default async function ToolPage({ params }: Props) {
  const { tool } = await params;
  const t = siteConfig.tools.find((x) => x.slug === tool);
  const Comp = toolRegistry[tool];
  if (!t || !Comp) notFound();
  const c = toolContent[t.slug];
  const silo = getSilo(t.silo);
  const related = getArticlesForSilo(t.silo).filter((a) => a.fm.template !== "informational").slice(0, 3);
  const others = siteConfig.tools.filter((x) => x.slug !== t.slug).slice(0, 4);
  const crumbs = [{ name: "Home", url: "/" }, { name: "Tools", url: "/tools/" }, { name: t.name, url: `/tools/${t.slug}/` }];
  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd(crumbs),
          { "@context": "https://schema.org", "@type": "WebApplication", name: t.name, description: c?.intro ?? t.description, url: `${siteConfig.url}/tools/${t.slug}/`, applicationCategory: "UtilitiesApplication", operatingSystem: "Any", browserRequirements: "Requires JavaScript", offers: { "@type": "Offer", price: 0, priceCurrency: "USD" } },
          ...(c?.faq.length ? [faqLd(c.faq)] : []),
        ]}
      />
      <header className="border-b border-line bg-cream">
        <div className="mx-auto max-w-[58rem] px-4 pb-8 pt-6 sm:px-6">
          <Breadcrumbs items={crumbs} />
          <div className="mt-6 flex items-start gap-4">
            <span className="hidden h-14 w-14 shrink-0 place-items-center rounded-xl bg-madder text-white sm:grid"><IconTool size={30} /></span>
            <div>
              <p className="kicker">Free tool{silo ? ` · ${silo.name}` : ""}</p>
              <h1 className="mt-1 text-[2.2rem] leading-tight sm:text-[2.8rem]">{t.name}</h1>
              <p className="mt-3 text-[1.15rem] leading-relaxed text-ink-soft">{c?.intro ?? t.description}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[58rem] px-4 pt-8 sm:px-6">
        <Comp ctx={toolCtx()} />

        {c && (
          <section className="mt-14 grid gap-8 md:grid-cols-[1fr_1fr]">
            <div>
              <p className="kicker">How to use it</p>
              <h2 className="text-[1.7rem]">Using the {t.name.toLowerCase()}</h2>
              <ol className="mt-4 grid gap-3">
                {c.how.map((s, i) => (
                  <li key={s} className="flex gap-3"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 border-madder font-cond font-bold text-madder">{i + 1}</span><span className="pt-0.5">{s}</span></li>
                ))}
              </ol>
            </div>
            <div className="card p-6">
              <p className="kicker">More free tools</p>
              <ul className="mt-3 grid gap-1">
                {others.map((o) => (
                  <li key={o.slug}><Link href={`/tools/${o.slug}/`} className="flex items-center justify-between gap-2 rounded-md px-2 py-2 font-bold text-ink no-underline hover:bg-cream hover:text-madder">{o.name}<IconArrow size={15} /></Link></li>
                ))}
              </ul>
              <Link href="/tools/" className="mt-2 inline-block px-2 font-bold">All tools →</Link>
            </div>
          </section>
        )}

        {c && <Faq items={c.faq} />}

        {related.length > 0 && (
          <section className="mt-10">
            <p className="kicker">Buying guides</p>
            <h2 className="text-[1.7rem]">Related guides</h2>
            <div className="mt-5 grid gap-5 sm:grid-cols-3">{related.map((a) => <ArticleCard key={a.slug} article={a} showSilo={false} />)}</div>
          </section>
        )}
      </div>
    </>
  );
}
