import type { ComponentType } from "react";
import MachineFinder from "./MachineFinder";
import ThreadColorConverter from "./ThreadColorConverter";
import NeedleThreadSelector from "./NeedleThreadSelector";
import MachineComparison from "./MachineComparison";
import EmbroideryPricingCalculator from "./EmbroideryPricingCalculator";
import FabricYardageCalculator from "./FabricYardageCalculator";
import StitchCountEstimator from "./StitchCountEstimator";
import TroubleshootingWizard from "./TroubleshootingWizard";

/** slug (from site.config.ts tools) -> component */
export const toolRegistry: Record<string, ComponentType> = {
  "machine-finder": MachineFinder,
  "thread-color-converter": ThreadColorConverter,
  "needle-thread-selector": NeedleThreadSelector,
  "machine-comparison": MachineComparison,
  "embroidery-pricing-calculator": EmbroideryPricingCalculator,
  "fabric-yardage-calculator": FabricYardageCalculator,
  "stitch-count-estimator": StitchCountEstimator,
  "troubleshooting-wizard": TroubleshootingWizard,
};

/** Drop any tool inside an MDX article: <Tool name="fabric-yardage-calculator" /> */
export function Tool({ name }: { name: string }) {
  const C = toolRegistry[name];
  if (!C) return null;
  return (
    <div className="not-prose my-10">
      <C />
    </div>
  );
}
