import type { ReactNode } from "react";
import { amazonUrl } from "@/lib/amazon";
import { IconExternal } from "./Icons";

type Props = {
  asin?: string;
  /** Amazon search phrase, used when there is no ASIN yet */
  query?: string;
  /** A full amazon.com URL — the tag is added automatically */
  href?: string;
  children?: ReactNode;
  /** "button" = red pill, "text" = inline link */
  variant?: "button" | "text";
  className?: string;
  /** Free label for click tracking, e.g. "quickpick-best-overall" */
  track?: string;
};

/**
 * Every Amazon link on the site goes through this component.
 * The tag comes from site.config.ts; rel/target are always set.
 * Clicks are picked up by <AffiliateClickTracker/> through the data-aff attributes.
 */
export function AffiliateLink({ asin, query, href, children, variant = "text", className = "", track }: Props) {
  const url = amazonUrl({ asin, query, href });
  const label = children ?? "Check price on Amazon";
  return (
    <a
      href={url}
      target="_blank"
      rel="sponsored nofollow noopener"
      data-aff="amazon"
      data-aff-asin={asin || undefined}
      data-aff-track={track || undefined}
      className={variant === "button" ? `btn btn-primary ${className}` : className}
    >
      {label}
      {variant === "button" && <IconExternal />}
    </a>
  );
}
