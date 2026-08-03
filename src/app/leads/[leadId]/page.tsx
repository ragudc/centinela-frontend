import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { UpdateLeadStatusButton } from "@/components/leads/UpdateLeadStatusButton";
import { ConsentChannelRow } from "@/components/leads/ConsentChannelRow";
import { getLead } from "@/lib/leads";

export default async function LeadDetailPage({
  params,
}: {
  params: Promise<{ leadId: string }>;
}) {
  const { leadId } = await params;
  const lead = await getLead(leadId);
  if (!lead) notFound();

  return (
    <div className="mx-auto max-w-3xl px-6 py-12 space-y-6">
      <Link href="/leads" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" />
        Leads
      </Link>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold">{lead.fullName}</h1>
          <p className="text-muted-foreground">
            {lead.company ?? "Sin clínica/laboratorio registrado"}
          </p>
        </div>
        <UpdateLeadStatusButton leadId={lead.id} status={lead.status} />
      </div>

      <Separator />

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1 text-sm">
          <p className="text-muted-foreground">Correo</p>
          <p>{lead.email ?? "—"}</p>
        </div>
        <div className="space-y-1 text-sm">
          <p className="text-muted-foreground">Teléfono</p>
          <p>{lead.phone ?? "—"}</p>
        </div>
      </div>

      {lead.notes && (
        <div className="space-y-1 text-sm">
          <p className="text-muted-foreground">Mensaje</p>
          <p>{lead.notes}</p>
        </div>
      )}

      <Separator />

      <div className="space-y-2">
        <h2 className="font-medium">Consentimiento de marketing por canal</h2>
        <div className="space-y-2">
          <ConsentChannelRow
            leadId={lead.id}
            channel="email"
            label="Correo"
            granted={lead.consentEmail}
            grantedAt={lead.consentEmailAt}
          />
          <ConsentChannelRow
            leadId={lead.id}
            channel="sms"
            label="SMS"
            granted={lead.consentSms}
            grantedAt={lead.consentSmsAt}
          />
          <ConsentChannelRow
            leadId={lead.id}
            channel="whatsapp"
            label="WhatsApp"
            granted={lead.consentWhatsapp}
            grantedAt={lead.consentWhatsappAt}
          />
        </div>
      </div>
    </div>
  );
}
