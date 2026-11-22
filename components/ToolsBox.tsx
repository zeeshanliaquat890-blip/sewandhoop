import Link from "next/link";
import type { Tool } from "@/site.config";
import { IconTool, IconArrow } from "./Icons";

export function ToolsBox({ tools, title = "Free tools" }: { tools: readonly Tool[]; title?: string }) {
  if (!tools.length) return null;
  return (
    <section aria-labelledby="tools-box" className="rounded-xl bg-ink p-6 text-paper sm:p-8">
      <h2 id="tools-box" className="font-serif text-[1.6rem] text-paper">{title}</h2>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
        {tools.map((t) => (
          <li key={t.slug}>
            <Link href={`/tools/${t.slug}/`} className="group flex h-full gap-3 rounded-lg border border-white/15 p-4 text-paper no-underline hover:border-[#e9a796] hover:text-paper">
              <IconTool className="mt-0.5 shrink-0 text-[#e9a796]" />
              <span>
                <span className="flex items-center gap-1.5 font-bold">{t.name} <IconArrow size={15} className="opacity-60 group-hover:opacity-100" /></span>
                <span className="mt-1 block text-[0.95rem] leading-snug text-[#cfc5b6]">{t.description}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
