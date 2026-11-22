import { siteConfig } from "@/site.config";
import { ToolPlaceholder } from "./ToolPlaceholder";

/**
 * NeedleThreadSelector — placeholder.
 * When you build the real tool, add "use client" at the top and replace the return value.
 * It can then be used on /tools/needle-thread-selector/ AND inside any article: <Tool name="needle-thread-selector" />
 */
const tool = siteConfig.tools.find((t) => t.slug === "needle-thread-selector")!;

export default function NeedleThreadSelector() {
  return <ToolPlaceholder name={tool.name} description={tool.description} />;
}
