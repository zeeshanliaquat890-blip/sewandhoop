import Link from "next/link";
import { siteConfig } from "@/site.config";
import { LogoMark } from "@/components/Logo";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-prose px-4 py-20 text-center sm:px-6">
      <LogoMark size={88} className="mx-auto" />
      <p className="kicker mt-6">Error 404</p>
      <h1 className="mt-2 text-[2.4rem]">This page slipped off the spool.</h1>
      <p className="mt-4 text-ink-soft">The link may be old, or the guide hasn&apos;t been stitched together yet. Try one of these instead:</p>
      <ul className="mt-8 flex flex-wrap justify-center gap-2">
        {siteConfig.silos.map((s) => (
          <li key={s.slug}><Link href={`/${s.slug}/`} className="btn btn-ghost !min-h-[2.6rem] !text-[0.95rem]">{s.name}</Link></li>
        ))}
      </ul>
      <p className="mt-8"><Link href="/" className="font-bold">← Back to the homepage</Link></p>
    </div>
  );
}
