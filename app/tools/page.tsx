import Link from "next/link";
import { siteConfig } from "@/site.config";
import { staticMetadata, breadcrumbLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { IconTool, IconArrow } from "@/components/Icons";
import { getSilo } from "@/lib/content";

export const metadata = staticMetadata("/tools/");

export default function ToolsPage() {
  return (
    <div className="mx-auto max-w-site px-4 pt-8 sm:px-6">
      <JsonLd data={breadcrumbLd([{ name: "Home", url: "/" }, { name: "Tools", url: "/tools/" }])} />
      <Breadcrumbs items={[{ name: "Home", url: "/" }, { name: "Tools", url: "/tools/" }]} />
      <div className="max-w-prose">
        <p className="kicker mt-6">Free tools</p>
        <h1 className="mt-2 text-[2.4rem] leading-tight sm:text-[3rem]">Calculators &amp; helpers for sewists</h1>
        <p className="mt-4 text-[1.2rem] leading-relaxed text-ink-soft">Small tools that answer the questions we get asked most. Free, no sign-up.</p>
      </div>
      <hr className="stitch-rule my-10" />
      <ul className="grid gap-4 sm:grid-cols-2">
        {siteConfig.tools.map((t, i) => (
          <li key={t.slug}>
            <Link href={`/tools/${t.slug}/`} className="group flex h-full gap-4 rounded-xl border border-line bg-paper p-6 text-ink no-underline hover:border-ink hover:text-ink">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-linen text-madder"><IconTool size={28} /></span>
              <span>
                <span className="block text-[0.75rem] font-bold uppercase tracking-[0.14em] text-ink-mute">No. {String(i + 1).padStart(2, "0")} · {getSilo(t.silo)?.short}</span>
                <span className="mt-1 flex items-center gap-2 font-serif text-[1.4rem] leading-snug group-hover:text-madder">{t.name} <IconArrow size={18} /></span>
                <span className="mt-1 block text-ink-soft">{t.description}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
