---
name: faq-page
description: Crea la página /faq (Preguntas Frecuentes) de Centinela Dental con un Accordion de shadcn, con contenido basado en las políticas reales del backend — usar cuando se pida "FAQ", "preguntas frecuentes" o "página de ayuda".
---

## Contexto

No existe todavía `src/app/faq/`. El patrón de página de este repo (ver `src/app/inbox/page.tsx` y
`src/app/catalog/page.tsx`) es un server component async con el shell:
```tsx
<div className="mx-auto max-w-3xl px-6 py-12 space-y-6">
  <div className="space-y-2">
    <h1 className="text-3xl font-semibold">...</h1>
    <p className="text-muted-foreground">...</p>
  </div>
  {/* contenido */}
</div>
```
Usa `max-w-3xl` (páginas angostas tipo texto), no `max-w-6xl` (ese es para grids anchos como el catálogo).

El componente `Accordion` de shadcn probablemente NO está instalado — no aparece en
`src/components/ui/`. Este proyecto usa la variante `base-nova` de shadcn respaldada por `@base-ui/react`
(ver `components.json`: `"style": "base-nova"`), no la variante Radix por defecto. Al correr el comando de
instalación, `shadcn` detecta `components.json` y genera el componente ya adaptado a `@base-ui/react` —
no necesitas adaptarlo a mano.

**Consistencia con el asistente de IA es crítica**: el asistente de Centinela ya responde preguntas de
clientes basándose en 4 documentos reales que viven en el backend
(`/Users/ragudc/Desktop/Roberto/rutan/centinela-backend/apps/engagement-service/seed/policies/`):
`professional-buyer-verification.md`, `shipping-policy.md`, `returns-warranty.md`, `payment-terms.md`.
El FAQ debe reflejar los MISMOS hechos (plazos, montos, condiciones) que esos archivos — no inventes
cifras nuevas. Si en el momento de implementar esta skill esos archivos han cambiado, vuelve a leerlos
antes de escribir el contenido (no confíes en los ejemplos de abajo si el backend ya evolucionó).

## Pasos

1. **Instalar el Accordion** (si no está en `src/components/ui/accordion.tsx`):
   ```
   pnpm dlx shadcn@latest add accordion
   ```

