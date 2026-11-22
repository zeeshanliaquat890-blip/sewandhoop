import Link from "next/link";
import { siteConfig } from "@/site.config";
import { staticMetadata } from "@/lib/seo";
import { SimplePage } from "@/components/SimplePage";

export const metadata = staticMetadata("/privacy-policy/");

export default function Privacy() {
  const s = siteConfig.name;
  return (
    <SimplePage title="Privacy policy" path="/privacy-policy/" updated="November 22, 2026" intro={`This policy explains what information ${s} (${siteConfig.url.replace("https://", "")}) collects when you visit, and what we do with it.`}>
      <h2>Information we collect</h2>
      <ul>
        <li><strong>Information you send us.</strong> If you email us, we receive your email address and whatever you choose to include.</li>
        <li><strong>Technical data.</strong> Our hosting provider (Vercel) may log standard technical data such as IP address, browser type and pages requested, for security and performance.</li>
        <li><strong>Analytics.</strong> If we use privacy-friendly analytics, it is used only to understand which pages are useful. We do not sell personal data.</li>
      </ul>
      <h2>Cookies</h2>
      <p>{s} itself does not need cookies to work. When you click an affiliate link and visit a retailer such as Amazon, that retailer may set cookies to attribute a purchase to us. Those cookies are governed by the retailer&apos;s own privacy policy.</p>
      <h2>Affiliate links</h2>
      <p>We participate in the Amazon Services LLC Associates Program. Amazon and other partners may collect information about your visit to their sites. See our <Link href="/affiliate-disclosure/">affiliate disclosure</Link>.</p>
      <h2>Third-party sites</h2>
      <p>We link to other websites. We are not responsible for their content or privacy practices.</p>
      <h2>Children&apos;s privacy</h2>
      <p>This site is not directed at children under 13 and we do not knowingly collect information from them.</p>
      <h2>Your rights (including California residents)</h2>
      <p>You can ask us what personal information we hold about you, ask us to correct or delete it, or opt out of any sale or sharing (we do not sell personal information). Contact us using the details below.</p>
      <h2>Changes to this policy</h2>
      <p>We may update this policy. The date at the top shows when it last changed.</p>
      <h2>Contact</h2>
      <p>Email: <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a></p>
    </SimplePage>
  );
}
