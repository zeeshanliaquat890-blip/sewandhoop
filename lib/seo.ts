import type { Metadata } from "next";
import { siteConfig } from "@/site.config";

export const absUrl = (p: string) => new URL(p, siteConfig.url).toString();

export function pageMetadata({
  title,
  description,
  path,
  type = "website",
  published,
  updated,
  noindex,
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  published?: string;
  updated?: string;
  noindex?: boolean;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    robots: noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      title,
      description,
      url: path,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type,
      ...(type === "article" ? { publishedTime: published, modifiedTime: updated || published } : {}),
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

/* ---------- JSON-LD builders ---------- */

const org = () => ({
  "@type": "Organization",
  "@id": `${siteConfig.url}/#org`,
  name: siteConfig.name,
  url: siteConfig.url,
  logo: absUrl("/logo-512.png"),
});

export function breadcrumbLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absUrl(it.url),
    })),
  };
}

export function articleLd(a: { title: string; description: string; url: string; published?: string; updated?: string; image?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.description,
    mainEntityOfPage: absUrl(a.url),
    url: absUrl(a.url),
    image: a.image ? absUrl(a.image) : absUrl(`${a.url}opengraph-image`),
    datePublished: a.published,
    dateModified: a.updated || a.published,
    author: { "@type": "Organization", name: siteConfig.author.name, url: absUrl(siteConfig.author.url) },
    publisher: org(),
    inLanguage: siteConfig.language,
  };
}

export function faqLd(faq: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

export function itemListLd(url: string, items: { name: string; id: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    url: absUrl(url),
    numberOfItems: items.length,
    itemListElement: items.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.name,
      url: `${absUrl(url)}#product-${p.id}`,
    })),
  };
}

export function productReviewLd(p: { name: string; image?: string; rating?: number; summary: string; url: string; published?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    ...(p.image ? { image: p.image } : {}),
    review: {
      "@type": "Review",
      name: p.name,
      reviewBody: p.summary,
      datePublished: p.published,
      author: { "@type": "Organization", name: siteConfig.author.name },
      ...(p.rating ? { reviewRating: { "@type": "Rating", ratingValue: p.rating, bestRating: 5, worstRating: 1 } } : {}),
    },
  };
}

export function websiteLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      org(),
      { "@type": "WebSite", "@id": `${siteConfig.url}/#website`, url: siteConfig.url, name: siteConfig.name, description: siteConfig.description, publisher: { "@id": `${siteConfig.url}/#org` }, inLanguage: siteConfig.language },
    ],
  };
}
