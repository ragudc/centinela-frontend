import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatCOP, STOCK_LABEL } from "@/lib/format";
import { getProductBySku } from "@/lib/catalog";

const STOCK_VARIANT: Record<string, "default" | "secondary" | "destructive"> = {
  IN_STOCK: "secondary",
  LOW_STOCK: "default",
  OUT_OF_STOCK: "destructive",
};

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ sku: string }>;
}) {
  const { sku } = await params;
  const product = await getProductBySku(sku);
  if (!product) notFound();

  return (
    <div className="mx-auto max-w-3xl px-6 py-12 space-y-6">
      <Link
        href={`/catalog/${product.category.slug}`}
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        {product.category.name}
      </Link>

      <div className="relative mx-auto aspect-square w-full max-w-[300px] overflow-hidden rounded-lg bg-muted">
        <Image
          src={product.imageUrl ?? "/products/placeholder.jpg"}
          alt={product.name}
          fill
          priority
          sizes="300px"
          className="object-cover"
        />
      </div>

      <div className="space-y-3">
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-3xl font-semibold">{product.name}</h1>
          <Badge variant={STOCK_VARIANT[product.stockStatus]} className="shrink-0">
            {STOCK_LABEL[product.stockStatus]}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          SKU: {product.sku} · Línea: {product.brandLine}
        </p>
        <p className="text-2xl font-semibold">{formatCOP(product.price.amount)}</p>
      </div>

      <Separator />

      <div className="space-y-2">
        <h2 className="font-medium">Descripción</h2>
        <p className="text-muted-foreground">{product.description}</p>
      </div>

      <div className="space-y-2">
        <h2 className="font-medium">Indicaciones</h2>
        <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
          {product.indications.map((indication) => (
            <li key={indication}>{indication}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
