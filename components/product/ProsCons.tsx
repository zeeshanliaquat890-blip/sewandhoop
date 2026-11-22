import { IconCheck, IconX } from "../Icons";

export function ProsCons({ pros = [], cons = [] }: { pros?: string[]; cons?: string[] }) {
  if (!pros.length && !cons.length) return null;
  return (
    <div className="not-prose grid gap-4 sm:grid-cols-2">
      {pros.length > 0 && (
        <div className="rounded-xl border border-sage/25 bg-sage-tint p-4">
          <p className="label-cond mb-2 text-[0.95rem] text-sage">Pros</p>
          <ul className="grid gap-2 text-[1rem] leading-snug">
            {pros.map((p) => (
              <li key={p} className="flex gap-2"><span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-sage text-white"><IconCheck size={13} /></span>{p}</li>
            ))}
          </ul>
        </div>
      )}
      {cons.length > 0 && (
        <div className="rounded-xl border border-madder/20 bg-madder-tint p-4">
          <p className="label-cond mb-2 text-[0.95rem] text-madder">Cons</p>
          <ul className="grid gap-2 text-[1rem] leading-snug">
            {cons.map((c) => (
              <li key={c} className="flex gap-2"><span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-madder text-white"><IconX size={13} /></span>{c}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
