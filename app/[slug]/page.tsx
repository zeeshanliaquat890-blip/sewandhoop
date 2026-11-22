import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { siteConfig } from "@/site.config";
import { getAllArticles, getArticle, getArticlesForSilo, getHubContent, getSilo, extractHeadings } from "@/lib/content";
import { getPlannedForSilo } from "@/lib/urlmap";
import { renderMdx } from "@/lib/mdx";
import { pageMetadata, staticMetadata, articleLd, breadcrumbLd, faqLd, itemListLd, productReviewLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { HubTemplate } from "@/templates/HubTemplate";
import { RoundupTemplate } from "@/templates/RoundupTemplate";
import { ReviewTemplate } from "@/templates/ReviewTemplate";
import { InformationalTemplate } from "@/templates/InformationalTemplate";
import { crumbs } from "@/templates/ArticleHeader";

export const dynamicParams = false;

/** Every hub + every published article is generated at build time (SSG). */
export function generateStaticParams() {
  return [...siteConfig.silos.map((s) => ({ slug: s.slug })), ...getAllArticles().map((a) => ({ slug: a.slug }))];
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const silo = getSilo(slug);
  if (silo) {
    return staticMetadata(`/${slug}/`);
  }
  const a = getArticle(slug);
  if (!a) return {};
  return pageMetadata({ title: a.fm.seoTitle || a.fm.title, absoluteTitle: Boolean(a.fm.seoTitle), description: a.fm.description, path: a.url, type: "article", published: a.fm.published, updated: a.fm.updated, noindex: a.fm.noindex });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;

  /* ---------- Hub ---------- */
  const silo = getSilo(slug);
  if (silo) {
    const hub = getHubContent(slug);
    const articles = getArticlesForSilo(slug);
    const content = hub ? await renderMdx(hub.body) : null;
    const url = `/${slug}/`;
    return (
      <>
        <JsonLd
          data={[
            breadcrumbLd([{ name: "Home", url: "/" }, { name: silo.name, url }]),
            { ...articleLd({ title: (hub?.fm.title as string) || silo.name, description: silo.description, url, published: hub?.fm.published as string, updated: hub?.fm.updated as string }), "@type": "CollectionPage" },
            ...(articles.length ? [itemListLd(url, articles.map((a) => ({ name: a.fm.title, id: a.slug })))] : []),
          ]}
        />
        <HubTemplate silo={silo} articles={articles} plannedCount={getPlannedForSilo(slug).length} content={content} contentHeadings={hub ? extractHeadings(hub.body) : []} />
      </>
    );
  }

  /* ---------- Article ---------- */
  const article = getArticle(slug);
  if (!article) notFound();
  const content = await renderMdx(article.body, article);
  const { fm } = article;

  const ld: object[] = [
    articleLd({ title: fm.title, description: fm.description, url: article.url, published: fm.published, updated: fm.updated, image: fm.image }),
    breadcrumbLd(crumbs(article)),
  ];
  if (fm.faq?.length) ld.push(faqLd(fm.faq));
  if (fm.template === "roundup" && fm.products?.length) ld.push(itemListLd(article.url, fm.products));
  if (fm.template === "review" && fm.verdict) {
    const main = fm.products?.find((p) => p.id === fm.verdict?.productId) ?? fm.products?.[0];
    if (main && (fm.products?.length ?? 0) === 1) {
      ld.push(productReviewLd({ name: main.name, image: main.image, rating: fm.verdict.rating ?? (main.score ? Math.round(main.score / 2) / 10 : undefined), summary: fm.verdict.summary, url: article.url, published: fm.published }));
    }
  }

  const Template = fm.template === "roundup" ? RoundupTemplate : fm.template === "review" ? ReviewTemplate : InformationalTemplate;
  return (
    <>
      <JsonLd data={ld} />
      <Template article={article} content={content} />
    </>
  );
}
