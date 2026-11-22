import { siteConfig } from "@/site.config";
import { ToolPlaceholder } from "./ToolPlaceholder";

/**
 * FabricYardageCalculator — placeholder.
 * When you build the real tool, add "use client" at the top and replace the return value.
 * It can then be used on /tools/fabric-yardage-calculator/ AND inside any article: <Tool name="fabric-yardage-calculator" />
 */
const tool = siteConfig.tools.find((t) => t.slug === "fabric-yardage-calculator")!;

export default function FabricYardageCalculator() {
  return <ToolPlaceholder name={tool.name} description={tool.description} />;
}
