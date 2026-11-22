import type { ComponentType } from "react";
import { getAllArticles } from "@/lib/content";
import type { ToolCtx } from "./ui";
import MachineFinder from "./MachineFinder";
import ThreadColorConverter from "./ThreadColorConverter";
import NeedleThreadSelector from "./NeedleThreadSelector";
import MachineComparison from "./MachineComparison";
import EmbroideryPricingCalculator from "./EmbroideryPricingCalculator";
import FabricYardageCalculator from "./FabricYardageCalculator";
import StitchCountEstimator from "./StitchCountEstimator";
import TroubleshootingWizard from "./TroubleshootingWizard";

/** slug (from site.config.ts tools) -> component. Every tool is a client component. */
export const toolRegistry: Record<string, ComponentType<{ ctx?: ToolCtx }>> = {
  "machine-finder": MachineFinder,
  "thread-color-converter": ThreadColorConverter,
  "needle-thread-selector": NeedleThreadSelector,
  "machine-comparison": MachineComparison,
  "embroidery-pricing-calculator": EmbroideryPricingCalculator,
  "fabric-yardage-calculator": FabricYardageCalculator,
  "stitch-count-estimator": StitchCountEstimator,
  "troubleshooting-wizard": TroubleshootingWizard,
};

/** Which article slugs are live — tools only link to guides that exist. */
export function toolCtx(): ToolCtx {
  const all = getAllArticles();
  const reviews: Record<string, string> = {};
  for (const a of all) if (a.fm.template === "review" && a.fm.products?.length === 1) reviews[a.fm.products[0].id] = a.slug;
  return { published: all.map((a) => a.slug), reviews };
}

/** Drop any tool inside an MDX article: <Tool name="fabric-yardage-calculator" /> */
export function Tool({ name }: { name: string }) {
  const C = toolRegistry[name];
  if (!C) return null;
  return (
    <div className="not-prose my-10">
      <C ctx={toolCtx()} />
    </div>
  );
}
