import { ProductCard } from "./ProductCard";
import type { Product } from "@/lib/types";

export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return <p className="text-sm text-muted-foreground">No hay productos en esta categoría todavía.</p>;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product, index) => (
        // First 6 cards are above the fold on both mobile (1 col) and desktop
        // (3 cols) — loading them eagerly avoids depending on the lazy-load
        // IntersectionObserver trigger firing, which is what was silently
        // failing (images never even attempted a network request).
        <ProductCard key={product.sku} product={product} priority={index < 6} />
      ))}
    </div>
  );
}
