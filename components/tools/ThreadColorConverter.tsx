import { siteConfig } from "@/site.config";
import { ToolPlaceholder } from "./ToolPlaceholder";

/**
 * ThreadColorConverter — placeholder.
 * When you build the real tool, add "use client" at the top and replace the return value.
 * It can then be used on /tools/thread-color-converter/ AND inside any article: <Tool name="thread-color-converter" />
 */
const tool = siteConfig.tools.find((t) => t.slug === "thread-color-converter")!;

export default function ThreadColorConverter() {
  return <ToolPlaceholder name={tool.name} description={tool.description} />;
}
