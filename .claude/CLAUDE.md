# Centinela Dental — Frontend

Tienda B2B + asistente de atención de **Centinela Dental**, distribuidor autorizado de FGM Dental
Group en Colombia. Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, shadcn/ui.
Consume el gateway GraphQL de `centinela-backend` (`http://localhost:4000/graphql`).

Documentación de arquitectura y resumen ejecutivo en `artifacts/*.md` — este archivo es guía
operativa para trabajar en el repo, no un sustituto de esos documentos.

## Requisitos

- **Node ≥20, usar Node 24 en desarrollo.** Tailwind v4 requiere Node 20+; el default del sistema
  puede ser 18.x — verificar `node -v` antes de `pnpm install`.
- `centinela-backend` corriendo en paralelo (`pnpm dev` en ese repo) para que las Server
  Components tengan datos reales.

## Comandos

```bash
pnpm install
pnpm dev      # next dev, puerto 3000
pnpm build
pnpm start
pnpm lint
```

## Variables de entorno (`.env.local`)

```
GATEWAY_URL=http://localhost:4000/graphql
ENGAGEMENT_CHAT_STREAM_URL=http://localhost:4002/chat/stream
BRAND_NAME="Centinela Dental"
```

## Rutas

Todas las páginas parten del mismo contenedor (`max-w-3xl` para texto, `max-w-6xl` para grillas) y
son Server Components async por defecto.

| Ruta | Fuente de datos |
|---|---|
| `/` | categorías + formulario de captación de leads |
| `/catalog`, `/catalog/[category]`, `/catalog/product/[sku]` | productos/categorías del gateway |
| `/inbox`, `/inbox/[ticketId]` | tickets de escalación |
| `/leads`, `/leads/[leadId]` | leads y estado de consentimiento |
| `/faq` | contenido estático (Accordion) |
| `/contacto` | info estática + formulario de captación de leads |
| `/politicas` | contenido estático (Tabs) |

## Convenciones del repo

- **Server Components llaman al gateway directo; Client Components nunca lo tocan.** Un
  Client Component pasa por su propio Route Handler en `src/app/api/*`, que actúa de proxy
  delgado — evita exponer el gateway al navegador y centraliza la lógica de red. Cualquier
  mutación nueva desde el cliente necesita su Route Handler correspondiente.
- **El chat en vivo evita el gateway.** `ChatWidget` llama a `/api/chat`, que reenvía el stream
  SSE a `engagement-service:4002/chat/stream` directamente — no pasa por GraphQL. Mantener esa
  separación si se toca ese flujo.
- **shadcn/ui está en la variante `base-nova`, respaldada por `@base-ui/react`, no Radix.** Las
  APIs difieren de los ejemplos típicos de Radix: `Button` usa la prop `render` en vez de
  `asChild` (junto con `nativeButton={false}` cuando el render target no es un `<button>` nativo);
  `Select`/`Accordion` trabajan con arrays de valor (`value`/`defaultValue: string[]`) en vez de un
  string único. Verificar el componente generado real antes de asumir el comportamiento de Radix.
- **Tema claro/oscuro vía `next-themes`**, `attribute="class"`. La detección de montaje usa
  `useSyncExternalStore`, no el patrón `useState` + `useEffect` — este repo tiene activo el lint
  `react-hooks/set-state-in-effect`, que ese patrón viola.
- **Los enlaces de navegación secundarios (FAQ, Contacto, Políticas, Leads, Inbox) viven en tres
  lugares a la vez:** el `<nav>` del header, el `<nav>` del footer y `NAV_LINKS` en
  `MobileNav.tsx`. Cualquier página nueva que deba ser accesible desde la navegación principal
  necesita actualizar los tres.
- **El breakpoint del nav del header es `md:` (768px), no `sm:`.** Con 6 enlaces el texto ya
  envuelve a 640px; si se agregan más enlaces, volver a verificar en el breakpoint real con una
  captura, no asumir que `md:` sigue siendo suficiente.
- **Imágenes con `next/image`:**
  - `next.config.ts` debe mantener `images.contentDispositionType: "inline"` — el default
    (`"attachment"`) rompe el render inline en algunos contextos de navegador.
  - Marcar `priority` en imágenes above-the-fold (primeras ~6 tarjetas de catálogo, imagen de
    detalle de producto) — el disparador nativo de lazy-load/`IntersectionObserver` ha resultado
    poco confiable en este entorno; no depender solo de él para contenido visible de entrada.
- **Cualquier contenedor con `overflow-x-auto` necesita `overflow-y-hidden` explícito junto a él**
  — por spec de CSS, un solo eje en `auto` fuerza al otro a computar como `auto` también, creando
  scrollbars fantasma.
- Todo el contenido de producto, políticas y copy es original (no scrapeado de sitios reales de
  terceros); mantener esa práctica en cualquier contenido nuevo.

## Gotchas conocidos

- `next dev` puede lanzar `EMFILE: too many open files` de forma transitoria tras varios reinicios
  seguidos en este entorno — un `kill -9` de los procesos colgados + reinicio limpio lo resuelve.
- El resize de ventana sobre una pestaña ya navegada puede no aplicarse de forma confiable para
  verificación de estado — si hace falta comprobar un breakpoint o dimensiones reales, preferir
  abrir una pestaña nueva antes de resize + verificar.
