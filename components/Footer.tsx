import Link from "next/link";
import { siteConfig } from "@/site.config";
import { LogoMark } from "./Logo";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 bg-ink text-[#e9e1d4]">
      <div className="h-[3px]" style={{ background: "repeating-linear-gradient(90deg,#a63d29 0 12px,transparent 12px 20px)" }} />
      <div className="mx-auto grid max-w-site gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-14 w-14 place-items-center rounded-full bg-paper"><LogoMark size={42} /></span>
            <span className="font-serif text-2xl text-paper">Sew &amp; Hoop</span>
          </div>
          <p className="mt-4 max-w-sm text-[1rem] leading-relaxed text-[#cfc5b6]">{siteConfig.description}</p>
        </div>
        <FooterCol title="Machines" links={siteConfig.silos.slice(0, 4).map((s) => ({ href: `/${s.slug}/`, label: s.name }))} />
        <FooterCol
          title="Learn"
          links={[
            ...siteConfig.silos.slice(4).map((s) => ({ href: `/${s.slug}/`, label: s.name })),
            { href: "/tools/", label: "Free sewing tools" },
          ]}
        />
        <FooterCol
          title="Sew & Hoop"
          links={[
            { href: "/about/", label: "About us" },
            { href: "/contact/", label: "Contact" },
            { href: "/affiliate-disclosure/", label: "Affiliate disclosure" },
            { href: "/privacy-policy/", label: "Privacy policy" },
            { href: "/terms-and-conditions/", label: "Terms & conditions" },
          ]}
        />
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-site px-4 py-6 text-[0.9rem] leading-relaxed text-[#b9ae9e] sm:px-6">
          <p>
            As an Amazon Associate, {siteConfig.name} earns from qualifying purchases. Prices and availability can change; check the retailer for current details.
          </p>
          <p className="mt-2">© {year} {siteConfig.name}. Made with thread and patience in the USA.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <p className="mb-3 text-[0.78rem] font-bold uppercase tracking-[0.16em] text-[#e9a796]">{title}</p>
      <ul className="grid gap-2">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-[1rem] text-[#e9e1d4] no-underline hover:text-white hover:underline">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
