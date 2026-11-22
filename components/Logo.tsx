import Link from "next/link";

/** The mark: an embroidery hoop with a needle pushed through it and a running stitch of red thread. */
export function LogoMark({ size = 40, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true" className={className}>
      {/* hoop clasp */}
      <path d="M20.6 9.6V6.9c0-.9.7-1.6 1.6-1.6h3.6c.9 0 1.6.7 1.6 1.6v2.7" stroke="#26221e" strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M24 5.3V2.8" stroke="#26221e" strokeWidth="2.2" strokeLinecap="round" />
      {/* outer + inner hoop, very slightly off-round so it feels drawn */}
      <path d="M24 9.4c9.6-.1 17.2 7.4 17.1 16.8-.1 9.3-7.8 16.6-17.3 16.5C14.5 42.6 7 35.2 7 26c.1-9.2 7.5-16.5 17-16.6Z" stroke="#26221e" strokeWidth="2.6" />
      <path d="M24.1 13.1c7.4 0 13.3 5.8 13.2 13-.1 7.1-6 12.8-13.3 12.8-7.3-.1-13.2-5.8-13.1-12.9.1-7.2 5.9-12.9 13.2-12.9Z" stroke="#26221e" strokeWidth="1.2" opacity=".55" />
      {/* running stitch across the fabric */}
      <path d="M13.6 30.5c3.2-2.7 6.4-3.6 9.7-2.3 3.5 1.4 6.4.7 9.6-2.4" stroke="#a63d29" strokeWidth="2.4" strokeLinecap="round" strokeDasharray="3.6 3.2" />
      {/* needle */}
      <path d="M17.2 37.6 38.6 13" stroke="#26221e" strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="37.2" cy="14.7" rx="0.9" ry="2" transform="rotate(41 37.2 14.7)" fill="#fbf7f0" stroke="#26221e" strokeWidth="1.2" />
      {/* loose thread tail from the eye */}
      <path d="M37.6 14.3c3.6-1.6 6.6.4 5.9 3.5-.6 2.5-3.6 3.2-5.3 5.6" stroke="#a63d29" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-2.5 no-underline text-ink hover:text-ink" aria-label="Sew & Hoop — home">
      <LogoMark size={compact ? 34 : 42} />
      <span className="flex flex-col leading-none">
        <span className={`font-serif ${compact ? "text-[1.45rem]" : "text-[1.7rem]"} tracking-tight`}>
          Sew <span className="text-madder italic" style={{ fontFamily: "Georgia, serif" }}>&amp;</span> Hoop
        </span>
        {!compact && (
          <span className="mt-1 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-ink-mute">machine advice from people who sew</span>
        )}
      </span>
    </Link>
  );
}
