---
name: contact-info-page
description: Crea la página /contacto de Centinela Dental con datos de contacto (dirección, teléfono, correo, horario) y un formulario ligero de "contáctanos" — usar cuando se pida "página de contacto", "información de contacto" o "cómo nos contactan".
---

## Contexto

No existe todavía `src/app/contacto/`. Patrón de página de este repo (ver `src/app/inbox/page.tsx`):
server component async con shell `<div className="mx-auto max-w-3xl px-6 py-12 space-y-6">`.

**Alcance de esta skill vs. otra skill en paralelo**: esta página es solo información de contacto +
un formulario LIGERO tipo "contáctanos" (nombre, correo, mensaje). Un formulario completo de captura de
leads con consentimiento de marketing, integración a CRM, etc. es responsabilidad de otra skill
(`leads-marketing-campaigns`), que se está desarrollando en paralelo en el repo backend
(`centinela-backend`). NO dupliques esa lógica aquí: no agregues checkbox de consentimiento de
marketing, ni campos de segmentación, ni intentes conectar a un CRM. Si esa skill ya existe cuando
implementes esta, revisa si expone un componente de formulario reutilizable y enlázalo o reutilízalo en
esta página en vez de construir uno nuevo desde cero; si no existe todavía, construye el formulario
ligero descrito abajo y déjalo documentado como candidato a reemplazar más adelante.

No hay ningún endpoint de backend para contacto/leads todavía (`grep` sobre `centinela-backend` no
encontró nada relacionado con "lead" al momento de escribir esta skill, y `src/lib/graphql-client.ts`
solo apunta al gateway de catálogo/inbox/chat). Por eso el formulario de esta skill NO debe asumir una
mutación GraphQL real — implementa el envío como una Route Handler local simple que por ahora solo
valida y responde éxito (stub), dejando un comentario claro de dónde conectar el backend real cuando
exista.

## Pasos

1. **Crear `src/app/contacto/page.tsx`** (server component, contiene los datos estáticos y monta el
   formulario cliente):
   ```tsx
   import { MapPin, Phone, Mail, Clock } from "lucide-react";
   import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
   import { ContactForm } from "@/components/contact/ContactForm";

   const BRAND_NAME = process.env.BRAND_NAME ?? "Centinela Dental";

   export default function ContactPage() {
     return (
       <div className="mx-auto max-w-3xl px-6 py-12 space-y-8">
         <div className="space-y-2">
           <h1 className="text-3xl font-semibold">Contacto</h1>
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
               Bogotá, Colombia
               {/* Reemplazar con la dirección real de la sede/bodega antes de publicar */}
             </CardContent>
           </Card>
           <Card>
             <CardHeader className="flex flex-row items-center gap-2 space-y-0">
               <Phone className="h-5 w-5 text-primary" />
               <CardTitle className="text-base">Teléfono</CardTitle>
             </CardHeader>
             <CardContent className="text-sm text-muted-foreground">
               +57 300 000 0000
               {/* Reemplazar con el número real */}
             </CardContent>
           </Card>
           <Card>
             <CardHeader className="flex flex-row items-center gap-2 space-y-0">
               <Mail className="h-5 w-5 text-primary" />
               <CardTitle className="text-base">Correo</CardTitle>
             </CardHeader>
             <CardContent className="text-sm text-muted-foreground">
               contacto@centineladental.co
               {/* Reemplazar con el correo real */}
             </CardContent>
           </Card>
           <Card>
             <CardHeader className="flex flex-row items-center gap-2 space-y-0">
               <Clock className="h-5 w-5 text-primary" />
               <CardTitle className="text-base">Horario de atención</CardTitle>
             </CardHeader>
             <CardContent className="text-sm text-muted-foreground">
               Lunes a viernes, 8:00 a.m. – 6:00 p.m. Sábados, 8:00 a.m. – 1:00 p.m.
               {/* Reemplazar con el horario real */}
             </CardContent>
           </Card>
         </div>

         <div className="space-y-2">
           <h2 className="text-xl font-semibold">Escríbenos</h2>
           <p className="text-sm text-muted-foreground">
             Para consultas comerciales rápidas, también puedes usar el asistente de {BRAND_NAME} con
             el botón de chat.
           </p>
           <ContactForm />
         </div>
       </div>
     );
   }
   ```
   Los datos de dirección/teléfono/correo/horario son PLACEHOLDERS — señálalos con comentario y pide al
   usuario los datos reales antes de publicar a producción; no los inventes como definitivos.

