import type { Article } from "@/lib/content";
import { getRelated } from "@/lib/content";
import { ArticleShell } from "./ArticleHeader";
import { QuickPicks } from "@/components/product/QuickPicks";
import { ComparisonTable } from "@/components/product/ComparisonTable";
import { Faq } from "@/components/Faq";
import { AuthorBox } from "@/components/AuthorBox";
import { RelatedArticles } from "@/components/RelatedArticles";

/** Best-of / roundup: top picks → comparison table → MDX body (product boxes + buying guide) → FAQ */
export function RoundupTemplate({ article, content }: { article: Article; content: React.ReactNode }) {
  const products = article.fm.products ?? [];
  return (
    <>
      <ArticleShell article={article}>
        {/* Placed by the writer in the body; added here only if the body doesn't place them */}
        {!/<QuickPicks\b/.test(article.body) && <QuickPicks products={products} />}
        {!/<ComparisonTable\b/.test(article.body) && <ComparisonTable products={products} />}
        <div className="prose-sew">{content}</div>
        <Faq items={article.fm.faq ?? []} />
        <AuthorBox />
      </ArticleShell>
      <RelatedArticles articles={getRelated(article)} title="More buying guides" />
    </>
  );
}
