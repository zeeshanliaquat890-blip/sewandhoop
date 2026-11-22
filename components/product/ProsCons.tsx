import { IconCheck, IconX } from "../Icons";

export function ProsCons({ pros = [], cons = [], compact = false }: { pros?: string[]; cons?: string[]; compact?: boolean }) {
  if (!pros.length && !cons.length) return null;
  return (
    <div className={`grid gap-4 ${compact ? "" : "sm:grid-cols-2"} not-prose`}>
      {pros.length > 0 && (
        <div className="rounded-lg border border-line bg-paper p-4">
          <p className="mb-2 text-[0.8rem] font-bold uppercase tracking-[0.14em] text-[#3d6b3a]">What we like</p>
          <ul className="grid gap-2 text-[1rem] leading-snug">
            {pros.map((p) => (
              <li key={p} className="flex gap-2"><IconCheck className="mt-0.5 shrink-0 text-[#3d6b3a]" />{p}</li>
            ))}
          </ul>
        </div>
      )}
      {cons.length > 0 && (
        <div className="rounded-lg border border-line bg-paper p-4">
          <p className="mb-2 text-[0.8rem] font-bold uppercase tracking-[0.14em] text-madder">Worth knowing</p>
          <ul className="grid gap-2 text-[1rem] leading-snug">
            {cons.map((c) => (
              <li key={c} className="flex gap-2"><IconX className="mt-0.5 shrink-0 text-madder" />{c}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
