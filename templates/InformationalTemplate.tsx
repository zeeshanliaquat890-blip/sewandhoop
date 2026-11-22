import type { Article } from "@/lib/content";
import { getMoneyPages, getRelated } from "@/lib/content";
import { ArticleShell } from "./ArticleHeader";
import { Faq } from "@/components/Faq";
import { AuthorBox } from "@/components/AuthorBox";
import { MoneyPagesBox } from "@/components/MoneyPagesBox";
import { RelatedArticles } from "@/components/RelatedArticles";

/** How-to / what-is: sidebar TOC, steps, FAQ, and the related-machines box that feeds the money pages. */
export function InformationalTemplate({ article, content }: { article: Article; content: React.ReactNode }) {
  return (
    <>
      <ArticleShell article={article}>
        <div className="prose-sew mt-8">{content}</div>
        <Faq items={article.fm.faq ?? []} />
        <MoneyPagesBox silo={article.silo} articles={getMoneyPages(article.silo, article.slug)} />
        <AuthorBox />
      </ArticleShell>
      <RelatedArticles articles={getRelated(article)} />
    </>
  );
}
