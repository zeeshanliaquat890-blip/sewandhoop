/** Short on-page copy for each tool page: intro, how to use, and FAQ (also used for FAQPage schema). */
export type ToolContent = { intro: string; how: string[]; faq: { q: string; a: string }[] };

export const toolContent: Record<string, ToolContent> = {
  "machine-finder": {
    intro: "Answer four quick questions and get the type of machine that fits how you sew, the features worth paying for, and the ones you can skip.",
    how: ["Pick what you'll sew most.", "Tell us your experience and budget.", "Choose what matters most to you.", "Read your recommendation and jump to the matching buying guide."],
    faq: [
      { q: "What type of sewing machine should a beginner buy?", a: "Most beginners are happiest with a simple computerized machine with a one-step buttonhole, automatic needle threader and speed control. If your budget is under $200 and you mainly mend and hem, a mechanical machine is a great, durable choice." },
      { q: "Do I need a special machine for quilting?", a: "You can piece quilts on almost any machine. For quilting larger quilts you'll want more throat space (the gap to the right of the needle), a walking foot, needle up/down and a large extension table." },
    ],
  },
  "thread-color-converter": {
    intro: "Convert embroidery thread colors between Madeira, Isacord, Robison-Anton, Brother, Sulky, Floriani and Janome — or match any color to the closest thread in each brand.",
    how: ["Choose the thread brand you have and type its number (or a color name).", "See the closest match in every other brand, with how close each one is.", "Or switch to “Match any color” and pick a color or paste a hex code."],
    faq: [
      { q: "How accurate are thread color conversions?", a: "Conversions compare published color values using the CIEDE2000 formula, which is how color scientists measure visible difference. “Near-exact” and “Close match” results are usually hard to tell apart on fabric, but dye lots and screens vary, so check real spools for logo work." },
      { q: "Can I mix rayon and polyester embroidery thread in one design?", a: "Yes. 40 wt rayon and 40 wt polyester stitch out at a similar thickness. Polyester is more colorfast and stands up better to bleach, which is why it's popular for workwear and kids' clothes." },
    ],
  },
  "needle-thread-selector": {
    intro: "Pick your fabric and get the right needle type and size, thread, stitch length and presser foot — plus the tips that stop skipped stitches and puckering.",
    how: ["Choose the fabric you're sewing.", "Choose seams or topstitching.", "Use the result as your starting point and sew a test seam on a scrap."],
    faq: [
      { q: "What do needle sizes like 80/12 mean?", a: "The first number is the European metric size and the second is the US size. Both measure thickness: the bigger the number, the thicker the needle. 70/10 suits light fabric, 80/12 medium, 90/14 to 110/18 heavy fabric." },
      { q: "How often should I change my sewing machine needle?", a: "About every 8 hours of sewing, at the start of every big project, and any time you hear a popping sound or see skipped stitches." },
    ],
  },
  "machine-comparison": {
    intro: "Put two machines side by side and see which one wins on the specs that actually matter — stitches, speed, throat space, weight and features.",
    how: ["Choose the first machine.", "Choose the second machine.", "Green cells show the better spec. Read our full review before you decide."],
    faq: [
      { q: "Is a machine with more stitches better?", a: "Not usually. Most people use straight stitch, zigzag, a stretch stitch and a buttonhole. Build quality, feeding and ease of use matter far more than the stitch count." },
      { q: "What is throat space?", a: "The horizontal distance between the needle and the body of the machine. More throat space makes it easier to push bulky projects like quilts through." },
    ],
  },
  "embroidery-pricing-calculator": {
    intro: "Price embroidery jobs the way most shops do — per 1,000 stitches with a minimum charge — then add blanks, setup fees and quantity discounts, and see how much you earn per machine hour.",
    how: ["Enter the stitch count from your design file.", "Set your price per 1,000 stitches and minimum charge.", "Add the blank cost, markup, quantity and any setup fee.", "Copy the per-piece price and order total into your quote."],
    faq: [
      { q: "How much should I charge per 1,000 stitches?", a: "Many home and small shops charge between $0.75 and $1.50 per 1,000 stitches, with a minimum charge per piece of around $5–$10. Check local competitors and make sure the result covers your time." },
      { q: "Should I charge a digitizing fee?", a: "Usually, yes. Digitizing a logo takes time or costs money if you outsource it. Many shops charge a one-time fee and waive it for repeat orders of the same design." },
    ],
  },
  "fabric-yardage-calculator": {
    intro: "Work out how much fabric to buy from your pattern pieces, or calculate quilt backing and binding — rounded up to the nearest ⅛ yard.",
    how: ["Choose the fabric width printed on the bolt.", "Enter each piece you need to cut (with seam allowance), or your quilt size.", "Add shrinkage for cotton you plan to pre-wash.", "Buy the yardage shown — it's already rounded up."],
    faq: [
      { q: "How much fabric do I need for a quilt back?", a: "Add about 4 inches on every side of the quilt top. If that's wider than your fabric, you'll sew two or three lengths together — or use 108-inch wide backing fabric to avoid seams." },
      { q: "How much shrinkage should I allow for cotton?", a: "Quilting cotton and linen typically shrink around 3–5% when washed. Polyester and most synthetics shrink very little." },
    ],
  },
  "stitch-count-estimator": {
    intro: "Estimate an embroidery design's stitch count from its size and style, and how long it will take to run — before you digitize or quote.",
    how: ["Enter the design's width and height.", "Estimate how much of that box is actually stitched.", "Pick the style (outline, satin/text, light or full fill).", "Add colors, machine speed and quantity for the time estimate."],
    faq: [
      { q: "How many stitches is a left-chest logo?", a: "A typical 3.5 × 2.5 inch left-chest logo is often around 5,000–10,000 stitches, depending on how much is filled and how dense the digitizing is." },
      { q: "How many stitches per square inch is embroidery?", a: "As a rule of thumb, about 1,500–2,000 stitches per square inch for a solid fill, around 900 for satin and text, and much less for outline work." },
    ],
  },
  "troubleshooting-wizard": {
    intro: "Pick the problem — bird's nests, skipped stitches, thread breaking, tension loops, jams — and fix it one calm step at a time, most likely cause first.",
    how: ["Choose what's going wrong.", "Try the first fix and sew a test seam.", "Tap “Still happening” to move to the next most likely cause."],
    faq: [
      { q: "Why is my thread bunching under the fabric?", a: "Almost always because the top thread isn't seated in the tension discs. Raise the presser foot, remove the top thread completely and rethread. Sewing with the presser foot up causes the same problem." },
      { q: "Why does my sewing machine skip stitches?", a: "Usually a dull or bent needle, or the wrong needle type for the fabric — knits need a ballpoint or stretch needle. Change the needle first, then rethread." },
    ],
  },
};
