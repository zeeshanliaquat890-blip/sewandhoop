/**
 * SITE CONFIG — every site-wide setting lives here.
 * The Amazon tag is ONLY defined in this file. Never hard-code it anywhere else.
 */

export const siteConfig = {
  name: "Sew & Hoop",
  shortName: "Sew & Hoop",
  url: "https://sewandhoop.com",
  tagline: "Machine advice from people who sew",
  description:
    "Plain-spoken buying guides, reviews and how-tos for sewing machines, embroidery machines, sergers and quilting machines — written for home sewists in the USA.",
  locale: "en_US",

  /**
   * SEARCH ENGINE INDEXING SWITCH
   * false = whole site is hidden from Google (noindex meta tag + X-Robots-Tag header + robots.txt note).
   * Set to true when the site is ready to launch, then push.
   */
  allowIndexing: true,
  /** Sew Score (0–100 rating). Paused by the owner: false hides every score and score claim on the site. */
  showSewScore: false,
  /** Owner's request: switch indexing on automatically when the first real article goes live (one time only). */
  autoEnableIndexingAfterFirstArticle: false,
  language: "en-US",

  amazon: {
    tag: "3183104200-20",
    domain: "www.amazon.com",
  },

  author: {
    name: "The Sew & Hoop Editors",
    url: "/about/",
    bio: "We're a small team of home sewists and embroiderers. We check every spec against the manufacturer's manual, read years of owner reports and explain it plainly, so you don't buy the wrong machine.",
  },

  contact: {
    email: "hello@sewandhoop.com",
  },

  social: {
    pinterest: "",
    youtube: "",
    facebook: "",
    instagram: "",
  } as Record<string, string>,

  /** Optional: an endpoint that receives affiliate click beacons (leave empty to disable). */
  analytics: {
    affiliateClickEndpoint: "",
  },

  /** The 6 silos (hubs). `slug` must match `hub_it_links_to` in data/url-map.csv */
  silos: [
    {
      slug: "sewing-machines",
      name: "Sewing Machines",
      short: "Sewing",
      description: "Buying guides, reviews and head-to-head comparisons for every kind of sewist, from first-timers to garment makers.",
      icon: "sewing",
    },
    {
      slug: "embroidery-machines",
      name: "Embroidery Machines",
      short: "Embroidery",
      description: "Single-needle home machines, combo machines and multi-needle workhorses for small embroidery businesses.",
      icon: "embroidery",
    },
    {
      slug: "sergers",
      name: "Sergers & Overlockers",
      short: "Sergers",
      description: "When you need a serger, which one to buy, and how to stop being scared of threading it.",
      icon: "serger",
    },
    {
      slug: "quilting-machines",
      name: "Quilting Machines",
      short: "Quilting",
      description: "Throat space, feed systems and stitch regulation explained, plus the machines quilters actually keep.",
      icon: "quilting",
    },
    {
      slug: "accessories",
      name: "Accessories & Supplies",
      short: "Accessories",
      description: "Needles, thread, stabilizer, feet and the small supplies that make a big difference.",
      icon: "accessories",
    },
    {
      slug: "troubleshooting",
      name: "Troubleshooting & Care",
      short: "Fix & Care",
      description: "Skipped stitches, bird's nests and tension trouble: calm, step-by-step fixes and simple maintenance.",
      icon: "troubleshooting",
    },
  ],

  /** The 8 tools. Each has a React component in components/tools/ registered in components/tools/registry.tsx */
  tools: [
    { slug: "machine-finder", name: "Machine Finder", silo: "sewing-machines", description: "Tell us your budget and projects, get a shortlist of machines that fit." },
    { slug: "thread-color-converter", name: "Thread Color Converter", silo: "embroidery-machines", description: "Convert embroidery thread colors between the major thread brands." },
    { slug: "needle-thread-selector", name: "Needle & Thread Selector", silo: "accessories", description: "Pick a fabric, get the right needle, thread weight and tension starting point." },
    { slug: "machine-comparison", name: "Machine Comparison", silo: "sewing-machines", description: "Put two machines side by side and compare the specs that matter." },
    { slug: "embroidery-pricing-calculator", name: "Embroidery Pricing Calculator", silo: "embroidery-machines", description: "Price embroidery jobs from stitch count, thread changes and blanks." },
    { slug: "fabric-yardage-calculator", name: "Fabric Yardage Calculator", silo: "accessories", description: "Work out how much fabric to buy for your project and fabric width." },
    { slug: "stitch-count-estimator", name: "Stitch Count & Time Estimator", silo: "embroidery-machines", description: "Estimate stitch count and run time for an embroidery design." },
    { slug: "troubleshooting-wizard", name: "Troubleshooting Wizard", silo: "troubleshooting", description: "Pick the symptom, follow the steps, fix the machine." },
  ],

  /** Main navigation (header). */
  nav: [
    { label: "Sewing Machines", href: "/sewing-machines/" },
    { label: "Embroidery", href: "/embroidery-machines/" },
    { label: "Sergers", href: "/sergers/" },
    { label: "Quilting", href: "/quilting-machines/" },
    { label: "Accessories", href: "/accessories/" },
    { label: "Fix & Care", href: "/troubleshooting/" },
    { label: "Tools", href: "/tools/" },
  ],
} as const;

export type Silo = (typeof siteConfig.silos)[number];
export type Tool = (typeof siteConfig.tools)[number];
export type SiloIconName = Silo["icon"];
