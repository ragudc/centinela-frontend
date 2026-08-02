import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ProductGrid } from "@/components/catalog/ProductGrid";
import { getCategories, getProducts } from "@/lib/catalog";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: categorySlug } = await params;
  const categories = await getCategories();
  const category = categories.find((item) => item.slug === categorySlug);
  if (!category) notFound();

  const products = await getProducts(categorySlug);

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 space-y-8">
      <Link href="/catalog" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" />
        Todo el catálogo
      </Link>
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold">{category.name}</h1>
        <p className="text-muted-foreground">{category.description}</p>
      </div>
      <ProductGrid products={products} />
    </div>
  );
}
