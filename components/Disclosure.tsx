import Link from "next/link";
import { siteConfig } from "@/site.config";

/** Automatically shown at the top of every page that carries affiliate links. */
export function Disclosure() {
  return (
    <p className="flex gap-2.5 rounded-lg bg-linen px-4 py-3 text-[0.92rem] leading-snug text-ink-soft">
      <span aria-hidden="true" className="mt-[0.35em] inline-block h-2 w-2 shrink-0 rounded-full bg-madder" />
      <span>
        {siteConfig.name} is reader-supported. When you buy through links on this page we may earn a commission, at no extra cost to you. As an Amazon Associate we earn from qualifying purchases.{" "}
        <Link href="/affiliate-disclosure/">How we make money</Link>
      </span>
    </p>
  );
}
