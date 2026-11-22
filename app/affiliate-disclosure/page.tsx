import Link from "next/link";
import { siteConfig } from "@/site.config";
import { pageMetadata } from "@/lib/seo";
import { SimplePage } from "@/components/SimplePage";

export const metadata = pageMetadata({ title: "Affiliate Disclosure", description: `How ${siteConfig.name} earns money and how that affects (and doesn't affect) our recommendations.`, path: "/affiliate-disclosure/" });

export default function AffiliateDisclosure() {
  return (
    <SimplePage title="Affiliate disclosure" path="/affiliate-disclosure/" updated="November 22, 2026" intro="Short version: some of our links earn us a commission. It costs you nothing extra and it never decides what we recommend.">
      <h2>Amazon Associates</h2>
      <p>
        <strong>{siteConfig.name} is a participant in the Amazon Services LLC Associates Program</strong>, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com. As an Amazon Associate we earn from qualifying purchases.
      </p>
      <h2>Other affiliate programs</h2>
      <p>We may also join affiliate programs run by other retailers or manufacturers. The same rules apply: commissions never change our verdicts.</p>
      <h2>How we keep our recommendations honest</h2>
      <ul>
        <li>No brand can pay to be included in a guide or to get a better rating.</li>
        <li>We recommend machines we&apos;d suggest to a friend, even when a cheaper option earns us less.</li>
        <li>Every page that contains affiliate links shows a short notice at the top.</li>
        <li>Prices and availability change often. Always check the retailer for the current price before you buy.</li>
      </ul>
      <h2>Questions?</h2>
      <p>Email us any time from the <Link href="/contact/">contact page</Link>.</p>
    </SimplePage>
  );
}
