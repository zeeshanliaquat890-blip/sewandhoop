import { siteConfig } from "@/site.config";
import { staticMetadata } from "@/lib/seo";
import { SimplePage } from "@/components/SimplePage";

export const metadata = staticMetadata("/contact/");

export default function Contact() {
  return (
    <SimplePage title="Contact us" path="/contact/" intro="Spotted a mistake, have a machine question, or want to work with us? We read every message.">
      <div className="not-prose patch my-6 p-6 sm:p-8">
        <p className="kicker">Email</p>
        <p className="mt-2 font-serif text-[1.6rem]">
          <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>
        </p>
        <p className="mt-3 text-ink-soft">We usually reply within two working days.</p>
      </div>
      <h2>Before you write</h2>
      <ul>
        <li><strong>Machine trouble?</strong> Our troubleshooting guides cover the most common problems step by step.</li>
        <li><strong>Corrections:</strong> tell us the page and what is wrong — we fix errors quickly.</li>
        <li><strong>Brands &amp; PR:</strong> we never accept payment for placement or positive reviews.</li>
      </ul>
      <p>We can&apos;t give support for orders placed with retailers such as Amazon — please contact the seller directly for returns, shipping or warranty claims.</p>
    </SimplePage>
  );
}
