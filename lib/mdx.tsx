import { evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import type { Article } from "./content";
import { AffiliateLink } from "@/components/AffiliateLink";
import { ProductBox as ProductBoxBase } from "@/components/product/ProductBox";
import { ProsCons } from "@/components/product/ProsCons";
import { SpecsTable } from "@/components/product/SpecsTable";
import { Steps, Step } from "@/components/Steps";
import { Callout } from "@/components/Callout";
import { Tool } from "@/components/tools/registry";
import { Cite, Owners, KeyTakeaways, Verdict, BuySkip } from "@/components/ArticleBits";
import { QuickPicks } from "@/components/product/QuickPicks";
import { ComparisonTable } from "@/components/product/ComparisonTable";

/** Components available inside every MDX file. */
function components(article?: Pick<Article, "fm">) {
  const products = article?.fm.products ?? [];
  return {
    a: ({ href = "", ...rest }: ComponentProps<"a">) =>
      href.startsWith("/") ? <Link href={href} {...rest} /> : <a href={href} {...rest} />,
    table: (p: ComponentProps<"table">) => (
      <div className="overflow-x-auto"><table {...p} /></div>
    ),
    AffiliateLink,
    ProsCons,
    SpecsTable,
    Steps,
    Step,
    Callout,
    Tool,
    Cite,
    Owners,
    KeyTakeaways,
    Verdict,
    BuySkip,
    /** <QuickPicks /> and <ComparisonTable columns={[...]} /> read the frontmatter products */
    QuickPicks: () => <QuickPicks products={products} />,
    ComparisonTable: ({ columns }: { columns?: string[] }) => <ComparisonTable products={products} columns={columns} />,
    /** <ProductBox id="model-a">long review…</ProductBox> — data from frontmatter `products` */
    ProductBox: ({ id, children }: { id: string; children?: ReactNode }) => {
      const i = products.findIndex((p) => p.id === id);
      if (i < 0) return <p className="text-madder">[ProductBox: no product with id “{id}” in frontmatter]</p>;
      return <ProductBoxBase product={products[i]} rank={i + 1}>{children}</ProductBoxBase>;
    },
  };
}

export async function renderMdx(source: string, article?: Pick<Article, "fm">) {
  const { default: Content } = await evaluate(source, {
    ...runtime,
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug],
  } as Parameters<typeof evaluate>[1]);
  return <Content components={components(article)} />;
}
