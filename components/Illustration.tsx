/** Flat illustration of a computerized sewing machine — used in heroes and as a product photo placeholder. */
export function MachineIllustration({ className = "", title }: { className?: string; title?: string }) {
  return (
    <svg viewBox="0 0 320 220" className={className} role={title ? "img" : undefined} aria-hidden={title ? undefined : true} aria-label={title}>
      {/* fabric */}
      <path d="M38 152c40-6 80 4 120-2s80-6 126 0l-4 14c-44-5-84-4-122 1s-78 5-118-1Z" fill="#fbebe5" />
      <path d="M58 158c30-3 60 2 92-1" stroke="#b23a26" strokeWidth="2.4" strokeDasharray="7 5" strokeLinecap="round" fill="none" />
      {/* bed */}
      <rect x="24" y="160" width="272" height="26" rx="8" fill="#fff" stroke="#1e1a17" strokeWidth="3" />
      <rect x="40" y="168" width="70" height="10" rx="3" fill="#e8dfd1" />
      <rect x="18" y="186" width="284" height="12" rx="6" fill="#1e1a17" />
      {/* body */}
      <path d="M62 44h196a22 22 0 0 1 22 22v94h-62V98H106v36a8 8 0 0 1-8 8H70a8 8 0 0 1-8-8Z" fill="#f4eee5" stroke="#1e1a17" strokeWidth="3" strokeLinejoin="round" />
      <rect x="106" y="70" width="112" height="8" rx="2" fill="#b23a26" />
      <path d="M106 86h112" stroke="#1e1a17" strokeWidth="1.5" strokeDasharray="4 4" opacity=".35" />
      {/* screen + buttons */}
      <rect x="228" y="100" width="42" height="28" rx="4" fill="#1e1a17" />
      <path d="M235 109h20M235 116h28M235 122h14" stroke="#e9735c" strokeWidth="2" strokeLinecap="round" />
      <circle cx="238" cy="142" r="5" fill="#fff" stroke="#1e1a17" strokeWidth="2" />
      <circle cx="258" cy="142" r="5" fill="#b23a26" />
      {/* hand wheel */}
      <rect x="280" y="58" width="10" height="44" rx="5" fill="#1e1a17" />
      {/* spool + thread */}
      <rect x="196" y="26" width="5" height="18" fill="#1e1a17" />
      <rect x="186" y="14" width="25" height="16" rx="3" fill="#b23a26" />
      <path d="M190 18h17M190 22h17M190 26h17" stroke="#8e2c1b" strokeWidth="1.2" />
      <path d="M187 22C150 22 120 30 92 46" stroke="#b23a26" strokeWidth="1.6" fill="none" />
      {/* head: needle + foot */}
      <rect x="77" y="142" width="7" height="10" fill="#1e1a17" />
      <path d="M80.5 150v10" stroke="#1e1a17" strokeWidth="2" strokeLinecap="round" />
      <rect x="70" y="156" width="22" height="5" rx="2" fill="#1e1a17" />
      <circle cx="84" cy="60" r="8" fill="#fff" stroke="#1e1a17" strokeWidth="2.5" />
      <path d="M84 55v5l3 2" stroke="#1e1a17" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
