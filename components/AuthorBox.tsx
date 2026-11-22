import Link from "next/link";
import { siteConfig } from "@/site.config";
import { LogoMark } from "./Logo";

export function AuthorBox() {
  return (
    <aside className="not-prose card my-14 overflow-hidden">
      <div className="flex flex-col gap-5 p-6 sm:flex-row">
        <span className="grid h-20 w-20 shrink-0 place-items-center rounded-full border-2 border-dashed border-madder/50 bg-cream"><LogoMark size={52} /></span>
        <div>
          <p className="label-cond text-[0.85rem] text-madder">About the author</p>
          <p className="mt-0.5 font-serif text-[1.3rem] font-bold"><Link href={siteConfig.author.url} className="text-ink no-underline hover:text-madder">{siteConfig.author.name}</Link></p>
          <p className="mt-2 text-[1rem] leading-relaxed text-ink-soft">{siteConfig.author.bio}</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-x-6 gap-y-2 border-t border-line bg-cream px-6 py-3 text-[0.92rem]">
        <Link href="/how-we-review/" className="font-bold no-underline">How we research machines →</Link>
        <Link href="/affiliate-disclosure/" className="font-bold no-underline">How we make money →</Link>
      </div>
    </aside>
  );
}
