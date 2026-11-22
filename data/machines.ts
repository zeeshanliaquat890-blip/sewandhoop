/**
 * MACHINE CATALOG — used by the Machine Comparison tool (and available to other tools).
 * Add one entry per machine you review. Only add specs you have checked against the
 * manufacturer's spec sheet or manual.
 *
 * The entries marked `demo: true` are placeholders so the tool can be tested.
 * Delete them once real machines are added.
 */
export type Machine = {
  id: string;
  name: string;
  type: "Mechanical" | "Computerized" | "Heavy-duty" | "Embroidery" | "Sewing & embroidery" | "Quilting" | "Serger";
  priceRange?: string;
  score?: number; // Sew Score 0–100
  stitches?: number;
  buttonhole?: "1-step" | "4-step" | "None";
  maxSpeed?: number; // stitches per minute
  throat?: number; // inches, needle to body
  weight?: number; // lb
  hoop?: string; // embroidery field, e.g. "4 × 4 in"
  autoThreader?: boolean;
  needleUpDown?: boolean;
  speedControl?: boolean;
  freeArm?: boolean;
  metalFrame?: boolean;
  warranty?: string;
  asin?: string;
  amazonQuery?: string;
  /** slug of our review or roundup for this machine */
  reviewSlug?: string;
  demo?: boolean;
};

export const machines: Machine[] = [
  { id: "demo-a", demo: true, name: "Demo Machine A — Computerized Starter", type: "Computerized", priceRange: "$200–$300", score: 94, stitches: 60, buttonhole: "1-step", maxSpeed: 850, throat: 6.3, weight: 13, autoThreader: true, needleUpDown: true, speedControl: true, freeArm: true, metalFrame: false, warranty: "25 yr limited", amazonQuery: "computerized sewing machine for beginners", reviewSlug: "best-sewing-machine-for-beginners" },
  { id: "demo-b", demo: true, name: "Demo Machine B — Budget Mechanical", type: "Mechanical", priceRange: "Under $150", score: 87, stitches: 23, buttonhole: "4-step", maxSpeed: 750, throat: 6, weight: 12, autoThreader: true, needleUpDown: false, speedControl: false, freeArm: true, metalFrame: false, warranty: "25 yr limited", amazonQuery: "mechanical sewing machine", reviewSlug: "best-sewing-machine-for-beginners" },
  { id: "demo-c", demo: true, name: "Demo Machine C — Heavy-Duty", type: "Heavy-duty", priceRange: "$150–$250", score: 89, stitches: 32, buttonhole: "1-step", maxSpeed: 1100, throat: 6.3, weight: 15, autoThreader: true, needleUpDown: false, speedControl: false, freeArm: true, metalFrame: true, warranty: "25 yr limited", amazonQuery: "heavy duty sewing machine", reviewSlug: "best-sewing-machine-for-beginners" },
  { id: "demo-d", demo: true, name: "Demo Machine D — Quiet Compact", type: "Mechanical", priceRange: "Under $120", score: 81, stitches: 12, buttonhole: "4-step", maxSpeed: 700, throat: 5.5, weight: 9, autoThreader: false, needleUpDown: false, speedControl: false, freeArm: true, metalFrame: false, warranty: "1 yr", amazonQuery: "compact sewing machine" },
];
