import { siteConfig } from "@/site.config";
import { ToolPlaceholder } from "./ToolPlaceholder";

/**
 * StitchCountEstimator — placeholder.
 * When you build the real tool, add "use client" at the top and replace the return value.
 * It can then be used on /tools/stitch-count-estimator/ AND inside any article: <Tool name="stitch-count-estimator" />
 */
const tool = siteConfig.tools.find((t) => t.slug === "stitch-count-estimator")!;

export default function StitchCountEstimator() {
  return <ToolPlaceholder name={tool.name} description={tool.description} />;
}
