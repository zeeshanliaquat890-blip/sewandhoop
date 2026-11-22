import type { Article } from "@/lib/content";
import { getRelated } from "@/lib/content";
import { ArticleHeader } from "./ArticleHeader";
import { VerdictBox } from "@/components/product/VerdictBox";
import { SpecsTable } from "@/components/product/SpecsTable";
import { ProsCons } from "@/components/product/ProsCons";
import { ComparisonTable } from "@/components/product/ComparisonTable";
import { Alternatives } from "@/components/product/Alternatives";
import { Faq } from "@/components/Faq";
import { AuthorBox } from "@/components/AuthorBox";
import { RelatedArticles } from "@/components/RelatedArticles";

/**
 * Single review or "X vs Y".
 * Verdict on top → specs + pros/cons (single review) or comparison table (vs, 2+ products) → body → alternatives → FAQ
 */
export function ReviewTemplate({ article, content }: { article: Article; content: React.ReactNode }) {
  const { fm } = article;
  const products = fm.products ?? [];
  const main = products.find((p) => p.id === fm.verdict?.productId) ?? products[0];
  const isVs = products.length > 1;
  return (
    <>
      <article className="mx-auto max-w-prose px-4 pt-8 sm:px-6">
        <ArticleHeader article={article} />
        {fm.verdict && <VerdictBox verdict={fm.verdict} product={main} />}
        {isVs ? (
          <ComparisonTable products={products} />
        ) : (
          main && (
            <div className="my-10 grid gap-6">
              <SpecsTable specs={main.specs} />
              <ProsCons pros={main.pros} cons={main.cons} />
            </div>
          )
        )}
        <div className="prose-sew">{content}</div>
        <Alternatives items={fm.alternatives ?? []} />
        <Faq items={fm.faq ?? []} />
        <AuthorBox />
      </article>
      <RelatedArticles articles={getRelated(article)} />
    </>
  );
}
