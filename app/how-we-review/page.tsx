import Link from "next/link";
import { staticMetadata } from "@/lib/seo";
import { SimplePage } from "@/components/SimplePage";
import { ScoreRing, ScoreBars } from "@/components/Score";

export const metadata = staticMetadata("/how-we-review/");

const criteria = [
  ["Stitch quality (25%)", "Stitch consistency, tension balance, feeding through thin and thick fabric, and skipped-stitch reports."],
  ["Ease of use (20%)", "Threading, bobbin system, needle threader, buttonhole, controls and the manual — could a nervous first-timer get going in an afternoon?"],
  ["Build & reliability (20%)", "Frame, motor, parts that wear, warranty terms, and what long-term owners report about breakdowns and service."],
  ["Features for the price (20%)", "Do the included feet, stitches and extras actually help at this price band, compared with machines that cost the same?"],
  ["Owner satisfaction (15%)", "The direction and strength of recurring patterns in long-term owner reports — never a single review."],
];

export default function HowWeReview() {
  return (
    <SimplePage
      title="How we research and score machines"
      kicker="Our process"
      path="/how-we-review/"
      updated="November 22, 2026"
      intro="Every recommendation on Sew & Hoop is built from checked specifications and long-term owner reports, using the same method for every machine. Here's exactly how."
    >
      <h2>What our reviews are based on</h2>
      <p>
        Our guides are <strong>research-based</strong>. We do not claim to have tested a machine unless we say so on that page. Instead, every recommendation is built from:
      </p>
      <ul>
        <li><strong>Manufacturer specifications and manuals</strong> — every figure on a page is checked against the manufacturer&apos;s own US product page, manual or spec sheet for the exact model and variant.</li>
        <li><strong>Long-term owner reports</strong> — recurring patterns from sewing communities, owner forums and long-term video reviews. We report patterns, never single opinions, and we never quote or copy customer reviews.</li>
        <li><strong>US availability, warranty and service</strong> — where you can buy it, what the warranty covers, and whether you can get it serviced.</li>
      </ul>
      <p>If a specification can&apos;t be confirmed from a primary source, it doesn&apos;t appear on the page. A guide missing a number is better than a guide that invents one.</p>

      <h2>The Sew Score</h2>
      <p>The Sew Score is our research-based rating out of 100. It is calculated once per machine, so a machine has the same score on every page — a 90 in one guide means the same as a 90 in another.</p>
      <div className="not-prose card my-8 grid items-center gap-6 p-6 sm:grid-cols-[auto_1fr]">
        <ScoreRing score={90} size={110} />
        <ScoreBars scores={{ "Stitch quality": 92, "Ease of use": 90, "Build & reliability": 88, "Features for the price": 91, "Owner satisfaction": 89 }} />
      </div>
      <p className="text-[0.95rem] text-ink-mute">Example score card, for illustration.</p>
      <ol>
        {criteria.map(([t, d]) => (
          <li key={t}><strong>{t}.</strong> {d}</li>
        ))}
      </ol>
      <p>Every part starts at 75 — a sound, current machine with nothing notable either way — and moves up or down only for documented evidence: a verified feature that matters at that price, or a pattern that keeps coming up in owner reports. If we don&apos;t have enough owner evidence for a machine, we don&apos;t give it a score.</p>

      <h2>What the numbers mean</h2>
      <ul>
        <li><strong>90 and up: Outstanding.</strong> Easy to recommend to the people it&apos;s meant for.</li>
        <li><strong>85–89: Excellent.</strong> A strong choice with a small trade-off or two.</li>
        <li><strong>80–84: Very good.</strong> Right for some sewists — worth comparing.</li>
        <li><strong>Below 80.</strong> We rarely recommend these, and we say why when we do.</li>
      </ul>

      <h2>What we never do</h2>
      <ul>
        <li>Accept payment for a place on a list or a better score.</li>
        <li>Rank a weaker machine higher because it pays a bigger commission.</li>
        <li>Show exact prices that go out of date — we use price bands and send you to the retailer for today&apos;s price.</li>
        <li>Leave old picks up when a model is discontinued or replaced.</li>
      </ul>
      <p>Spotted a mistake or have a question about a score? <Link href="/contact/">Tell us</Link> — we fix errors quickly.</p>
    </SimplePage>
  );
}
