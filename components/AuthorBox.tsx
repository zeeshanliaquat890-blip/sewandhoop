import Link from "next/link";
import { siteConfig } from "@/site.config";
import { LogoMark } from "./Logo";

export function AuthorBox() {
  return (
    <aside className="not-prose my-12 flex gap-4 rounded-xl border border-line p-5">
      <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-linen"><LogoMark size={38} /></span>
      <div>
        <p className="font-bold">Written by <Link href={siteConfig.author.url}>{siteConfig.author.name}</Link></p>
        <p className="mt-1 text-[1rem] leading-relaxed text-ink-soft">{siteConfig.author.bio}</p>
      </div>
    </aside>
  );
}
