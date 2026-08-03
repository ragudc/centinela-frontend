---
name: policies-page
description: Crea la página /politicas de Centinela Dental que renderiza el contenido REAL de las 4 políticas ya escritas en el backend (envíos, devoluciones/garantía, verificación de comprador profesional, términos de pago) usando Tabs de shadcn — usar cuando se pida "página de políticas", "términos y condiciones" o "políticas de envío/devolución/garantía/pago".
---

## Contexto

No existe todavía `src/app/politicas/`. Patrón de página de este repo: server component async con shell
`<div className="mx-auto max-w-3xl px-6 py-12 space-y-6">`.

**Esto es crítico y es la razón de ser de esta skill**: el asistente de IA de Centinela ya responde
preguntas de clientes citando 4 documentos reales que viven en el repo BACKEND (no en este repo):
```
/Users/ragudc/Desktop/Roberto/rutan/centinela-backend/apps/engagement-service/seed/policies/
  shipping-policy.md
  returns-warranty.md
  professional-buyer-verification.md
  payment-terms.md
```
Esos 4 archivos son la base de conocimiento del asistente. La página `/politicas` de este frontend debe
mostrar EL MISMO contenido — no una paráfrasis libre ni datos inventados. Si el asistente le dice a un
comprador "garantía de implantes: 30 días" y el sitio web dice otra cosa, es una inconsistencia de marca
grave (y en un negocio B2B con implicaciones legales/comerciales, no es cosmético). **Antes de escribir
el TSX, vuelve a leer los 4 archivos `.md` del backend** — pueden haber cambiado desde que se escribió
esta skill. No confíes ciegamente en el contenido pegado más abajo si hay discrepancia con los archivos
fuente actuales.

El componente `Tabs` de shadcn probablemente NO está instalado (no aparece en `src/components/ui/`).
Igual que con `Accordion` (ver skill `faq-page`), el proyecto usa `components.json` con
`"style": "base-nova"` (`@base-ui/react`), así que `shadcn add tabs` genera la versión ya adaptada.

## Pasos

1. **Instalar Tabs**:
   ```
   pnpm dlx shadcn@latest add tabs
   ```

2. **Copiar el contenido real de los 4 markdown a un módulo de datos** en
   `src/lib/policies-content.ts` (mantenerlo separado del TSX de la página facilita volver a
   sincronizar contenido cuando el backend actualice los `.md`):
   ```ts
   export const POLICIES = [
     {
       slug: "envios",
       title: "Envíos",
       sections: [
         {
           heading: "Cobertura y tiempos de entrega",
           body: "Centinela Dental despacha pedidos a clínicas y consultorios en todo el territorio " +
             "colombiano. Bogotá, Medellín, Cali y Barranquilla: entrega en 2 a 3 días hábiles. Resto " +
             "del país: entrega en 4 a 7 días hábiles. Zonas de difícil acceso (Amazonía, San Andrés y " +
             "Providencia) pueden requerir hasta 10 días hábiles.",
         },
         {
           heading: "Costos de envío",
           body: "El envío es gratuito para pedidos superiores a $500.000 COP. Pedidos por debajo de " +
             "ese valor tienen un costo fijo de $25.000 COP, calculado automáticamente al finalizar la " +
             "compra.",
         },
         {
           heading: "Productos de manejo especial",
           body: "Equipos de CAD/CAM (escáneres intraorales, impresoras 3D) se envían con seguro de " +
             "transporte incluido y requieren firma de un responsable de la clínica al momento de la " +
             "entrega. Biomateriales e implantes se despachan en empaque con control de temperatura " +
             "cuando el fabricante lo exige.",
         },
         {
           heading: "Seguimiento",
           body: "Todo pedido despachado incluye número de guía y enlace de rastreo enviado al correo " +
             "registrado en la cuenta de la clínica.",
         },
       ],
     },
     {
       slug: "devoluciones-garantia",
       title: "Devoluciones y garantía",
       sections: [
         {
           heading: "Devoluciones",
           body: "Productos sin abrir y en su empaque original pueden devolverse dentro de los 15 " +
             "días calendario posteriores a la entrega, con nota de crédito o reembolso según lo " +
             "prefiera la clínica. Por razones sanitarias, no se aceptan devoluciones de productos de " +
             "un solo uso ya abiertos (resinas, geles de blanqueamiento, biomateriales) ni de " +
             "consumibles cuyo empaque de esterilidad haya sido roto.",
         },
         {
           heading: "Garantía de implantes y componentes protésicos",
           body: "Los sistemas de implantes FGM (Aikkon, Arcsys, Vezza) y sus componentes protésicos " +
             "cuentan con garantía de fábrica de 30 días calendario contra defectos de fabricación, " +
             "contados desde la fecha de entrega. La garantía no cubre fallas por manejo, " +
             "esterilización o instalación inadecuada.",
         },
         {
           heading: "Garantía de equipos",
           body: "Lámparas de fotocurado, escáneres intraorales e impresoras 3D tienen garantía de 12 " +
             "meses contra defectos de fabricación, gestionada directamente con soporte técnico de " +
             "Centinela Dental.",
         },
         {
           heading: "Garantía de consumibles",
           body: "Resinas, geles de blanqueamiento y productos de higiene oral tienen garantía de 15 " +
             "días únicamente por defectos de fabricación verificables (no por mal uso o vencimiento " +
             "posterior a la entrega).",
         },
         {
           heading: "Proceso",
           body: "Para iniciar una devolución o reclamo de garantía, la clínica debe indicar el SKU, " +
             "número de pedido y motivo; nuestro equipo confirma la elegibilidad en un plazo máximo de " +
             "2 días hábiles.",
         },
       ],
     },
     {
       slug: "verificacion-comprador",
       title: "Verificación de comprador",
       sections: [
         {
           heading: "Quién puede comprar",
           body: "Centinela Dental es un distribuidor B2B: vende exclusivamente a odontólogos, " +
             "clínicas odontológicas y laboratorios dentales legalmente constituidos en Colombia. No " +
             "vendemos directamente al público general.",
         },
         {
           heading: "Documentos requeridos",
           body: "Para activar una cuenta de compra se requiere: cédula profesional o tarjeta " +
             "profesional del odontólogo responsable, RUT de la clínica o laboratorio, y certificado " +
             "de existencia y representación legal si la compra se factura a una persona jurídica.",
         },
         {
           heading: "Productos con restricción adicional",
           body: "Sistemas de implantes, biomateriales de injerto óseo y equipos de cirugía guiada " +
             "solo se despachan a cuentas verificadas con tarjeta profesional de odontología vigente. " +
             "Productos de higiene oral y algunos kits de blanqueamiento domiciliario pueden comprarse " +
             "con verificación estándar de clínica.",
         },
         {
           heading: "Tiempo de verificación",
           body: "La verificación de una cuenta nueva toma entre 1 y 2 días hábiles tras recibir los " +
             "documentos completos.",
         },
       ],
     },
     {
       slug: "terminos-pago",
       title: "Términos de pago",
       sections: [
         {
           heading: "Medios de pago",
           body: "Aceptamos transferencia bancaria (PSE), tarjeta de crédito empresarial y, para " +
             "clínicas con historial de compra recurrente, crédito directo a 30 días previa aprobación " +
             "de nuestro equipo comercial.",
         },
         {
           heading: "Moneda y facturación",
           body: "Todos los precios publicados están en pesos colombianos (COP) e incluyen IVA cuando " +
             "aplica. La factura electrónica se emite a nombre de la clínica, laboratorio o " +
             "profesional registrado en la cuenta verificada.",
         },
         {
           heading: "Crédito a 30 días",
           body: "Disponible para clínicas con al menos 3 pedidos previos completados sin " +
             "incidencias. El cupo de crédito inicial se define según el historial de compra y puede " +
             "ampliarse con el tiempo.",
         },
         {
           heading: "Pedidos de alto valor",
           body: "Equipos de CAD/CAM (escáneres intraorales, impresoras 3D) y kits de cirugía guiada " +
             "de alto valor pueden pagarse en hasta 3 cuotas mensuales sin intereses, sujeto a " +
             "aprobación de crédito.",
         },
       ],
     },
   ] as const;
   ```

