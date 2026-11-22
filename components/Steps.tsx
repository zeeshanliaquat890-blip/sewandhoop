import type { ReactNode } from "react";

/**
 * Numbered steps for how-to articles:
 * <Steps>
 *   <Step title="Press the hem">...</Step>
 * </Steps>
 */
export function Steps({ children }: { children: ReactNode }) {
  return <ol className="not-prose my-8 grid gap-0 [counter-reset:step]">{children}</ol>;
}

export function Step({ title, children }: { title: string; children: ReactNode }) {
  return (
    <li className="relative grid grid-cols-[3rem_1fr] gap-4 pb-8 [counter-increment:step] last:pb-0 before:absolute before:bottom-0 before:left-[1.45rem] before:top-12 before:border-l-2 before:border-dashed before:border-line last:before:hidden">
      <span aria-hidden="true" className="grid h-12 w-12 place-items-center rounded-full border-2 border-madder bg-paper font-serif text-xl text-madder before:content-[counter(step)]" />
      <div className="pt-2.5">
        <h3 className="!mt-0 font-serif text-[1.35rem] leading-snug">{title}</h3>
        <div className="prose-sew mt-2 text-[1.05rem]">{children}</div>
      </div>
    </li>
  );
}
