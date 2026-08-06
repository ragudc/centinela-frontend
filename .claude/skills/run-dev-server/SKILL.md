---
name: run-dev-server
description: Levanta el servidor de desarrollo de Centinela Dental (Next.js) en el puerto 3000 — usar cuando se pida "corre el proyecto", "levanta el servidor", "inicia el frontend", "run dev", "pnpm dev", "iniciar la app" o "cómo corro el proyecto".
---

## Contexto

El proyecto es Next.js 16 con App Router, React 19, TypeScript y Tailwind CSS v4. El entorno requiere
**Node ≥20 (preferiblemente Node 24)**. Tailwind v4 falla silenciosamente con Node 18.x, que puede ser
el default del sistema en este equipo — verificar siempre antes de arrancar.

Las variables de entorno necesarias van en `.env.local` (no en `.env`). Si ese archivo no existe, el
gateway GraphQL y el chat SSE no tendrán URL y los Server Components fallarán al intentar fetch.

El backend (`centinela-backend`) debe estar corriendo en `http://localhost:4000/graphql` para que las
páginas del catálogo, inbox y leads tengan datos reales. Sin él, las páginas de solo contenido estático
(FAQ, Políticas, Contacto) sí cargan.

## Pasos

1. **Verificar la versión de Node** antes de cualquier otra cosa:
   ```bash
   node -v
   ```
   Si la salida es `v18.x` o inferior, el usuario debe cambiar la versión activa antes de continuar.
   En este entorno usar `nvm use 24` o el gestor de versiones que tenga configurado.
   Con Node 20+ se puede proceder.

2. **Verificar que `.env.local` existe** en la raíz del proyecto:
   ```bash
   ls .env.local
   ```
   Si no existe, crearlo con el contenido mínimo:
   ```
   GATEWAY_URL=http://localhost:4000/graphql
   ENGAGEMENT_CHAT_STREAM_URL=http://localhost:4002/chat/stream
   BRAND_NAME="Centinela Dental"
   ```

3. **Instalar dependencias** si `node_modules` no existe o `pnpm-lock.yaml` cambió desde el último
   install:
   ```bash
   pnpm install
   ```
   Si `pnpm` no está disponible globalmente, instalarlo con `npm i -g pnpm` (una sola vez).

4. **Arrancar el servidor de desarrollo**:
   ```bash
   pnpm dev
   ```
   El servidor levanta en **http://localhost:3000**. La primera compilación tarda unos segundos; las
   recargas subsiguientes (Fast Refresh) son inmediatas.

## Gotchas conocidos

- **`EMFILE: too many open files`** — ocurre de forma transitoria tras varios reinicios seguidos en
  Windows. Solución: hacer `kill -9` a todos los procesos `node`/`next` colgados y reiniciar limpio.
  En PowerShell: `Get-Process node | Stop-Process -Force`.

- **Puerto 3000 ocupado** — si otro proceso ya usa el puerto, Next.js intenta el 3001 automáticamente
  e imprime la URL real en consola. Siempre leer la URL que aparece en el output, no asumir 3000.

- **Breakpoints de resize** — al verificar responsive en el navegador, abrir una pestaña nueva antes
  de hacer resize. Redimensionar sobre una pestaña ya navegada puede no aplicar el nuevo viewport de
  forma confiable en este entorno.

- **`pnpm dev` en background** — si se lanza con `run_in_background: true` desde Claude Code, el
  proceso queda vivo hasta que el usuario lo mate (`Ctrl+C` en terminal, o `kill` del PID). No
  relanzar si ya hay uno corriendo — revisar primero con `lsof -i :3000` (o `netstat -ano | findstr 3000`
  en PowerShell).

## Verificación rápida

Una vez levantado, estas rutas deben responder sin backend:
- `http://localhost:3000/faq` — FAQ estático (Accordion)
- `http://localhost:3000/politicas` — Políticas estáticas (Tabs)
- `http://localhost:3000/contacto` — Info de contacto + formulario

Estas rutas necesitan el backend en `localhost:4000`:
- `http://localhost:3000/catalog` — productos y categorías
- `http://localhost:3000/inbox` — tickets de escalación
- `http://localhost:3000/leads` — leads y consentimiento
