import { siteConfig } from "@/site.config";

/** Sew Score — our 0–100 rating, shown as a ring. */
export function ScoreRing({ score, size = 72, label = "Sew Score", onDark = false }: { score: number; size?: number; label?: string; onDark?: boolean }) {
  if (!siteConfig.showSewScore) return null;
  const r = 30;
  const c = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(100, score)) / 100;
  return (
    <div className="inline-flex flex-col items-center" aria-label={`${label}: ${score} out of 100`} role="img">
      <svg width={size} height={size} viewBox="0 0 72 72" aria-hidden="true">
        <circle cx="36" cy="36" r={r} fill={onDark ? "#2c2622" : "#fff"} stroke={onDark ? "#4f4842" : "#ece4d8"} strokeWidth="7" />
        <circle cx="36" cy="36" r={r} fill="none" stroke="#b23a26" strokeWidth="7" strokeLinecap="round" strokeDasharray={`${c * pct} ${c}`} transform="rotate(-90 36 36)" />
        <text x="36" y="43" textAnchor="middle" fontFamily="var(--font-barlow), Arial Narrow, sans-serif" fontWeight="700" fontSize="23" fill={onDark ? "#fff" : "#1e1a17"}>{score}</text>
      </svg>
      {label && <span className={`label-cond mt-1 text-[0.72rem] ${onDark ? "text-white/70" : "text-ink-mute"}`}>{label}</span>}
    </div>
  );
}

/** Sub-score bars, e.g. Stitch quality 92 */
export function ScoreBars({ scores }: { scores?: Record<string, number> }) {
  if (!siteConfig.showSewScore) return null;
  if (!scores || !Object.keys(scores).length) return null;
  return (
    <dl className="grid gap-2.5">
      {Object.entries(scores).map(([k, v]) => (
        <div key={k} className="grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-1">
          <dt className="text-[0.95rem] text-ink-soft">{k}</dt>
          <dd className="font-cond text-[1.05rem] font-bold">{v}</dd>
          <div className="col-span-2 h-2 overflow-hidden rounded-full bg-linen-deep" aria-hidden="true">
            <div className="h-full rounded-full bg-madder" style={{ width: `${Math.max(0, Math.min(100, v))}%` }} />
          </div>
        </div>
      ))}
    </dl>
  );
}

export function scoreWord(score: number) {
  if (score >= 90) return "Outstanding";
  if (score >= 85) return "Excellent";
  if (score >= 80) return "Very good";
  if (score >= 70) return "Good";
  return "Fair";
}
