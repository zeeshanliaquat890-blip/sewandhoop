export function SpecsTable({ specs, title = "Key specs", columns = false }: { specs?: Record<string, string | number>; title?: string; columns?: boolean }) {
  if (!specs || !Object.keys(specs).length) return null;
  return (
    <div className="not-prose overflow-hidden rounded-xl border border-line bg-white">
      <p className="label-cond border-b border-line bg-cream px-4 py-2.5 text-[0.9rem] text-ink-soft">{title}</p>
      <dl className={`text-[1rem] ${columns ? "grid sm:grid-cols-2" : "divide-y divide-line"}`}>
        {Object.entries(specs).map(([k, v]) => (
          <div key={k} className={`grid grid-cols-[minmax(7rem,45%)_1fr] gap-3 px-4 py-2.5 ${columns ? "border-b border-line sm:odd:border-r" : ""}`}>
            <dt className="text-ink-mute">{k}</dt>
            <dd className="font-semibold text-ink">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
