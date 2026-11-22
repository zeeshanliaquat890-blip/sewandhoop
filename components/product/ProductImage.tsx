import type { Product } from "@/lib/content";

/** Product photo, or a stitched placeholder until a real image is added. */
export function ProductImage({ product, className = "" }: { product: Pick<Product, "name" | "image">; className?: string }) {
  if (product.image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={product.image} alt={product.name} width={400} height={400} loading="lazy" decoding="async" className={`aspect-square w-full rounded-lg bg-white object-contain p-3 ${className}`} />
    );
  }
  return (
    <div className={`grid aspect-square w-full place-items-center rounded-lg bg-white ${className}`} style={{ outline: "2px dashed #ddd2c1", outlineOffset: "-4px" }} role="img" aria-label={`${product.name} (photo coming soon)`}>
      <svg viewBox="0 0 24 24" className="h-1/3 w-1/3 max-h-12 max-w-12 text-line" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M5 4h9M5 20h9M6.6 4v16M12.4 4v16" /><path d="m6.6 8 5.8 2.1M6.6 12l5.8 2.1M6.6 16l5.8 2.1" /><path d="M19.5 3 17 21" /></svg>
    </div>
  );
}
