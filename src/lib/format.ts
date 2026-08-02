export function formatCOP(amount: number): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(amount);
}

export const STOCK_LABEL: Record<string, string> = {
  IN_STOCK: "Disponible",
  LOW_STOCK: "Pocas unidades",
  OUT_OF_STOCK: "Agotado",
};
