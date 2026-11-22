import { IconTool } from "../Icons";

/** Temporary shell shown until the real calculator is built. */
export function ToolPlaceholder({ name, description }: { name: string; description: string }) {
  return (
    <div className="patch p-6 sm:p-8">
      <div className="flex items-center gap-3">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-paper text-madder"><IconTool size={26} /></span>
        <div>
          <p className="kicker">Free tool · coming soon</p>
          <p className="font-serif text-[1.45rem] leading-tight">{name}</p>
        </div>
      </div>
      <p className="mt-4 text-[1.05rem] leading-relaxed text-ink-soft">{description}</p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2" aria-hidden="true">
        <div className="h-12 rounded-lg border-2 border-dashed border-line bg-paper" />
        <div className="h-12 rounded-lg border-2 border-dashed border-line bg-paper" />
        <div className="h-12 rounded-full bg-madder/25 sm:col-span-2" />
      </div>
      <p className="mt-4 text-sm text-ink-mute">We&apos;re putting the finishing stitches on this calculator.</p>
    </div>
  );
}
