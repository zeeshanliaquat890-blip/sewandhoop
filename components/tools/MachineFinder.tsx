import { siteConfig } from "@/site.config";
import { ToolPlaceholder } from "./ToolPlaceholder";

/**
 * MachineFinder — placeholder.
 * When you build the real tool, add "use client" at the top and replace the return value.
 * It can then be used on /tools/machine-finder/ AND inside any article: <Tool name="machine-finder" />
 */
const tool = siteConfig.tools.find((t) => t.slug === "machine-finder")!;

export default function MachineFinder() {
  return <ToolPlaceholder name={tool.name} description={tool.description} />;
}
