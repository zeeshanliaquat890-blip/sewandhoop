/**
 * SEO titles and meta descriptions for every non-article page, in one place.
 * Titles are the whole <title> (30–60 characters, keyword first). Descriptions are 140–160 characters.
 * Articles carry their own `seoTitle` / `description` in frontmatter.
 */
export type SeoEntry = { title: string; description: string };

export const seoPages: Record<string, SeoEntry> = {
  "/": {
    title: "Sewing & Embroidery Machine Reviews | Sew & Hoop",
    description: "Honest, research-based reviews and buying guides for sewing machines, embroidery machines, sergers and quilting machines, plus free tools for US sewists.",
  },
  "/sewing-machines/": {
    title: "Sewing Machine Reviews & Buying Guides | Sew & Hoop",
    description: "Find the right sewing machine: beginner picks, heavy-duty machines, comparisons and plain-English reviews, with Sew Scores and US price bands for every model.",
  },
  "/embroidery-machines/": {
    title: "Embroidery Machine Reviews & Buying Guides | Sew & Hoop",
    description: "Embroidery machines compared: hoop sizes, combo machines and multi-needle models for small businesses, with research-based Sew Scores and US price bands.",
  },
  "/sergers/": {
    title: "Serger & Overlocker Reviews and Guides | Sew & Hoop",
    description: "Do you need a serger? Our serger and overlocker guides explain what they do, which models suit beginners, and how to thread one without the frustration.",
  },
  "/quilting-machines/": {
    title: "Quilting Machine Reviews & Buying Guides | Sew & Hoop",
    description: "Quilting machines explained: throat space, walking feet and stitch regulation, plus the sewing and long-arm machines quilters keep, with US price bands.",
  },
  "/accessories/": {
    title: "Sewing Accessories & Supplies Guides | Sew & Hoop",
    description: "Needles, thread, stabilizer, presser feet and bobbins: practical guides to the sewing and embroidery supplies that make the biggest difference to results.",
  },
  "/troubleshooting/": {
    title: "Sewing Machine Troubleshooting & Care | Sew & Hoop",
    description: "Fix skipped stitches, thread nests, tension loops and jams with calm step-by-step guides, plus simple cleaning and care to keep your sewing machine running.",
  },
  "/tools/": {
    title: "Free Sewing & Embroidery Calculators | Sew & Hoop",
    description: "Free sewing tools: a machine finder, fabric yardage calculator, thread color converter, embroidery pricing calculator, troubleshooting wizard and more.",
  },
  "/tools/machine-finder/": {
    title: "Sewing Machine Finder: Which Machine Should I Buy?",
    description: "Answer four quick questions about what you sew, your experience and budget, and get the type of sewing machine that fits, the features to look for and more.",
  },
  "/tools/thread-color-converter/": {
    title: "Embroidery Thread Color Converter & Chart (Free)",
    description: "Convert embroidery thread colors between Madeira, Isacord, Robison-Anton, Brother, Sulky, Floriani and Janome, or match any color to the nearest thread.",
  },
  "/tools/needle-thread-selector/": {
    title: "Sewing Machine Needle & Thread Chart by Fabric",
    description: "Pick your fabric and get the right sewing machine needle type and size, thread, stitch length and presser foot, with tips to stop skipped stitches and puckers.",
  },
  "/tools/machine-comparison/": {
    title: "Compare Sewing Machines Side by Side (Free Tool)",
    description: "Compare two sewing or embroidery machines side by side: Sew Score, stitches, speed, throat space, weight, features and warranty, with the better spec marked.",
  },
  "/tools/embroidery-pricing-calculator/": {
    title: "Embroidery Pricing Calculator: Price per 1,000 Stitches",
    description: "Price embroidery jobs by stitch count with a minimum charge, blank costs, markup, setup fees and quantity discounts, and see your earnings per machine hour.",
  },
  "/tools/fabric-yardage-calculator/": {
    title: "Fabric Yardage Calculator: Pieces, Backing & Binding",
    description: "Work out how much fabric to buy from your pattern pieces, or calculate quilt backing and binding yardage for any fabric width, rounded up to the nearest ⅛ yard.",
  },
  "/tools/stitch-count-estimator/": {
    title: "Embroidery Stitch Count Calculator & Time Estimator",
    description: "Estimate an embroidery design's stitch count from its size and fill style, and how long it takes to stitch on your machine, before you digitize or send a quote.",
  },
  "/tools/troubleshooting-wizard/": {
    title: "Sewing Machine Troubleshooting Wizard: Step-by-Step",
    description: "Thread bunching, skipped stitches, breaking needles or tension loops? Pick the problem and fix your sewing machine one step at a time, most likely cause first.",
  },
  "/about/": {
    title: "About Sew & Hoop: Who We Are and How We Work",
    description: "Sew & Hoop is an independent sewing and embroidery machine guide for US sewists. Meet the team, see what we cover, and learn how the site is funded honestly.",
  },
  "/how-we-review/": {
    title: "How We Research & Score Sewing Machines",
    description: "How Sew & Hoop chooses and compares sewing, embroidery and quilting machines, the sources we trust, and exactly how the research-based Sew Score is calculated.",
  },
  "/contact/": {
    title: "Contact Us: Questions and Corrections | Sew & Hoop",
    description: "Get in touch with the Sew & Hoop team about a machine question, a correction or working with us. We read every message and usually reply within two days.",
  },
  "/affiliate-disclosure/": {
    title: "Affiliate Disclosure | Sew & Hoop",
    description: "How Sew & Hoop earns money through Amazon Associates and other affiliate links, and why commissions never decide which sewing machines we recommend to you.",
  },
  "/privacy-policy/": {
    title: "Privacy Policy and Cookies | Sew & Hoop",
    description: "Read the Sew & Hoop privacy policy: what information we collect when you visit, how cookies and affiliate links work, and the choices and rights you have.",
  },
  "/terms-and-conditions/": {
    title: "Terms & Conditions | Sew & Hoop",
    description: "The terms for using Sew & Hoop: information-only content, sewing machine safety, affiliate links and prices, our free tools, and our intellectual property.",
  },
};

export function seoFor(path: string): SeoEntry {
  const e = seoPages[path];
  if (!e) throw new Error(`No SEO entry for ${path} in lib/seo-pages.ts`);
  return e;
}