2. **Crear `src/app/faq/page.tsx`**:
   ```tsx
   import {
     Accordion,
     AccordionItem,
     AccordionTrigger,
     AccordionContent,
   } from "@/components/ui/accordion";

   const FAQS = [
     {
       question: "¿Quién puede comprar en Centinela Dental?",
       answer:
         "Vendemos exclusivamente a odontólogos, clínicas odontológicas y laboratorios dentales " +
         "legalmente constituidos en Colombia. No vendemos directamente al público general. Para " +
         "activar una cuenta se requiere cédula o tarjeta profesional del odontólogo responsable, " +
         "RUT de la clínica o laboratorio, y certificado de existencia y representación legal si la " +
         "compra se factura a una persona jurídica. La verificación toma entre 1 y 2 días hábiles.",
     },
     {
       question: "¿Cuánto tarda el envío de mi pedido?",
       answer:
         "Bogotá, Medellín, Cali y Barranquilla: 2 a 3 días hábiles. Resto del país: 4 a 7 días " +
         "hábiles. Zonas de difícil acceso (Amazonía, San Andrés y Providencia): hasta 10 días " +
         "hábiles. El envío es gratuito para pedidos superiores a $500.000 COP; por debajo de ese " +
         "valor el costo fijo es de $25.000 COP.",
     },
     {
       question: "¿Puedo devolver un producto?",
       answer:
         "Productos sin abrir y en su empaque original pueden devolverse dentro de los 15 días " +
         "calendario posteriores a la entrega. Por razones sanitarias no se aceptan devoluciones de " +
         "productos de un solo uso ya abiertos (resinas, geles de blanqueamiento, biomateriales) ni " +
         "de consumibles con el empaque de esterilidad roto.",
     },
     {
       question: "¿Qué garantía tienen los implantes?",
       answer:
         "Los sistemas de implantes FGM (Aikkon, Arcsys, Vezza) y sus componentes protésicos tienen " +
         "garantía de fábrica de 30 días calendario contra defectos de fabricación desde la fecha de " +
         "entrega. Los equipos (lámparas de fotocurado, escáneres intraorales, impresoras 3D) tienen " +
         "12 meses de garantía. Los consumibles (resinas, geles, higiene oral) tienen 15 días.",
     },
     {
       question: "¿Qué medios de pago aceptan?",
       answer:
         "Transferencia bancaria (PSE), tarjeta de crédito empresarial y, para clínicas con historial " +
         "de compra recurrente, crédito directo a 30 días previa aprobación de nuestro equipo " +
         "comercial (disponible desde el tercer pedido completado sin incidencias). Todos los precios " +
         "están en pesos colombianos (COP) e incluyen IVA cuando aplica.",
     },
   ];

   export default function FaqPage() {
     return (
       <div className="mx-auto max-w-3xl px-6 py-12 space-y-6">
         <div className="space-y-2">
           <h1 className="text-3xl font-semibold">Preguntas frecuentes</h1>
           <p className="text-muted-foreground">
             Respuestas rápidas sobre compra profesional, envíos, devoluciones, garantías y pagos.
             Para casos particulares, nuestro asistente virtual o el equipo de escalaciones puede
             ayudarte con más detalle.
           </p>
         </div>
         <Accordion type="single" collapsible>
           {FAQS.map((faq, index) => (
             <AccordionItem key={faq.question} value={`item-${index}`}>
               <AccordionTrigger>{faq.question}</AccordionTrigger>
               <AccordionContent>{faq.answer}</AccordionContent>
             </AccordionItem>
           ))}
         </Accordion>
       </div>
     );
   }
   ```
   Verifica la API real generada por `shadcn add accordion` (props de `Accordion`, si `type="single"`
   necesita `collapsible` u otro nombre) leyendo el archivo generado — la variante `base-ui` puede diferir
   ligeramente de la API de Radix con la que la mayoría de ejemplos de shadcn están escritos online.

3. **Agregar el link en el FOOTER** de `src/app/layout.tsx` (NO en el `<nav>` del header — ver la skill
   `responsive-mobile-first`, que establece que páginas informativas secundarias van en el footer). El
   footer actual es solo un párrafo de texto:
   ```tsx
   <footer className="border-t py-6 text-center text-xs text-muted-foreground">
     {BRAND_NAME} — Distribuidor autorizado en Colombia de FGM Dental Group. Venta exclusiva a
     profesionales y clínicas odontológicas.
   </footer>
   ```
   Conviértelo en un footer con links, PERO revisa primero si otra skill (`contact-info-page`,
   `policies-page`) ya lo convirtió — si ya existe una fila de links en el footer, solo AÑADE el link de
   FAQ a esa fila existente, no crees una segunda fila ni un segundo `<footer>`. Estructura sugerida si
   el footer todavía es texto plano:
   ```tsx
   <footer className="border-t py-6 text-center text-xs text-muted-foreground space-y-3">
     <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
       <Link href="/faq" className="hover:text-foreground">Preguntas frecuentes</Link>
       <Link href="/contacto" className="hover:text-foreground">Contacto</Link>
       <Link href="/politicas" className="hover:text-foreground">Políticas</Link>
     </nav>
     <p>
       {BRAND_NAME} — Distribuidor autorizado en Colombia de FGM Dental Group. Venta exclusiva a
       profesionales y clínicas odontológicas.
     </p>
   </footer>
   ```
   El orden alfabético/lógico sugerido es Preguntas frecuentes, Contacto, Políticas — pero lo importante
   es no duplicar el `<nav>` de links del footer si ya existe.

## Gotchas

- No repitas contenido inventado: si necesitas ampliar una pregunta, vuelve a leer el `.md` fuente en el
  backend en vez de improvisar cifras.
- Si el backend agrega o cambia una política después de que esta página exista, esta página queda
  desactualizada — no hay sincronización automática. Menciónalo si el usuario pregunta por
  mantenimiento futuro (fuera del alcance de esta skill).
