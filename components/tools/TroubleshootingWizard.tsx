import { siteConfig } from "@/site.config";
import { ToolPlaceholder } from "./ToolPlaceholder";

/**
 * TroubleshootingWizard — placeholder.
 * When you build the real tool, add "use client" at the top and replace the return value.
 * It can then be used on /tools/troubleshooting-wizard/ AND inside any article: <Tool name="troubleshooting-wizard" />
 */
const tool = siteConfig.tools.find((t) => t.slug === "troubleshooting-wizard")!;

export default function TroubleshootingWizard() {
  return <ToolPlaceholder name={tool.name} description={tool.description} />;
}
