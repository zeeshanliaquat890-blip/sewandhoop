export function SpecsTable({ specs, title = "Specs at a glance" }: { specs?: Record<string, string | number>; title?: string }) {
  if (!specs || !Object.keys(specs).length) return null;
  return (
    <div className="not-prose overflow-hidden rounded-lg border border-line bg-paper">
      <p className="border-b border-line bg-linen px-4 py-2.5 text-[0.8rem] font-bold uppercase tracking-[0.14em] text-ink-soft">{title}</p>
      <dl className="divide-y divide-line text-[1rem]">
        {Object.entries(specs).map(([k, v]) => (
          <div key={k} className="grid grid-cols-[minmax(7rem,40%)_1fr] gap-3 px-4 py-2.5">
            <dt className="text-ink-mute">{k}</dt>
            <dd className="font-bold text-ink">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
