import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { EscalationTicket } from "@/lib/types";

const STATUS_VARIANT: Record<EscalationTicket["status"], "default" | "secondary" | "destructive"> = {
  OPEN: "destructive",
  ACKNOWLEDGED: "default",
  RESOLVED: "secondary",
};

const STATUS_LABEL: Record<EscalationTicket["status"], string> = {
  OPEN: "Abierto",
  ACKNOWLEDGED: "En atención",
  RESOLVED: "Resuelto",
};

export function TicketList({ tickets }: { tickets: EscalationTicket[] }) {
  if (tickets.length === 0) {
    return <p className="text-sm text-muted-foreground">No hay escalaciones registradas.</p>;
  }

  return (
    <div className="space-y-3">
      {tickets.map((ticket) => (
        <Link key={ticket.id} href={`/inbox/${ticket.id}`}>
          <Card className="transition-colors hover:border-primary">
            <CardHeader className="flex flex-row items-start justify-between space-y-0">
              <div className="space-y-1">
                <CardTitle className="text-base">
                  {ticket.conversation.customerName ?? "Cliente sin identificar"}
                </CardTitle>
                <p className="text-sm text-muted-foreground">{ticket.reason}</p>
              </div>
              <Badge variant={STATUS_VARIANT[ticket.status]}>{STATUS_LABEL[ticket.status]}</Badge>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground">
              Creado {new Date(ticket.createdAt).toLocaleString("es-CO")}
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
