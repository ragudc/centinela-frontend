---
name: responsive-mobile-first
description: Metodología y checklist mobile-first con Tailwind v4 aplicada a Centinela Dental, incluyendo cómo convertir el nav del header en un menú hamburguesa con el Sheet de shadcn — usar cuando se pida "responsive", "mobile", "menú hamburguesa", "que se vea bien en celular" o al auditar cualquier página/componente nuevo.
---

## Contexto

Tailwind v4 en este repo usa el sistema de breakpoints estándar SIN prefijo = base (móvil):
`sm:` ≥640px, `md:` ≥768px, `lg:` ≥1024px, `xl:` ≥1280px. No hay `tailwind.config.js` (config CSS-first,
ver `src/app/globals.css`), así que los breakpoints son los defaults de Tailwind — no hay overrides que
verificar.

**Metodología mobile-first**: escribe primero las clases SIN prefijo pensando en pantalla angosta (una
columna, texto legible, botones grandes), y usa `sm:`/`md:`/`lg:` únicamente para AÑADIR complejidad al
crecer el viewport (más columnas, nav horizontal, spacing mayor). Nunca al revés (no diseñes para desktop
y "arregles" móvil con `max-md:`).

**Patrón establecido en este repo — páginas informativas secundarias van en el FOOTER, no en el header**:
FAQ (`/faq`), Contacto (`/contacto`) y Políticas (`/politicas`) son navegación secundaria. NO las agregues
al `<nav>` horizontal del header (`src/app/layout.tsx`) — ese nav ya tiene "Catálogo" e "Inbox de
escalaciones" y es el que se satura en móvil. Las skills `faq-page`, `contact-info-page` y `policies-page`
agregan sus links al footer siguiendo este patrón; si estás implementando el header/footer y alguno de
esos links ya existe (revisa `src/app/layout.tsx` antes de agregar), no lo dupliques.

## Checklist reutilizable (aplícalo a cualquier componente/página nueva o existente)

1. ¿El contenedor raíz tiene padding horizontal razonable en móvil? Patrón del repo:
   `mx-auto max-w-6xl px-6 py-12` (páginas anchas tipo catálogo/home) o
   `mx-auto max-w-3xl px-6 py-12` (páginas angostas tipo inbox/ticket detail). `px-6` ya es seguro en
   móvil — no lo bajes.
2. ¿Los grids empiezan en 1 columna y escalan? Patrón: `grid gap-4 sm:grid-cols-2 lg:grid-cols-3`
   (ver `ProductGrid`) o `grid gap-8 md:grid-cols-2 md:items-center` (ver hero de `page.tsx`). Nunca
   `grid-cols-N` sin prefijo si N > 1.
3. ¿El texto grande escala? Patrón: `text-4xl font-semibold tracking-tight sm:text-5xl` (hero h1).
4. ¿Elementos interactivos (botones, links de nav, ítems de menú) tienen al menos ~40px de alto en
   móvil? El botón flotante del chat usa `h-14 w-14` (56px, bien). Botones de ícono normales del design
   system (`size="icon"` = 32px, `size="icon-sm"` = 28px) son aceptables para toolbar/header pero NO para
   el único punto de entrada de una acción primaria en móvil — para el trigger del menú hamburguesa usa
   `size="icon"` como mínimo.
5. ¿Algo se desborda horizontalmente en 375px de ancho (iPhone SE)? Revisa filas de badges/pills con
   `flex flex-wrap` (ya usado en `catalog/page.tsx` para las categorías — correcto) vs. `flex` sin wrap.
6. ¿Paneles tipo Sheet/Dialog usan `w-full` en móvil y limitan ancho en `sm:`? Patrón ya usado en
   `ChatWidget`: `className="flex w-full flex-col p-0 sm:max-w-sm"`.

## Puntos concretos de este repo que necesitan tratamiento mobile

### 1. Header (`src/app/layout.tsx`) — el más urgente

Hoy el `<nav>` es horizontal y sin ningún tratamiento responsive:
```tsx
<nav className="flex items-center gap-6 text-sm text-muted-foreground">
  <Link href="/catalog" className="hover:text-foreground">Catálogo</Link>
  <Link href="/inbox" className="hover:text-foreground">Inbox de escalaciones</Link>
</nav>
```
Con 2 links ya es ajustado en pantallas angostas; si se le suma el `ThemeToggle` (skill
`theme-light-dark-mode`) se desborda en móvil. **Solución: ocultar el `<nav>` en móvil y mostrar un botón
de menú que abre un `Sheet` con los mismos links** (el componente `Sheet` ya está instalado en
`src/components/ui/sheet.tsx` y ya se usa en `ChatWidget`, así que el patrón es conocido en este repo).

