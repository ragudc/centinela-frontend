"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ResolveTicketButton({ ticketId, resolved }: { ticketId: string; resolved: boolean }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  if (resolved) {
    return (
      <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
        <CheckCircle2 className="h-4 w-4" />
        Resuelto
      </span>
    );
  }

  const handleResolve = () => {
    setError(null);
    startTransition(async () => {
      const response = await fetch(`/api/inbox/${ticketId}/resolve`, { method: "POST" });
      if (!response.ok) {
        setError("No se pudo marcar como resuelto. Intenta de nuevo.");
        return;
      }
      router.refresh();
    });
  };

  return (
    <div className="flex flex-col items-end gap-1">
      <Button onClick={handleResolve} disabled={isPending} size="sm">
        <CheckCircle2 className="h-4 w-4" />
        Marcar como resuelto
      </Button>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
