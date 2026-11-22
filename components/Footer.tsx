import Link from "next/link";
import { siteConfig } from "@/site.config";
import { Logo } from "./Logo";
import { SiloIcon } from "./Icons";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24">
      {/* CTA band */}
      <div className="bg-madder text-white">
        <div className="mx-auto flex max-w-site flex-col items-center justify-between gap-5 px-4 py-10 text-center sm:px-6 md:flex-row md:text-left">
          <div>
            <p className="font-serif text-[1.7rem] font-bold leading-tight text-white">Still not sure which machine is right for you?</p>
            <p className="mt-1 text-white/85">Answer four quick questions and get a personal shortlist.</p>
          </div>
          <Link href="/tools/machine-finder/" className="btn btn-light shrink-0">Try the Machine Finder</Link>
        </div>
      </div>

      <div className="weave text-[#e9e1d4]">
        <div className="mx-auto grid max-w-site gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Logo onDark size="lg" />
            <p className="mt-5 max-w-sm text-[1rem] leading-relaxed text-white/65">{siteConfig.description}</p>
            <ul className="mt-6 grid max-w-sm grid-cols-2 gap-2 text-[0.85rem]">
              {["Independent", "No paid rankings", "Updated regularly", "Written in the USA"].map((b) => (
                <li key={b} className="label-cond flex items-center gap-2 rounded-md border border-white/15 px-2.5 py-1.5 text-white/80">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#e9735c]" aria-hidden="true" /> {b}
                </li>
              ))}
            </ul>
          </div>
          <FooterCol title="Categories" links={siteConfig.silos.map((s) => ({ href: `/${s.slug}/`, label: s.name, icon: s.icon }))} />
          <FooterCol title="Free tools" links={siteConfig.tools.slice(0, 6).map((t) => ({ href: `/tools/${t.slug}/`, label: t.name }))} />
          <FooterCol
            title="Sew & Hoop"
            links={[
              { href: "/about/", label: "About us" },
              { href: "/how-we-review/", label: "How we review" },
              { href: "/contact/", label: "Contact" },
              { href: "/affiliate-disclosure/", label: "Affiliate disclosure" },
              { href: "/privacy-policy/", label: "Privacy policy" },
              { href: "/terms-and-conditions/", label: "Terms & conditions" },
            ]}
          />
        </div>
        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-site flex-col gap-2 px-4 py-6 text-[0.88rem] leading-relaxed text-white/55 sm:px-6 md:flex-row md:justify-between">
            <p>As an Amazon Associate, {siteConfig.name} earns from qualifying purchases.</p>
            <p>© {year} {siteConfig.name}. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { href: string; label: string; icon?: (typeof siteConfig.silos)[number]["icon"] }[] }) {
  return (
    <div>
      <p className="label-cond mb-4 text-[0.95rem] text-[#e9a796]">{title}</p>
      <ul className="grid gap-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="flex items-center gap-2 text-[0.98rem] text-white/85 no-underline hover:text-white hover:underline">
              {l.icon && <SiloIcon name={l.icon} size={18} className="text-white/50" />}
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
