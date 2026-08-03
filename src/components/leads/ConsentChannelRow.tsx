"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ConsentChannelRow({
  leadId,
  channel,
  label,
  granted,
  grantedAt,
}: {
  leadId: string;
  channel: "email" | "sms" | "whatsapp";
  label: string;
  granted: boolean;
  grantedAt: string | null;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleRevoke = () => {
    setError(null);
    startTransition(async () => {
      const response = await fetch(`/api/leads/${leadId}/consent/revoke`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ channel }),
      });
      if (!response.ok) {
        setError("No se pudo revocar el consentimiento. Intenta de nuevo.");
        return;
      }
      router.refresh();
    });
  };

  return (
    <div className="flex items-center justify-between gap-3 rounded-md border px-3 py-2 text-sm">
      <div className="flex items-center gap-2">
        {granted ? (
          <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
        ) : (
          <XCircle className="h-4 w-4 shrink-0 text-muted-foreground" />
        )}
        <div>
          <p>{label}</p>
          {granted && grantedAt && (
            <p className="text-xs text-muted-foreground">
              Otorgado {new Date(grantedAt).toLocaleString("es-CO")}
            </p>
          )}
        </div>
      </div>
      {granted && (
        <Button size="sm" variant="ghost" onClick={handleRevoke} disabled={isPending}>
          Revocar
        </Button>
      )}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
