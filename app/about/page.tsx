import Link from "next/link";
import { siteConfig } from "@/site.config";
import { staticMetadata } from "@/lib/seo";
import { SimplePage } from "@/components/SimplePage";

export const metadata = staticMetadata("/about/");

export default function About() {
  return (
    <SimplePage title={`About ${siteConfig.name}`} path="/about/" intro="We started Sew & Hoop because buying a sewing machine shouldn't feel like decoding a spec sheet in a foreign language.">
      <p>Sew &amp; Hoop is a small, independent guide for home sewists, quilters and embroiderers in the United States. We started it because choosing a machine shouldn&apos;t mean decoding spec sheets, sorting through sponsored &ldquo;top 10&rdquo; lists, or learning the hard way that a machine can&apos;t handle the fabric you bought it for.</p>
      <p>Our job is simple: check the facts, listen to the people who actually own these machines, and explain it all in plain English, so you can buy once and get back to sewing.</p>
      <h2>What we cover</h2>
      <ul>
        {siteConfig.silos.map((s) => (
          <li key={s.slug}><Link href={`/${s.slug}/`}>{s.name}</Link> — {s.description}</li>
        ))}
      </ul>
      <h2>How we choose machines</h2>
      <p>Our guides are research-based. Every specification is checked against the manufacturer&apos;s own manual or spec sheet for the exact model, every owner-experience point comes from patterns that keep coming up in long-term owner reports, and every machine is scored with the same Sew Score method. We say so plainly on every page, and we never claim to have tested a machine we haven&apos;t. <Link href="/how-we-review/">Read exactly how we review and score machines</Link>.</p>
      <p>Guides are updated when models are replaced, prices move into a different band, or new owner reports change the picture.</p>
      <h2>How we make money</h2>
      <p>Some links on this site are affiliate links. If you buy through them we may earn a small commission at no extra cost to you. That never decides what we recommend. <Link href="/affiliate-disclosure/">Read our full disclosure</Link>.</p>
      <h2>Say hello</h2>
      <p>Questions, corrections or a machine you want us to look at? <Link href="/contact/">Get in touch</Link>.</p>
    </SimplePage>
  );
}
