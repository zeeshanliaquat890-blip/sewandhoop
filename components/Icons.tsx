import type { SiloIconName } from "@/site.config";

type P = { className?: string; size?: number };
const base = (size = 24) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
});

/** Hand-drawn style category icons. Accent strokes use the madder colour. */
export function SiloIcon({ name, size = 32, className = "" }: { name: SiloIconName; size?: number; className?: string }) {
  const accent = "#b23a26";
  switch (name) {
    case "sewing":
      return (
        <svg {...base(size)} className={className}>
          <path d="M2.8 19.6h18.4" />
          <path d="M5.6 19.6V8.3c0-1.3 1-2.3 2.3-2.3h9.6c1.3 0 2.3 1 2.3 2.3v1.5" />
          <path d="M14.4 9.8h5.8v4.1h-5.8z" />
          <path d="M17.3 13.9v3.2" stroke={accent} />
          <path d="M8.6 6V3.8h2.9V6" />
          <circle cx="8.6" cy="12.2" r="1.7" />
          <path d="M11.6 17.4h9" stroke={accent} strokeDasharray="1.8 1.6" />
        </svg>
      );
    case "embroidery":
      return (
        <svg {...base(size)} className={className}>
          <path d="M10.4 4.9V3.6c0-.5.4-.8.8-.8h1.6c.5 0 .8.4.8.8v1.3" />
          <path d="M12 4.9c4.6 0 8.2 3.5 8.2 8s-3.7 8.2-8.3 8.1c-4.5 0-8.1-3.6-8.1-8.1s3.7-8 8.2-8Z" />
          <path d="m8.9 10.8 2 2m0-2-2 2m3.4 1.3 2 2m0-2-2 2m.5-5.3 2 2m0-2-2 2" stroke={accent} />
        </svg>
      );
    case "accessories":
      return (
        <svg {...base(size)} className={className}>
          <path d="M4 4.2h9M4 19.8h9" />
          <path d="M5.6 4.2v15.6M11.4 4.2v15.6" />
          <path d="m5.6 8 5.8 2.1M5.6 11.9l5.8 2.1M5.6 15.8l5.8 2.1" stroke={accent} />
          <path d="M19.6 2.8 17 21.2" />
          <path d="M19.2 5.6c-.5.1-.8.6-.7 1" />
        </svg>
      );
    case "serger":
      return (
        <svg {...base(size)} className={className}>
          <path d="M2.8 20.4h18.4" />
          <path d="M4.2 20.4 5.6 9.6h1.8l1.4 10.8M9.6 20.4 11 9.6h2l1.4 10.8M15.2 20.4l1.4-10.8h1.8l1.4 10.8" />
          <path d="M6.5 9.6C7.3 6 9.5 3.6 12 3.3M12 9.6V3.3M17.5 9.6C16.7 6 14.5 3.6 12 3.3" stroke={accent} />
        </svg>
      );
    case "quilting":
      return (
        <svg {...base(size)} className={className}>
          <rect x="3.6" y="3.6" width="16.8" height="16.8" rx="1.2" />
          <path d="M12 3.6v16.8M3.6 12h16.8" />
          <path d="m3.6 3.6 8.4 8.4m0 0 8.4 8.4M20.4 3.6 12 12" />
          <path d="M5.4 9.6h3.2M15.4 14.4h3.2" stroke={accent} strokeDasharray="1.6 1.4" />
        </svg>
      );
    case "troubleshooting":
      return (
        <svg {...base(size)} className={className}>
          <circle cx="8.4" cy="15.6" r="5" />
          <circle cx="8.4" cy="15.6" r="1.6" />
          <path d="M5 12.7c1.8 1.2 4.6 1.2 6.8 0" stroke={accent} />
          <path d="m12.8 11.2 4.6-4.6" />
          <path d="m17 7 3.6-3.6" strokeWidth={3} />
        </svg>
      );
  }
}

export const IconArrow = ({ className = "", size = 18 }: P) => (
  <svg {...base(size)} className={className}><path d="M4 12h15M13.5 6.5 19 12l-5.5 5.5" /></svg>
);
export const IconSearch = ({ className = "", size = 20 }: P) => (
  <svg {...base(size)} className={className}><circle cx="10.5" cy="10.5" r="6.5" /><path d="m15.5 15.5 5 5" /></svg>
);
export const IconCheck = ({ className = "", size = 18 }: P) => (
  <svg {...base(size)} strokeWidth={2.2} className={className}><path d="m4.5 12.5 4.5 4.5 10.5-11" /></svg>
);
export const IconX = ({ className = "", size = 18 }: P) => (
  <svg {...base(size)} strokeWidth={2.2} className={className}><path d="M6 6l12 12M18 6 6 18" /></svg>
);
export const IconMenu = ({ className = "", size = 24 }: P) => (
  <svg {...base(size)} strokeWidth={2} className={className}><path d="M3.5 6.5h17M3.5 12h17M3.5 17.5h11" /></svg>
);
export const IconExternal = ({ className = "", size = 16 }: P) => (
  <svg {...base(size)} strokeWidth={2} className={className}><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" /></svg>
);
export const IconTool = ({ className = "", size = 22 }: P) => (
  <svg {...base(size)} className={className}><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M8 7h8M8 11h2M12 11h2M16 11h0M8 15h2M12 15h2M8 18.5h2M12 18.5h4" /></svg>
);

export function Stars({ rating }: { rating: number }) {
  const pct = Math.max(0, Math.min(100, (rating / 5) * 100));
  return (
    <span className="inline-flex items-center gap-2" aria-label={`Rated ${rating} out of 5`}>
      <span className="relative inline-block text-[1.05rem] leading-none tracking-[0.1em]" aria-hidden="true">
        <span className="text-line">★★★★★</span>
        <span className="absolute inset-0 overflow-hidden text-madder" style={{ width: `${pct}%` }}>★★★★★</span>
      </span>
      <span className="text-sm font-bold text-ink">{rating.toFixed(1)}</span>
    </span>
  );
}
