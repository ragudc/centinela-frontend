import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ProductGrid } from "@/components/catalog/ProductGrid";
import { getCategories, getProducts } from "@/lib/catalog";

export default async function CatalogPage() {
  const [categories, products] = await Promise.all([getCategories(), getProducts()]);

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold">Catálogo completo</h1>
        <p className="text-muted-foreground">
          {products.length} productos de las líneas FGM Esthetics, FGM Implants, FGM Digital y FGM
          Home Care.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Link key={category.slug} href={`/catalog/${category.slug}`}>
            <Badge variant="outline" className="hover:border-primary">
              {category.name}
            </Badge>
          </Link>
        ))}
      </div>

      <ProductGrid products={products} />
    </div>
  );
}
