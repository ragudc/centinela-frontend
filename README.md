# centinela-frontend

Frontend for **Centinela Dental** — B2B storefront and AI customer-service chat widget for the
authorized Colombian distributor of FGM Dental Group products. Next.js (App Router) + React +
TypeScript + Tailwind CSS v4 + shadcn/ui + lucide-react, talking to the `centinela-backend`
Apollo Gateway.

## Prerequisites

- Node **20+** (developed against 24.15.0 — Tailwind v4 needs 20+; the system default here is
  18.18, so run `nvm use` first — see `.nvmrc`)
- `centinela-backend` running locally (gateway on `:4000`, engagement-service on `:4002`), seeded

## Setup

```bash
nvm use
pnpm install
cp .env.example .env.local   # defaults already point at localhost backend ports
pnpm dev
```

Open `http://localhost:3000`.

## Pages

- `/` — brand landing page, category overview
- `/catalog`, `/catalog/[category]`, `/catalog/product/[sku]` — server-rendered catalog, queries the
  gateway directly (`src/lib/catalog.ts`)
- `/inbox`, `/inbox/[ticketId]` — escalation queue and transcript view for a human agent, with a
  "mark resolved" action (`src/lib/inbox.ts`)
- Chat widget — floating button mounted globally in `src/app/layout.tsx`
  (`src/components/chat/ChatWidget.tsx`), streams from `engagement-service` via
  `POST /api/chat` (a same-origin SSE proxy, `src/app/api/chat/route.ts`) so the browser never talks
  to the backend cross-origin for chat.

## Environment variables

| Variable | Purpose |
|---|---|
| `GATEWAY_URL` | Apollo Gateway GraphQL endpoint used by server components and the resolve-ticket API route |
| `ENGAGEMENT_CHAT_STREAM_URL` | `engagement-service`'s raw SSE chat endpoint, proxied by `/api/chat` |
| `BRAND_NAME` | Shown in the header, hero copy, and chat widget title |

## Known limitation

The chat widget's SSE pipeline is fully wired end-to-end (conversation creation, streaming,
recommendation cards, escalation banner, error states) and has been verified working — but live
Claude answers depend on `centinela-backend`'s `engagement-service` having a real
`ANTHROPIC_API_KEY` for the Smart Ranks proxy. See the backend README for details.
