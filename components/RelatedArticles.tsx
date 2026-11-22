import type { Article } from "@/lib/content";
import { ArticleCard } from "./ArticleCard";

export function RelatedArticles({ articles, title = "Keep reading" }: { articles: Article[]; title?: string }) {
  if (!articles.length) return null;
  return (
    <section aria-labelledby="related" className="mx-auto mt-16 max-w-site px-4 sm:px-6">
      <hr className="stitch-rule mb-10" />
      <h2 id="related" className="font-serif text-[1.85rem]">{title}</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((a) => (
          <ArticleCard key={a.slug} article={a} showSilo={false} />
        ))}
      </div>
    </section>
  );
}
