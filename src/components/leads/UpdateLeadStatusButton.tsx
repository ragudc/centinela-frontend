"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { LeadStatus } from "@/lib/types";

const STATUS_OPTIONS: { value: LeadStatus; label: string }[] = [
  { value: "NEW", label: "Nuevo" },
  { value: "CONTACTED", label: "Contactado" },
  { value: "QUALIFIED", label: "Calificado" },
  { value: "CONVERTED", label: "Convertido" },
  { value: "DISQUALIFIED", label: "Descartado" },
];

const STATUS_LABEL: Record<LeadStatus, string> = Object.fromEntries(
  STATUS_OPTIONS.map((option) => [option.value, option.label]),
) as Record<LeadStatus, string>;

export function UpdateLeadStatusButton({ leadId, status }: { leadId: string; status: LeadStatus }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleChange = (value: LeadStatus | null) => {
    if (!value) return;
    setError(null);
    startTransition(async () => {
      const response = await fetch(`/api/leads/${leadId}/status`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ status: value }),
      });
      if (!response.ok) {
        setError("No se pudo actualizar el estado. Intenta de nuevo.");
        return;
      }
      router.refresh();
    });
  };

  return (
    <div className="flex flex-col items-end gap-1">
      <Select value={status} onValueChange={handleChange} disabled={isPending}>
        <SelectTrigger size="sm">
          <SelectValue>{(value: LeadStatus) => STATUS_LABEL[value]}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          {STATUS_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
