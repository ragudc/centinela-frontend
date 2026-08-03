---
name: theme-light-dark-mode
description: Añade un toggle funcional de modo claro/oscuro (light/dark mode) a Centinela Dental usando next-themes, con anti-flash y un botón en el header — usar cuando se pida "modo oscuro", "dark mode", "theme toggle" o "modo claro/oscuro".
---

## Contexto

Los tokens de color de light/dark YA existen en `src/app/globals.css`: hay bloques `:root { ... }` (claro)
y `.dark { ... }` (oscuro) en oklch, y ya está declarado `@custom-variant dark (&:is(.dark *));` justo debajo
de los imports. Es decir, **cualquier clase `dark:*` de Tailwind ya funciona** en cuanto la clase `dark`
esté presente en `<html>`. Lo que falta por completo es el MECANISMO que añade/quita esa clase (el toggle,
la persistencia en localStorage, y evitar el flash de tema incorrecto al cargar la página).

Este proyecto es Next.js 16 App Router con React 19. El layout raíz es `src/app/layout.tsx`, un server
component que ya importa `ShieldCheck` de `lucide-react` y monta `<ChatWidget />`. El `Button` de shadcn en
`src/components/ui/button.tsx` está respaldado por `@base-ui/react` (NO Radix): para renderizarlo como otro
elemento (ej. `<Link>`) usa la prop `render={<Link href="..." />}` + `nativeButton={false}`, en vez de
`asChild`. Para un botón normal de `<button>` (como el toggle de tema) no hace falta ninguna de las dos.

## Pasos

1. **Instalar `next-themes`** (no está en `package.json` todavía):
   ```
   pnpm add next-themes
   ```

2. **Crear el provider** en `src/components/theme/ThemeProvider.tsx`:
   ```tsx
   "use client";

   import { ThemeProvider as NextThemesProvider } from "next-themes";
   import type { ComponentProps } from "react";

   export function ThemeProvider({
     children,
     ...props
   }: ComponentProps<typeof NextThemesProvider>) {
     return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
   }
   ```

3. **Envolver el `<body>` en `src/app/layout.tsx`** con el provider, y agregar `suppressHydrationWarning`
   en `<html>` (obligatorio con `next-themes` porque el atributo `class`/`data-theme` se inyecta con un
   script inline antes de la hidratación — sin esto React tira warning de mismatch):
   ```tsx
   import { ThemeProvider } from "@/components/theme/ThemeProvider";
   // ...
   return (
     <html
       lang="es"
       className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
       suppressHydrationWarning
     >
       <body className="min-h-full flex flex-col">
         <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
           <header className="border-b bg-background">
             {/* ...contenido actual... */}
           </header>
           <main className="flex-1">{children}</main>
           <footer className="...">{/* ... */}</footer>
           <ChatWidget brandName={BRAND_NAME} />
         </ThemeProvider>
       </body>
     </html>
   );
   ```
   `attribute="class"` es clave: hace que `next-themes` alterne la clase `dark` en `<html>`, que es
   exactamente lo que espera `@custom-variant dark (&:is(.dark *));` en `globals.css`. No uses
   `attribute="data-theme"` a menos que también reescribas ese custom-variant.

   El script anti-flash que inyecta `next-themes` en el `<head>` se ejecuta antes de pintar, así que no
   hace falta un `<script>` manual adicional ni un `localStorage` propio.

4. **Crear el toggle** en `src/components/theme/ThemeToggle.tsx`:
   ```tsx
   "use client";

   import { useEffect, useState } from "react";
   import { useTheme } from "next-themes";
   import { Moon, Sun } from "lucide-react";
   import { Button } from "@/components/ui/button";

   export function ThemeToggle() {
     const { resolvedTheme, setTheme } = useTheme();
     const [mounted, setMounted] = useState(false);

     useEffect(() => setMounted(true), []);

     if (!mounted) {
       // Evita renderizar el ícono equivocado antes de que next-themes resuelva el tema real
       return <Button variant="ghost" size="icon-sm" aria-hidden className="opacity-0" />;
     }

     const isDark = resolvedTheme === "dark";

     return (
       <Button
         variant="ghost"
         size="icon-sm"
         aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
         onClick={() => setTheme(isDark ? "light" : "dark")}
       >
         {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
       </Button>
     );
   }
   ```
   Nota: `Button` aquí renderiza un `<button>` nativo real (no hay `render` prop), así que no necesitas
   `nativeButton={false}`. Usa `size="icon-sm"` (24px) — es intencionalmente pequeño para no competir
   visualmente con el nav principal, ver siguiente punto y la skill `responsive-mobile-first`.

5. **Colocar el toggle en el header** de `src/app/layout.tsx`, como ícono pequeño al final de la barra
   (fuera del `<nav>` de enlaces, para que quede claramente separado semánticamente de la navegación):
   ```tsx
   <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
     <Link href="/" className="flex items-center gap-2 font-semibold text-lg">...</Link>
     <div className="flex items-center gap-4">
       <nav className="flex items-center gap-6 text-sm text-muted-foreground">
         <Link href="/catalog" className="hover:text-foreground">Catálogo</Link>
         <Link href="/inbox" className="hover:text-foreground">Inbox de escalaciones</Link>
       </nav>
       <ThemeToggle />
     </div>
   </div>
   ```
   Si la skill `responsive-mobile-first` ya convirtió el nav en un menú `Sheet` (hamburguesa) en móvil,
   coloca el `<ThemeToggle />` FUERA del `Sheet`, siempre visible junto al botón de menú — es un control
   de preferencia visual, no un ítem de navegación, y el usuario debe poder cambiarlo sin abrir el menú.

## Gotchas

- `suppressHydrationWarning` va SOLO en `<html>`, no en `<body>` ni en el toggle.
- Si usas `resolvedTheme` en vez de `theme`, obtienes el valor real cuando `defaultTheme="system"`
  (evita mostrar un ícono ambiguo cuando el usuario está en modo "system").
- El patrón `mounted` con `useState`/`useEffect` en el toggle es necesario porque `next-themes` no conoce
  el tema real en el primer render del cliente (para evitar mismatch de hidratación) — sin este guard vas
  a ver parpadeo del ícono (Sun→Moon) justo después de cargar.
- No dupliques `@custom-variant dark` ni los bloques `:root`/`.dark` en `globals.css` — ya existen, esta
  skill NO los toca.
- Verifica que no haya ya un componente de tema antes de crear estos archivos (`src/components/theme/`
  puede no existir todavía; si existe, revisa que no se dupliquen `ThemeProvider`/`ThemeToggle`).
