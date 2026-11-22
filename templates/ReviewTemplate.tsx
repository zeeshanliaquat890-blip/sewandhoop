import type { Article } from "@/lib/content";
import { getRelated } from "@/lib/content";
import { ArticleShell } from "./ArticleHeader";
import { VerdictBox } from "@/components/product/VerdictBox";
import { SpecsTable } from "@/components/product/SpecsTable";
import { ProsCons } from "@/components/product/ProsCons";
import { ComparisonTable } from "@/components/product/ComparisonTable";
import { Alternatives } from "@/components/product/Alternatives";
import { ScoreBars } from "@/components/Score";
import { Faq } from "@/components/Faq";
import { AuthorBox } from "@/components/AuthorBox";
import { RelatedArticles } from "@/components/RelatedArticles";

/** Single review or "X vs Y". Verdict on top → scores/specs/pros-cons (single) or comparison table (vs) → body → alternatives → FAQ */
export function ReviewTemplate({ article, content }: { article: Article; content: React.ReactNode }) {
  const { fm } = article;
  const products = fm.products ?? [];
  const main = products.find((p) => p.id === fm.verdict?.productId) ?? products[0];
  const isVs = products.length > 1;
  return (
    <>
      <ArticleShell article={article}>
        {fm.verdict && <VerdictBox verdict={fm.verdict} product={isVs ? undefined : main} />}
        {isVs ? (
          <ComparisonTable products={products} />
        ) : (
          main && (
            <div className="my-10 grid gap-6">
              {main.scores && (
                <div className="card p-5"><p className="label-cond mb-3 text-[0.95rem]">Score breakdown</p><ScoreBars scores={main.scores} /></div>
              )}
              <ProsCons pros={main.pros} cons={main.cons} />
              <SpecsTable specs={main.specs} columns />
            </div>
          )
        )}
        <div className="prose-sew mt-8">{content}</div>
        <Alternatives items={fm.alternatives ?? []} />
        <Faq items={fm.faq ?? []} />
        <AuthorBox />
      </ArticleShell>
      <RelatedArticles articles={getRelated(article)} />
    </>
  );
}
