"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Loader2, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import type { LeadSource } from "@/lib/types";

// Versión del texto de política de tratamiento de datos aceptado — súbela cuando cambie
// el texto legal, para que los leads capturados con la versión vieja queden trazables.
const CONSENT_TEXT_VERSION = "2026-08-v1";

// TODO: la skill `policies-page` (centinela-frontend/.claude/skills/policies-page) puede
// crear una página real de políticas de tratamiento de datos — cuando exista, reemplaza
// este placeholder por su ruta real.
const DATA_POLICY_URL = "/politicas-de-tratamiento-de-datos";

interface LeadCaptureFormProps {
  /** Identifica el punto de integración para consentSource, ej. "web_form:home_hero",
   * "web_form:cotizacion". Debe ser único por lugar donde se monta este formulario. */
  consentSource: string;
  source?: LeadSource;
  title?: string;
  description?: string;
}

export function LeadCaptureForm({
  consentSource,
  source = "WEB",
  title = "Solicitar información",
  description = "Cuéntanos sobre tu clínica o laboratorio y nuestro equipo te contacta.",
}: LeadCaptureFormProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [notes, setNotes] = useState("");
  const [consentEmail, setConsentEmail] = useState(false);
  const [consentSms, setConsentSms] = useState(false);
  const [consentWhatsapp, setConsentWhatsapp] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          fullName,
          email: email || undefined,
          phone: phone || undefined,
          company: company || undefined,
          notes: notes || undefined,
          source,
          consentEmail,
          consentSms,
          consentWhatsapp,
          consentSource,
          consentTextVersion: CONSENT_TEXT_VERSION,
        }),
      });
      if (!response.ok) throw new Error("request failed");
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <div className="flex items-start gap-2 rounded-lg border bg-accent/50 p-4 text-sm">
        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
        <p>Gracias, recibimos tu solicitud. Un asesor de Centinela Dental te contactará pronto.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1">
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="lead-fullName">Nombre completo</Label>
        <Input
          id="lead-fullName"
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
          required
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="lead-email">Correo</Label>
          <Input
            id="lead-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lead-phone">Teléfono / WhatsApp</Label>
          <Input
            id="lead-phone"
            type="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="lead-company">Clínica o laboratorio</Label>
        <Input
          id="lead-company"
          value={company}
          onChange={(event) => setCompany(event.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="lead-notes">Mensaje</Label>
        <Textarea
          id="lead-notes"
          rows={3}
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
        />
      </div>

      {/* Consentimiento explícito por canal — nunca pre-marcado (Ley 1581 de 2012). */}
      <div className="space-y-2 rounded-lg border p-3">
        <p className="text-xs font-medium text-muted-foreground">
          ¿Cómo prefieres que te contactemos con novedades y promociones?
        </p>
        <div className="flex items-center gap-2">
          <Checkbox
            id="lead-consent-email"
            checked={consentEmail}
            onCheckedChange={(checked) => setConsentEmail(checked === true)}
          />
          <Label htmlFor="lead-consent-email" className="text-sm font-normal">
            Acepto recibir novedades por correo
          </Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            id="lead-consent-sms"
            checked={consentSms}
            onCheckedChange={(checked) => setConsentSms(checked === true)}
          />
          <Label htmlFor="lead-consent-sms" className="text-sm font-normal">
            Acepto recibir novedades por SMS
          </Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            id="lead-consent-whatsapp"
            checked={consentWhatsapp}
            onCheckedChange={(checked) => setConsentWhatsapp(checked === true)}
          />
          <Label htmlFor="lead-consent-whatsapp" className="text-sm font-normal">
            Acepto recibir novedades por WhatsApp
          </Label>
        </div>
        <p className="text-xs text-muted-foreground">
          Puedes revocar este consentimiento en cualquier momento. Consulta nuestra{" "}
          <Link href={DATA_POLICY_URL} className="underline hover:text-foreground">
            política de tratamiento de datos
          </Link>
          .
        </p>
      </div>

      {status === "error" && (
        <p className="text-sm text-destructive">
          No se pudo enviar tu solicitud. Intenta de nuevo.
        </p>
      )}

      <Button type="submit" disabled={status === "submitting"} className="w-full sm:w-auto">
        {status === "submitting" && <Loader2 className="h-4 w-4 animate-spin" />}
        Enviar solicitud
      </Button>
    </form>
  );
}
