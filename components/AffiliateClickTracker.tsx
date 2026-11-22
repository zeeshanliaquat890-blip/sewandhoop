"use client";

import { useEffect } from "react";

/**
 * One tiny listener for the whole site. Fires on any <a data-aff>.
 * - pushes an event to window.dataLayer (works with Google Tag Manager / GA4 if you add it later)
 * - optionally sends a beacon to `endpoint` (set analytics.affiliateClickEndpoint in site.config.ts)
 */
export function AffiliateClickTracker({ endpoint }: { endpoint?: string }) {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.("a[data-aff]") as HTMLAnchorElement | null;
      if (!a) return;
      const payload = {
        event: "affiliate_click",
        network: a.dataset.aff,
        asin: a.dataset.affAsin || "",
        track: a.dataset.affTrack || "",
        page: location.pathname,
        href: a.href,
      };
      const w = window as unknown as { dataLayer?: unknown[] };
      (w.dataLayer = w.dataLayer || []).push(payload);
      if (endpoint && navigator.sendBeacon) {
        navigator.sendBeacon(endpoint, new Blob([JSON.stringify(payload)], { type: "application/json" }));
      }
    };
    document.addEventListener("click", onClick, { capture: true });
    document.addEventListener("auxclick", onClick, { capture: true });
    return () => {
      document.removeEventListener("click", onClick, { capture: true });
      document.removeEventListener("auxclick", onClick, { capture: true });
    };
  }, [endpoint]);
  return null;
}
