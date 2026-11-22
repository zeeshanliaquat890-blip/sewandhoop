import type { ReactNode } from "react";

/** Shared building blocks for every tool, so they all look like one family. */

export type ToolCtx = { published: string[]; /** product id -> slug of its single review */ reviews?: Record<string, string> };

export function ToolFrame({ title, badge, children }: { title: string; badge?: string; children: ReactNode }) {
  return (
    <div className="not-prose overflow-hidden rounded-2xl border border-line bg-white shadow-[0_1px_2px_rgba(30,26,23,.04),0_12px_32px_-16px_rgba(30,26,23,.18)]">
      <div className="weave flex items-center justify-between gap-3 px-5 py-3 text-white sm:px-6">
        <p className="label-cond text-[0.95rem] text-white">{title}</p>
        {badge && <span className="label-cond rounded-full bg-white/10 px-2.5 py-0.5 text-[0.78rem] text-[#e9a796]">{badge}</span>}
      </div>
      <div className="p-5 sm:p-6">{children}</div>
    </div>
  );
}

export function Field({ label, hint, htmlFor, children }: { label: string; hint?: string; htmlFor?: string; children: ReactNode }) {
  return (
    <div className="grid gap-1.5">
      <label htmlFor={htmlFor} className="text-[0.98rem] font-bold text-ink">{label}</label>
      {children}
      {hint && <p className="text-[0.85rem] leading-snug text-ink-mute">{hint}</p>}
    </div>
  );
}

const inputCls =
  "h-12 w-full rounded-lg border-2 border-line bg-white px-3 text-[1.05rem] text-ink outline-none transition-colors focus:border-madder";

export function NumberInput({
  id, value, onChange, min = 0, max, step = 1, suffix, prefix, label,
}: { id: string; label?: string; value: number; onChange: (v: number) => void; min?: number; max?: number; step?: number; suffix?: string; prefix?: string }) {
  return (
    <div className="relative">
      {prefix && <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-mute">{prefix}</span>}
      <input
        id={id}
        aria-label={label}
        type="number"
        inputMode="decimal"
        value={Number.isFinite(value) ? value : ""}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(e.target.value === "" ? 0 : Number(e.target.value))}
        className={`${inputCls} ${prefix ? "pl-7" : ""} ${suffix ? (suffix.length <= 2 ? "pr-7" : "pr-16") : ""}`}
      />
      {suffix && <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[0.9rem] text-ink-mute">{suffix}</span>}
    </div>
  );
}

export function SelectInput<T extends string>({ id, value, onChange, options }: { id: string; value: T; onChange: (v: T) => void; options: { value: T; label: string }[] }) {
  return (
    <select id={id} value={value} onChange={(e) => onChange(e.target.value as T)} className={`${inputCls} cursor-pointer appearance-none bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%2212%22%20height=%2212%22%3E%3Cpath%20d=%22M2%204l4%204%204-4%22%20fill=%22none%22%20stroke=%22%23b23a26%22%20stroke-width=%222%22/%3E%3C/svg%3E')] bg-[position:right_0.9rem_center] bg-no-repeat pr-9`}>
      {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  );
}

/** Big tappable choices (radio group). */
export function Choices<T extends string>({
  name, value, onChange, options, columns = 2,
}: { name: string; value: T | ""; onChange: (v: T) => void; options: { value: T; label: string; sub?: string }[]; columns?: 1 | 2 | 3 | 4 }) {
  const cols = { 1: "", 2: "sm:grid-cols-2", 3: "sm:grid-cols-3", 4: "grid-cols-2 sm:grid-cols-4" }[columns];
  return (
    <div role="radiogroup" className={`grid gap-2.5 ${cols}`}>
      {options.map((o) => {
        const on = value === o.value;
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={on}
            name={name}
            onClick={() => onChange(o.value)}
            className={`flex items-start gap-3 rounded-xl border-2 px-4 py-3 text-left transition-colors ${on ? "border-madder bg-madder-tint" : "border-line bg-white hover:border-ink/40"}`}
          >
            <span aria-hidden="true" className={`mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 ${on ? "border-madder" : "border-ink/40"}`}>
              {on && <span className="h-2.5 w-2.5 rounded-full bg-madder" />}
            </span>
            <span>
              <span className="block font-bold leading-snug text-ink">{o.label}</span>
              {o.sub && <span className="mt-0.5 block text-[0.88rem] leading-snug text-ink-mute">{o.sub}</span>}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function ResultPanel({ children, title = "Your result" }: { children: ReactNode; title?: string }) {
  return (
    <div className="mt-6 overflow-hidden rounded-xl border-2 border-ink" aria-live="polite">
      <p className="label-cond bg-ink px-4 py-2 text-[0.9rem] text-white">{title}</p>
      <div className="bg-cream p-5">{children}</div>
    </div>
  );
}

export function Stat({ label, value, big = false, note }: { label: string; value: ReactNode; big?: boolean; note?: string }) {
  return (
    <div className="rounded-lg bg-white p-4">
      <p className="label-cond text-[0.8rem] text-ink-mute">{label}</p>
      <p className={`font-cond font-bold leading-tight text-ink ${big ? "text-[2.3rem] text-madder" : "text-[1.6rem]"}`}>{value}</p>
      {note && <p className="mt-0.5 text-[0.82rem] leading-snug text-ink-mute">{note}</p>}
    </div>
  );
}

export function Note({ children }: { children: ReactNode }) {
  return <p className="mt-4 text-[0.85rem] leading-snug text-ink-mute">{children}</p>;
}

/** Link to a planned guide if it's published, otherwise to the fallback (usually the hub). */
export function GuideLink({ ctx, slug, fallback, children }: { ctx?: ToolCtx; slug: string; fallback: string; children: ReactNode }) {
  const live = ctx?.published.includes(slug);
  return <a href={live ? `/${slug}/` : fallback} className="font-bold">{children}</a>;
}

export const fmtMoney = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2 });
export const fmtInt = (n: number) => Math.round(n).toLocaleString("en-US");
