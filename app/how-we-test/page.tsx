import Link from "next/link";
import { siteConfig } from "@/site.config";
import { pageMetadata } from "@/lib/seo";
import { SimplePage } from "@/components/SimplePage";
import { ScoreRing, ScoreBars } from "@/components/Score";

export const metadata = pageMetadata({
  title: "How We Test & Score Sewing Machines",
  description: `How ${siteConfig.name} chooses, compares and scores sewing, embroidery and quilting machines — and what the Sew Score means.`,
  path: "/how-we-test/",
});

const criteria = [
  ["Stitch quality", "Straight-stitch consistency, tension balance, buttonholes, and how it handles thin and thick fabric."],
  ["Ease of use", "Threading, bobbin winding, the manual, the controls — could a nervous first-timer get going in an afternoon?"],
  ["Build & reliability", "Frame, motor, feed dogs, parts that wear, warranty, and what long-term owners report."],
  ["Features for the price", "Do the included feet, stitches and extras actually help at this price, or are they padding?"],
  ["Owner satisfaction", "Patterns in long-term owner feedback, not just the star average."],
];

export default function HowWeTest() {
  return (
    <SimplePage
      title="How we test and score machines"
      kicker="Our process"
      path="/how-we-test/"
      updated="November 22, 2026"
      intro="Every machine we recommend goes through the same checklist and gets a Sew Score out of 100. Here's exactly what goes into it."
    >
      <p><em>[Placeholder — edit this page so it describes your real process. Only claim hands-on testing you actually do.]</em></p>
      <div className="not-prose card my-8 grid items-center gap-6 p-6 sm:grid-cols-[auto_1fr]">
        <ScoreRing score={90} size={110} />
        <ScoreBars scores={{ "Stitch quality": 92, "Ease of use": 90, "Build & reliability": 88, "Features for the price": 91, "Owner satisfaction": 89 }} />
      </div>
      <h2>The five parts of the Sew Score</h2>
      <ol>
        {criteria.map(([t, d]) => (
          <li key={t}><strong>{t}.</strong> {d}</li>
        ))}
      </ol>
      <h2>What the numbers mean</h2>
      <ul>
        <li><strong>90–100: Outstanding.</strong> We&apos;d recommend it without hesitation for the people it&apos;s meant for.</li>
        <li><strong>85–89: Excellent.</strong> A strong choice with a small trade-off or two.</li>
        <li><strong>80–84: Very good.</strong> Right for some sewists, worth comparing.</li>
        <li><strong>Below 80.</strong> We rarely recommend these, and say why when we do.</li>
      </ul>
      <h2>What we never do</h2>
      <ul>
        <li>Accept payment for a place on a list or a better score.</li>
        <li>Copy specs without checking them against the manufacturer.</li>
        <li>Leave old picks up when a better machine replaces them.</li>
      </ul>
      <p>Questions about a score? <Link href="/contact/">Tell us</Link>.</p>
    </SimplePage>
  );
}