Convierte `layout.tsx` en algo así (extraer a un client component porque `Sheet` necesita estado):

Crear `src/components/layout/MobileNav.tsx`:
```tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { href: "/catalog", label: "Catálogo" },
  { href: "/inbox", label: "Inbox de escalaciones" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="sm:hidden">
      <Button variant="ghost" size="icon" aria-label="Abrir menú" onClick={() => setOpen(true)}>
        <Menu className="h-5 w-5" />
      </Button>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Menú</SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col gap-1 px-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-2 py-3 text-sm hover:bg-muted"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
```

Y en `src/app/layout.tsx`, oculta el `<nav>` existente en móvil y muestra `<MobileNav />` solo en móvil:
```tsx
<nav className="hidden items-center gap-6 text-sm text-muted-foreground sm:flex">
  <Link href="/catalog" className="hover:text-foreground">Catálogo</Link>
  <Link href="/inbox" className="hover:text-foreground">Inbox de escalaciones</Link>
</nav>
<MobileNav />
```
(`layout.tsx` sigue siendo server component; `MobileNav` es el único pedazo client. No hace falta mover
todo el header a client component.)

Nota: si en el futuro el nav principal crece más allá de Catálogo/Inbox, replantea el breakpoint — `sm:`
(640px) puede quedarse corto con 4+ links; considera subir a `md:` en ese momento. Con solo 2 links,
`sm:` es razonable.

### 2. Hero de `src/app/page.tsx`

Ya usa `grid gap-8 md:grid-cols-2 md:items-center` — correcto y mobile-first. La tarjeta de "Envíos a
todo el país" + "Venta profesional" usa `grid gap-4 sm:grid-cols-2` con la tercera tarjeta en
`sm:col-span-2` — también correcto. No requiere cambios, solo verificar que sigue así tras ediciones
futuras (no convertir a `grid-cols-2` sin prefijo).

### 3. `ProductGrid` (`src/components/catalog/ProductGrid.tsx`)

Ya es mobile-first: `grid gap-4 sm:grid-cols-2 lg:grid-cols-3`. Si se agregan filtros o controles de
orden en el futuro, colócalos en columna en móvil (`flex flex-col gap-2 sm:flex-row sm:items-center`).

### 4. Panel del `ChatWidget` (`src/components/chat/ChatWidget.tsx`)

El botón flotante que abre el chat (`h-14 w-14 rounded-full`, 56px) cumple el mínimo de touch target
recomendado (44px). El `SheetContent` usa `w-full ... sm:max-w-sm`, correcto: ocupa toda la pantalla en
móvil (necesario para no dejar un chat inusable de 200px de ancho) y se limita a `sm:max-w-sm` en
desktop. En `ChatInput.tsx` (`src/components/chat/ChatInput.tsx`), el botón de enviar usa `size="icon"`
(32px) — está por debajo del ideal de 44px para el dedo pulgar; si se toca este componente, considerar
subir a `size="icon-lg"` (36px) o envolver con más padding táctil, pero no es bloqueante porque siempre
hay un Textarea grande al lado para usar Enter.

### 5. Páginas de inbox (`src/app/inbox/page.tsx`, `src/app/inbox/[ticketId]/page.tsx`)

Usan el shell angosto `mx-auto max-w-3xl px-6 py-12 space-y-6` — ya funciona bien en móvil porque nunca
usa grids multi-columna. En `inbox/[ticketId]/page.tsx`, el header `flex items-start justify-between
gap-4` entre el título y `ResolveTicketButton` puede apretarse si el nombre del cliente es largo; si se
toca, considera `flex-col gap-3 sm:flex-row sm:items-start sm:justify-between`.

## Al agregar una página nueva

Todas las páginas nuevas (FAQ, Contacto, Políticas) deben partir del mismo shell que las páginas
existentes: `<div className="mx-auto max-w-3xl px-6 py-12 space-y-6">` (contenido tipo texto/lista) —
usa `max-w-6xl` solo si hay grids anchos como catálogo. Revisa el checklist de arriba antes de darla por
terminada.
