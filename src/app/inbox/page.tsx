import { TicketList } from "@/components/inbox/TicketList";
import { getEscalationTickets } from "@/lib/inbox";

export default async function InboxPage() {
  const tickets = await getEscalationTickets();

  return (
    <div className="mx-auto max-w-3xl px-6 py-12 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold">Inbox de escalaciones</h1>
        <p className="text-muted-foreground">
          Conversaciones que el asistente no pudo resolver o que el comprador pidió hablar con una
          persona.
        </p>
      </div>
      <TicketList tickets={tickets} />
    </div>
  );
}
