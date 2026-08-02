import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCOP, STOCK_LABEL } from "@/lib/format";
import type { Product } from "@/lib/types";

const STOCK_VARIANT: Record<Product["stockStatus"], "default" | "secondary" | "destructive"> = {
  IN_STOCK: "secondary",
  LOW_STOCK: "default",
  OUT_OF_STOCK: "destructive",
};

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/catalog/product/${product.sku}`}>
      <Card className="h-full transition-colors hover:border-primary">
        <CardHeader className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-base leading-snug">{product.name}</CardTitle>
            <Badge variant={STOCK_VARIANT[product.stockStatus]} className="shrink-0">
              {STOCK_LABEL[product.stockStatus]}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">{product.brandLine}</p>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
          <p className="text-lg font-semibold">{formatCOP(product.price.amount)}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