2. **Crear el formulario cliente** en `src/components/contact/ContactForm.tsx`:
   ```tsx
   "use client";

   import { useState, type FormEvent } from "react";
   import { Input } from "@/components/ui/input";
   import { Textarea } from "@/components/ui/textarea";
   import { Button } from "@/components/ui/button";

   export function ContactForm() {
     const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

     async function handleSubmit(event: FormEvent<HTMLFormElement>) {
       event.preventDefault();
       setStatus("sending");
       const formData = new FormData(event.currentTarget);
       try {
         const response = await fetch("/api/contact", {
           method: "POST",
           headers: { "content-type": "application/json" },
           body: JSON.stringify({
             name: formData.get("name"),
             email: formData.get("email"),
             message: formData.get("message"),
           }),
         });
         if (!response.ok) throw new Error("request failed");
         setStatus("sent");
         event.currentTarget.reset();
       } catch {
         setStatus("error");
       }
     }

     if (status === "sent") {
       return (
         <p className="rounded-md bg-accent px-4 py-3 text-sm text-accent-foreground">
           Gracias, recibimos tu mensaje. Te responderemos pronto.
         </p>
       );
     }

     return (
       <form onSubmit={handleSubmit} className="space-y-3">
         <Input name="name" placeholder="Nombre" required />
         <Input name="email" type="email" placeholder="Correo" required />
         <Textarea name="message" placeholder="Tu mensaje" rows={4} required />
         <Button type="submit" disabled={status === "sending"}>
           {status === "sending" ? "Enviando…" : "Enviar mensaje"}
         </Button>
         {status === "error" && (
           <p className="text-sm text-destructive">
             No pudimos enviar tu mensaje. Intenta de nuevo o escríbenos por correo directamente.
           </p>
         )}
       </form>
     );
   }
   ```
   El `Button` aquí es `type="submit"` dentro de un `<form>` nativo — no lleva `render` ni
   `nativeButton`, esas props solo aplican cuando el Button se renderiza como OTRO elemento (ej. `Link`).

3. **Crear el stub de backend** en `src/app/api/contact/route.ts` (sigue el patrón ya usado en
   `src/app/api/chat/route.ts` y `src/app/api/inbox/[ticketId]/resolve/route.ts` — Route Handlers dentro
   de `src/app/api/`):
   ```tsx
   import { NextResponse } from "next/server";

   export async function POST(request: Request) {
     const body = await request.json();
     if (!body?.name || !body?.email || !body?.message) {
       return NextResponse.json({ error: "Missing fields" }, { status: 400 });
     }

     // TODO: conectar a un endpoint real (CRM, correo transaccional, o el mutation de
     // leads-marketing-campaigns cuando esa skill/backend exista). Por ahora solo confirma recepción.
     console.log("[contacto] nuevo mensaje", body);

     return NextResponse.json({ ok: true });
   }
   ```

4. **Agregar el link en el FOOTER** de `src/app/layout.tsx`, siguiendo el mismo patrón de nav de links
   descrito en la skill `faq-page` (fila `<nav>` dentro del `<footer>`). Si esa fila ya existe (porque
   `faq-page` o `policies-page` se implementó antes), solo agrega `<Link href="/contacto">Contacto</Link>`
   a la lista existente — no crees una segunda fila de links ni dupliques el `<footer>`.

## Gotchas

- No implementes aquí un checkbox de "acepto recibir comunicaciones de marketing" ni nada de
  segmentación de leads — eso vive en la skill `leads-marketing-campaigns` del repo backend.
- Los datos de dirección/teléfono/horario son placeholders explícitos; no los publiques como reales sin
  confirmarlos con el usuario.
- Si al implementar esta skill ya existe `src/app/api/contact/route.ts` o `ContactForm.tsx` (por ejemplo
  porque `leads-marketing-campaigns` ya corrió), no los sobrescribas — revisa qué expone esa integración y
  reutilízala en vez de crear un formulario paralelo.
