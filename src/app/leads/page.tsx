import { LeadList } from "@/components/leads/LeadList";
import { getLeads } from "@/lib/leads";

export default async function LeadsPage() {
  const leads = await getLeads();

  return (
    <div className="mx-auto max-w-3xl px-6 py-12 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold">Leads</h1>
        <p className="text-muted-foreground">
          Clínicas y laboratorios que solicitaron información, con su estado de consentimiento de
          marketing por canal.
        </p>
      </div>
      <LeadList leads={leads} />
    </div>
  );
}
