import type { Product } from "@/lib/content";
import { MachineIllustration } from "../Illustration";

/** Product photo, or an illustrated placeholder until a real image is added. */
export function ProductImage({ product, className = "", small = false }: { product: Pick<Product, "name" | "image">; className?: string; small?: boolean }) {
  if (product.image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={product.image} alt={product.name} width={400} height={400} loading="lazy" decoding="async" className={`aspect-square w-full rounded-lg bg-white object-contain p-3 ${className}`} />
    );
  }
  return (
    <div className={`grid aspect-square w-full place-items-center rounded-lg bg-gradient-to-b from-cream to-linen ${small ? "p-1.5" : "p-5"} ${className}`} role="img" aria-label={`${product.name} (photo coming soon)`}>
      <MachineIllustration className="w-full" />
    </div>
  );
}
