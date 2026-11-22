import type { ReactNode } from "react";

const styles = {
  tip: { label: "Sewing tip", cls: "border-[#3d6b3a] bg-[#eef3e8]", text: "text-[#3d6b3a]" },
  note: { label: "Good to know", cls: "border-ink bg-linen", text: "text-ink" },
  warning: { label: "Careful", cls: "border-madder bg-madder-tint", text: "text-madder-deep" },
};

/** <Callout type="tip">...</Callout> */
export function Callout({ type = "note", title, children }: { type?: keyof typeof styles; title?: string; children: ReactNode }) {
  const s = styles[type];
  return (
    <aside className={`not-prose my-8 rounded-r-xl border-l-4 p-5 ${s.cls}`}>
      <p className={`text-[0.8rem] font-bold uppercase tracking-[0.14em] ${s.text}`}>{title ?? s.label}</p>
      <div className="prose-sew mt-2 text-[1.04rem]">{children}</div>
    </aside>
  );
}
