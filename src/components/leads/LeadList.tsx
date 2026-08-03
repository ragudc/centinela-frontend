import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Lead } from "@/lib/types";

const STATUS_VARIANT: Record<Lead["status"], "default" | "secondary" | "destructive"> = {
  NEW: "default",
  CONTACTED: "secondary",
  QUALIFIED: "secondary",
  CONVERTED: "secondary",
  DISQUALIFIED: "destructive",
};

const STATUS_LABEL: Record<Lead["status"], string> = {
  NEW: "Nuevo",
  CONTACTED: "Contactado",
  QUALIFIED: "Calificado",
  CONVERTED: "Convertido",
  DISQUALIFIED: "Descartado",
};

export function LeadList({ leads }: { leads: Lead[] }) {
  if (leads.length === 0) {
    return <p className="text-sm text-muted-foreground">No hay leads registrados.</p>;
  }

  return (
    <div className="space-y-3">
      {leads.map((lead) => (
        <Link key={lead.id} href={`/leads/${lead.id}`}>
          <Card className="transition-colors hover:border-primary">
            <CardHeader className="flex flex-row items-start justify-between space-y-0">
              <div className="space-y-1">
                <CardTitle className="text-base">{lead.fullName}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {lead.company ?? "Sin clínica/laboratorio registrado"}
                </p>
              </div>
              <Badge variant={STATUS_VARIANT[lead.status]}>{STATUS_LABEL[lead.status]}</Badge>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground">
              Creado {new Date(lead.createdAt).toLocaleString("es-CO")}
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
