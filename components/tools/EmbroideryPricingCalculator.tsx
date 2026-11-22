import { siteConfig } from "@/site.config";
import { ToolPlaceholder } from "./ToolPlaceholder";

/**
 * EmbroideryPricingCalculator — placeholder.
 * When you build the real tool, add "use client" at the top and replace the return value.
 * It can then be used on /tools/embroidery-pricing-calculator/ AND inside any article: <Tool name="embroidery-pricing-calculator" />
 */
const tool = siteConfig.tools.find((t) => t.slug === "embroidery-pricing-calculator")!;

export default function EmbroideryPricingCalculator() {
  return <ToolPlaceholder name={tool.name} description={tool.description} />;
}
