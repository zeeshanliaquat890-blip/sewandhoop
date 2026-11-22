import Link from "next/link";
import { siteConfig } from "@/site.config";
import { pageMetadata } from "@/lib/seo";
import { SimplePage } from "@/components/SimplePage";

export const metadata = pageMetadata({ title: "About Us", description: `Who is behind ${siteConfig.name}, how we choose machines, and how the site is funded.`, path: "/about/" });

export default function About() {
  return (
    <SimplePage title={`About ${siteConfig.name}`} path="/about/" intro="We started Sew & Hoop because buying a sewing machine shouldn't feel like decoding a spec sheet in a foreign language.">
      <p>[Placeholder — replace with your own story.] Tell readers who you are, how long you have been sewing or embroidering, and what machines you have owned. Real experience is what Google and readers trust most.</p>
      <h2>What we cover</h2>
      <ul>
        {siteConfig.silos.map((s) => (
          <li key={s.slug}><Link href={`/${s.slug}/`}>{s.name}</Link> — {s.description}</li>
        ))}
      </ul>
      <h2>How we choose machines</h2>
      <p>[Placeholder] Describe your process honestly: what you test hands-on, what you research, which sources you use (manuals, manufacturer specs, owner communities), and how often guides are updated.</p>
      <h2>How we make money</h2>
      <p>Some links on this site are affiliate links. If you buy through them we may earn a small commission at no extra cost to you. That never decides what we recommend. <Link href="/affiliate-disclosure/">Read our full disclosure</Link>.</p>
      <h2>Say hello</h2>
      <p>Questions, corrections or a machine you want us to look at? <Link href="/contact/">Get in touch</Link>.</p>
    </SimplePage>
  );
}
