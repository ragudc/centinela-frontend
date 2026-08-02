import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { TicketTranscript } from "@/components/inbox/TicketTranscript";
import { ResolveTicketButton } from "@/components/inbox/ResolveTicketButton";
import { getEscalationTicket } from "@/lib/inbox";

export default async function TicketDetailPage({
  params,
}: {
  params: Promise<{ ticketId: string }>;
}) {
  const { ticketId } = await params;
  const ticket = await getEscalationTicket(ticketId);
  if (!ticket) notFound();

  return (
    <div className="mx-auto max-w-3xl px-6 py-12 space-y-6">
      <Link href="/inbox" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" />
        Inbox de escalaciones
      </Link>

      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold">
            {ticket.conversation.customerName ?? "Cliente sin identificar"}
          </h1>
          <p className="text-muted-foreground">{ticket.reason}</p>
        </div>
        <ResolveTicketButton ticketId={ticket.id} resolved={ticket.status === "RESOLVED"} />
      </div>

      <Separator />

      <TicketTranscript conversation={ticket.conversation} />
    </div>
  );
}
