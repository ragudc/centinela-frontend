import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LeadCaptureForm } from "@/components/leads/LeadCaptureForm";

const BRAND_NAME = process.env.BRAND_NAME ?? "Centinela Dental";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold">Información de contacto</h1>
        <p className="text-muted-foreground">
          ¿Tienes una consulta que nuestro asistente virtual no pudo resolver? Escríbenos
          directamente o comunícate por los siguientes canales.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center gap-2 space-y-0">
            <MapPin className="h-5 w-5 text-primary" />
            <CardTitle className="text-base">Dirección</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            {/* Placeholder — reemplazar con la dirección real de la sede/bodega antes de publicar */}
            Bogotá, Colombia
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center gap-2 space-y-0">
            <Phone className="h-5 w-5 text-primary" />
            <CardTitle className="text-base">Teléfono</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            {/* Placeholder — reemplazar con el número real */}
            +57 300 000 0000
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center gap-2 space-y-0">
            <Mail className="h-5 w-5 text-primary" />
            <CardTitle className="text-base">Correo</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            {/* Placeholder — reemplazar con el correo real */}
            contacto@centineladental.co
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center gap-2 space-y-0">
            <Clock className="h-5 w-5 text-primary" />
            <CardTitle className="text-base">Horario de atención</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            {/* Placeholder — reemplazar con el horario real */}
            Lunes a viernes, 8:00 a.m. – 6:00 p.m. Sábados, 8:00 a.m. – 1:00 p.m.
          </CardContent>
        </Card>
      </div>

      <div className="space-y-3">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">Escríbenos</h2>
          <p className="text-sm text-muted-foreground">
            Para consultas comerciales rápidas, también puedes usar el asistente de {BRAND_NAME} con
            el botón de chat.
          </p>
        </div>
        <Card>
          <CardContent className="pt-6">
            <LeadCaptureForm
              consentSource="web_form:contacto"
              title="Escríbenos"
              description="Cuéntanos qué necesitas y un asesor te contacta."
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
