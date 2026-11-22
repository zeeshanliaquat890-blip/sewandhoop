import Link from "next/link";
import { siteConfig } from "@/site.config";
import { staticMetadata } from "@/lib/seo";
import { SimplePage } from "@/components/SimplePage";

export const metadata = staticMetadata("/terms-and-conditions/");

export default function Terms() {
  const s = siteConfig.name;
  return (
    <SimplePage title="Terms & conditions" path="/terms-and-conditions/" updated="November 22, 2026" intro={`By using ${s} you agree to these terms. Please read them — they're short.`}>
      <p><em>This template is a starting point, not legal advice.</em></p>
      <h2>Information only</h2>
      <p>Content on {s} is for general information. We work hard to keep it accurate, but machines, prices and specifications change. Always check the manufacturer&apos;s manual and the retailer before buying or repairing equipment.</p>
      <h2>Safety</h2>
      <p>Sewing machines have sharp, moving and electrical parts. Unplug your machine before cleaning, oiling or troubleshooting. If you are unsure, contact an authorized service technician. We are not liable for damage or injury resulting from following our guides.</p>
      <h2>Affiliate links and prices</h2>
      <p>Some links are affiliate links (see our <Link href="/affiliate-disclosure/">affiliate disclosure</Link>). Prices and availability shown or mentioned are accurate as of the date indicated and are subject to change. Purchases are made with the retailer, not with {s}.</p>
      <h2>Intellectual property</h2>
      <p>Text, graphics, logos and tools on this site belong to {s} unless stated otherwise. You may share links and short quotes with attribution. Please don&apos;t republish whole articles without permission. Product names and trademarks belong to their respective owners.</p>
      <h2>Free tools</h2>
      <p>Our calculators give estimates. Double-check important results (such as fabric to buy or prices to charge) before relying on them.</p>
      <h2>Limitation of liability</h2>
      <p>To the fullest extent permitted by law, {s} is not liable for any indirect or consequential loss arising from use of this website.</p>
      <h2>Changes</h2>
      <p>We may update these terms from time to time. Continued use of the site means you accept the current version.</p>
      <h2>Contact</h2>
      <p>Questions? <Link href="/contact/">Contact us</Link>.</p>
    </SimplePage>
  );
}
