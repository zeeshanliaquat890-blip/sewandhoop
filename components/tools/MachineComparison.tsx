import { siteConfig } from "@/site.config";
import { ToolPlaceholder } from "./ToolPlaceholder";

/**
 * MachineComparison — placeholder.
 * When you build the real tool, add "use client" at the top and replace the return value.
 * It can then be used on /tools/machine-comparison/ AND inside any article: <Tool name="machine-comparison" />
 */
const tool = siteConfig.tools.find((t) => t.slug === "machine-comparison")!;

export default function MachineComparison() {
  return <ToolPlaceholder name={tool.name} description={tool.description} />;
}