3. **Crear `src/app/politicas/page.tsx`**:
   ```tsx
   import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
   import { POLICIES } from "@/lib/policies-content";

   export default function PoliciesPage() {
     return (
       <div className="mx-auto max-w-3xl px-6 py-12 space-y-6">
         <div className="space-y-2">
           <h1 className="text-3xl font-semibold">Políticas</h1>
           <p className="text-muted-foreground">
             Envíos, devoluciones, garantía, verificación de comprador profesional y términos de pago.
             Este es el mismo contenido que usa nuestro asistente virtual para responder tus preguntas.
           </p>
         </div>

         <Tabs defaultValue={POLICIES[0].slug}>
           <TabsList>
             {POLICIES.map((policy) => (
               <TabsTrigger key={policy.slug} value={policy.slug}>
                 {policy.title}
               </TabsTrigger>
             ))}
           </TabsList>
           {POLICIES.map((policy) => (
             <TabsContent key={policy.slug} value={policy.slug} className="space-y-4">
               {policy.sections.map((section) => (
                 <div key={section.heading} className="space-y-1">
                   <h2 className="text-base font-semibold">{section.heading}</h2>
                   <p className="text-sm text-muted-foreground">{section.body}</p>
                 </div>
               ))}
             </TabsContent>
           ))}
         </Tabs>
       </div>
     );
   }
   ```
   Verifica la API real generada por `shadcn add tabs` (nombre exacto de `TabsList`/`TabsTrigger` y si
   `Tabs` necesita `defaultValue` vs. `value` controlado) leyendo el archivo generado — la variante
   `@base-ui/react` puede diferir levemente de ejemplos basados en Radix.

   En móvil, si el `TabsList` con 4 tabs se desborda, envuélvelo en un contenedor con scroll horizontal
   (`overflow-x-auto`) en vez de apilar los tabs — ver skill `responsive-mobile-first` para el criterio
   general.

4. **Agregar el link en el FOOTER** de `src/app/layout.tsx`, siguiendo el mismo patrón de nav de links
   de la skill `faq-page` (fila `<nav>` dentro de `<footer>`). Si ya existe esa fila (por `faq-page` o
   `contact-info-page`), solo agrega `<Link href="/politicas">Políticas</Link>` a la lista — no
   dupliques la fila ni el `<footer>`.

## Gotchas

- No reescribas ni "mejores" el texto de las políticas — cópialo o adáptalo mínimamente (formato, no
  contenido). El objetivo es paridad exacta con lo que el asistente de IA cita.
- Si más adelante el backend cambia alguno de los 4 `.md`, hay que actualizar
  `src/lib/policies-content.ts` a mano — no hay sincronización automática entre repos. Si el usuario
  pide automatizar esto (ej. leer los `.md` en build time desde el otro repo), es trabajo adicional fuera
  del alcance de esta skill; señálalo pero no lo implementes por defecto ya que este repo no tiene acceso
  de build al filesystem del repo backend en un despliegue real (son repos/servicios separados).
- Antes de dar la página por terminada, vuelve a diffear el contenido de `policies-content.ts` contra los
  4 archivos fuente en `centinela-backend/apps/engagement-service/seed/policies/` para confirmar que no
  hay divergencia.
