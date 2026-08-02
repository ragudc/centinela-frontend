import Link from "next/link";
import { PackageCheck } from "lucide-react";
import { formatCOP } from "@/lib/format";
import type { ProductRecommendation } from "@/lib/types";

export function ProductCard({ recommendation }: { recommendation: ProductRecommendation }) {
  return (
    <Link
      href={`/catalog/product/${recommendation.sku}`}
      className="mt-2 flex items-start gap-2 rounded-lg border bg-accent/50 p-3 text-sm hover:border-primary"
    >
      <PackageCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
      <div className="space-y-1">
        <p className="font-medium">{recommendation.name ?? recommendation.sku}</p>
        {recommendation.priceCOP != null && (
          <p className="text-muted-foreground">{formatCOP(recommendation.priceCOP)}</p>
        )}
        <p className="text-xs text-muted-foreground">{recommendation.reason}</p>
      </div>
    </Link>
  );
}
