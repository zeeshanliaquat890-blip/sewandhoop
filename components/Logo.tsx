import Link from "next/link";

/** The mark: an embroidery hoop with a needle pushed through it and a running stitch of red thread. */
export function LogoMark({ size = 40, className = "", onDark = false }: { size?: number; className?: string; onDark?: boolean }) {
  const ink = onDark ? "#fbf8f3" : "#1e1a17";
  const fill = onDark ? "#2c2622" : "#fff";
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true" className={className}>
      <path d="M20.6 9.6V6.9c0-.9.7-1.6 1.6-1.6h3.6c.9 0 1.6.7 1.6 1.6v2.7" stroke={ink} strokeWidth="2.4" strokeLinejoin="round" />
      <path d="M24 5.3V2.8" stroke={ink} strokeWidth="2.4" strokeLinecap="round" />
      <path d="M24 9.4c9.6-.1 17.2 7.4 17.1 16.8-.1 9.3-7.8 16.6-17.3 16.5C14.5 42.6 7 35.2 7 26c.1-9.2 7.5-16.5 17-16.6Z" fill={fill} stroke={ink} strokeWidth="3" />
      <path d="M24.1 13.6c7.1 0 12.8 5.6 12.7 12.5-.1 6.8-5.8 12.3-12.8 12.3-7-.1-12.7-5.6-12.6-12.4.1-6.9 5.7-12.4 12.7-12.4Z" stroke={ink} strokeWidth="1.2" opacity=".45" />
      <path d="M13.6 30.5c3.2-2.7 6.4-3.6 9.7-2.3 3.5 1.4 6.4.7 9.6-2.4" stroke="#d2482f" strokeWidth="2.6" strokeLinecap="round" strokeDasharray="3.6 3.2" />
      <path d="M17.2 37.6 38.6 13" stroke={ink} strokeWidth="2.2" strokeLinecap="round" />
      <path d="M37.6 14.3c3.6-1.6 6.6.4 5.9 3.5-.6 2.5-3.6 3.2-5.3 5.6" stroke="#d2482f" strokeWidth="1.9" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({ onDark = false, size = "md" }: { onDark?: boolean; size?: "md" | "lg" }) {
  return (
    <Link href="/" className={`group flex items-center gap-2.5 no-underline ${onDark ? "text-white hover:text-white" : "text-ink hover:text-ink"}`}>
      <LogoMark size={size === "lg" ? 52 : 42} onDark={onDark} />
      <span className="flex flex-col leading-none">
        <span className={`font-serif font-bold tracking-tight ${size === "lg" ? "text-[1.9rem]" : "text-[1.6rem]"}`}>
          Sew<span className="mx-[0.08em] text-[#d2482f]">&amp;</span>Hoop
        </span>
        <span className={`label-cond mt-1 text-[0.72rem] tracking-[0.2em] ${onDark ? "text-white/60" : "text-ink-mute"}`}>Sewing machine reviews</span>
      </span>
    </Link>
  );
}
