# AI Ecommerce Implementation Plan

**GlowFind — Skincare & Beauty**
_Powered by TanStack · Shopee Affiliate · Claude API_

> **Niche:** Skincare & Beauty &nbsp;|&nbsp; **Budget:** Rp 0 &nbsp;|&nbsp; **Revenue:** Shopee Affiliate &nbsp;|&nbsp; **Duration:** 4 Weeks

---

## Project Overview

| Property      | Detail                                                      |
| ------------- | ----------------------------------------------------------- |
| Duration      | 4 weeks                                                     |
| Budget        | Rp 0 (free tools only)                                      |
| Revenue model | Shopee Affiliate Commission (2.5–12% base + up to 40% XTRA) |
| Niche         | Skincare & Beauty                                           |
| Tech skill    | Advanced (can code)                                         |

---

**Primary language:** TypeScript (strict mode, no `any`)  
**Runtime:** Node.js 20+ / Bun for scripts  
**Package manager:** pnpm (workspaces)

---

## Code Style Rules

### General

- **TypeScript strict mode is mandatory.** Never use `any`. Use `unknown` and narrow with type guards
  or Zod `.parse()`. If you catch yourself writing `as SomeType`, stop and fix the upstream type.
- **No implicit returns** in async functions. Always explicitly `return` or `throw`.
- **Prefer `const` over `let`.** Never use `var`.
- **No barrel files** (`index.ts` re-exporting everything). Import directly from the source file.
  This keeps tree-shaking effective and avoids circular dependency hell.
- **File names:** `kebab-case.ts` for all files. No `camelCase.ts` or `PascalCase.ts` filenames
  (components are the exception: `ItineraryMap.tsx` is acceptable).

### Naming

| Thing                 | Convention                      | Example                                 |
| --------------------- | ------------------------------- | --------------------------------------- |
| Variables / functions | camelCase                       | `buildItinerary`, `tripId`              |
| Types / interfaces    | PascalCase                      | `ItineraryDay`, `FlightResult`          |
| Zod schemas           | camelCase + `Schema` suffix     | `itinerarySchema`, `flightResultSchema` |
| Constants             | SCREAMING_SNAKE_CASE            | `MAX_RETRIES`, `DEFAULT_TIMEOUT_MS`     |
| React components      | PascalCase                      | `ItineraryMap`, `ChatPanel`             |
| tRPC routers          | camelCase + `Router` suffix     | `tripRouter`, `agentRouter`             |
| DB table names        | snake_case (Drizzle convention) | `trips`, `itinerary_stops`              |

### TypeScript specifics

- **Always define return types** on exported functions. Inferred return types are fine for internal
  helpers but exported functions must be explicit.
- **Use discriminated unions** for state, not optional fields. Prefer:
  ```ts
  type AgentState =
    | { status: "idle" }
    | { status: "running"; currentTool: string }
    | { status: "done"; itinerary: Itinerary }
    | { status: "error"; message: string };
  ```
  over `{ status: string; currentTool?: string; itinerary?: Itinerary; message?: string }`.
- **Zod is the single source of truth for runtime shapes.** Never write a manual `interface` for data
  that crosses an API or DB boundary. Define the Zod schema first, then derive the type:
  ```ts
  export const itineraryStopSchema = z.object({ ... });
  export type ItineraryStop = z.infer<typeof itineraryStopSchema>;
  ```
- **Never cast with `as`.** The only permitted cast is `as const` for literal narrowing.

### Async / error handling

- **Always handle promise rejections.** Unhandled rejections crash the process in Node 20.
- **Use `Result` types for expected failures** (tool API errors, validation failures), not thrown
  exceptions. Use the pattern:
  ```ts
  type Result<T, E = Error> = { ok: true; value: T } | { ok: false; error: E };
  ```
- **Only throw for unexpected/programmer errors** (invariant violations, missing env vars at startup).
- **Never swallow errors silently.** At minimum, log with context before returning a failure result.
- **Timeouts on every external call.** Wrap all fetch calls in `AbortController` with a reasonable
  timeout. Default: 8 seconds for LLM tool calls, 5 seconds for third-party APIs.

### Imports

- Absolute imports using path aliases defined in `tsconfig.json`. No relative `../../..` chains
  longer than two levels.

  ```ts
  // Good
  import { itinerarySchema } from "@repo/schemas/itinerary";
  import { db } from "@repo/db";

  // Bad
  import { itinerarySchema } from "../../../packages/schemas/itinerary";
  ```

- Group imports in this order (enforced by ESLint import/order plugin):
  1. Node built-ins (`node:fs`, `node:path`)
  2. External packages
  3. Internal packages (`@repo/...`)
  4. Relative imports
  5. Type-only imports (`import type { ... }`)

---

## Week 1 — Foundation

> **Goal:** Project setup + product data pipeline

### Tasks

- Init TanStack project (TanStack Router + TanStack Query) + Tailwind CSS
- Deploy to Cloudflare Pages (free tier) — get live URL from day 1
- Set up Neon — create products, categories, clicks tables
- Register Shopee Affiliate Program — get API access
- Manually curate 80–100 skincare products with affiliate links
- Build product listing page + product detail page (static)

### Stack

| Tool                 | Purpose                                      |
| -------------------- | -------------------------------------------- |
| TanStack Router      | Client-side routing with type-safe routes    |
| TanStack Query       | Server state, caching & data fetching        |
| Tailwind CSS         | Styling                                      |
| Cloudflare Pages     | Free hosting + deployment                    |
| Neon                 | Free PostgreSQL database + API               |
| Shopee Affiliate API | Official product links + commission tracking |

### Deliverable

**Live store URL with 80+ skincare products indexed and working.**

---

## Week 2 — AI Layer

> **Goal:** Smart search + chatbot + recommendations

### Tasks

- Integrate Fuse.js for fuzzy search with intent parsing
- Build search bar that understands natural language (e.g. "serum murah untuk kulit berminyak")
- Integrate Claude API — build AI chatbot widget on product pages
- Chatbot answers: compatibility questions, best picks, price comparisons
- Build recommendation engine — "related products" based on category + tags
- Auto-generate SEO product descriptions via Claude API

### Stack

| Tool           | Purpose                                               |
| -------------- | ----------------------------------------------------- |
| Claude API     | AI chatbot + auto product descriptions                |
| Fuse.js        | Fuzzy search + intent matching                        |
| Neon RPC       | Custom database queries for recommendations           |
| TanStack Query | Backend data sync + cache invalidation for AI results |

### Key Code Pattern

```js
// Parse natural language search query with Claude API
const intent = await parseSearchIntent(userQuery);
// returns { maxPrice: 100000, category: "serum",
//           features: ["kulit berminyak", "brightening"] }

// Fetch results via TanStack Query
const { data } = useQuery({
  queryKey: ["products", intent],
  queryFn: () => filterProducts(intent),
});
```

### Deliverable

**Smart search + working AI chatbot + auto-generated SEO descriptions.**

---

## Week 3 — SEO & Traffic

> **Goal:** Google ranking + organic visitors

### Tasks

- Add dynamic meta tags per product page via TanStack Router loaders
- Generate and submit XML sitemap to Google Search Console
- Write 5 SEO blog posts targeting Indonesian skincare keywords
- Implement JSON-LD structured data (Product schema) for Google rich snippets
- Add category pages with keyword-optimised H1 + descriptions
- Register on Pinterest — post product images with affiliate links

### Stack

| Tool                    | Purpose                                          |
| ----------------------- | ------------------------------------------------ |
| TanStack Router loaders | Dynamic SEO meta tags per route                  |
| Google Search Console   | Submit sitemap, monitor rankings                 |
| JSON-LD                 | Structured data for Google rich snippets         |
| Pinterest               | Free visual traffic source (no followers needed) |

### Sample Blog Post Topics

1. "5 Serum Terbaik 2026 di Bawah Rp100.000 — Cocok untuk Pemula"
2. "Review Sunscreen Wardah UV Shield — Worth It?"
3. "Skincare Routine Pagi & Malam untuk Kulit Berminyak"
4. "Moisturizer Murah Tapi Bagus — Top 5 Pilihan di Shopee"
5. "Produk Skincare Korea Terlaris di Shopee 2026"

### Deliverable

**Store indexed on Google + 5 blog posts live + Pinterest account active.**

---

## Week 4 — Optimize & Scale

> **Goal:** Analytics + automation + growth

### Tasks

- Add click tracking — log every affiliate link click to Neon
- Build internal dashboard — top clicked products, conversion rate per category
- Automate product refresh — Cloudflare cron job to update prices & availability weekly
- Add WhatsApp share button on every product (drives organic referrals)
- A/B test product card layout — image size, CTA button text, price display
- Scale product catalog to 300+ items based on top-performing skincare categories

### Stack

| Tool                 | Purpose                                                |
| -------------------- | ------------------------------------------------------ |
| Neon                 | Click tracking + analytics storage                     |
| TanStack Query       | Real-time dashboard data fetching + background refresh |
| Cloudflare Cron Jobs | Automated product data refresh (free tier)             |
| Cloudflare Analytics | Traffic + page performance monitoring                  |

### Deliverable

**Fully automated store earning passive affiliate commission with data-driven optimisation.**

---

## Full Tech Stack Summary

| Layer            | Tool                 | Cost               |
| ---------------- | -------------------- | ------------------ |
| Frontend routing | TanStack Router      | Free (open source) |
| Data fetching    | TanStack Query       | Free (open source) |
| Styling          | Tailwind CSS         | Free               |
| Hosting          | Cloudflare Pages     | Free tier          |
| Database         | Neon (PostgreSQL)    | Free tier          |
| AI Chatbot       | Claude API           | ~$5 starter credit |
| Search           | Fuse.js              | Free (open source) |
| Recommendations  | Custom logic + Neon  | Free               |
| Product data     | Shopee Affiliate API | Free to join       |
| Analytics        | Cloudflare Analytics | Free tier          |
| **Total**        |                      | **Rp 0**           |

---

## Revenue Projection

| Level        | Traffic               | Est. Monthly Income  |
| ------------ | --------------------- | -------------------- |
| Beginner     | Low traffic           | Rp 150k – Rp 1.5jt   |
| Intermediate | Growing SEO traffic   | Rp 1.5jt – Rp 7.5jt  |
| Pro          | 10k+ monthly visitors | Rp 7.5jt – Rp 150jt+ |

> Commission example: 10 sales/day × avg order Rp120k × 10% = ~Rp120k/day (~Rp3.6jt/month) + repeat buyers compound monthly

---

## Day 1 Checklist

- [ ] Run: `npm create @tanstack/router@latest skincarestore`
- [ ] Install TanStack Query: `npm install @tanstack/react-query`
- [ ] Install Tailwind CSS and configure with Vite
- [ ] Create free project on [neon.com](https://neon.com)
- [ ] Register at [affiliate.shopee.co.id](https://affiliate.shopee.co.id)
- [ ] Deploy to [Cloudflare Pages](https://pages.cloudflare.com) — connect GitHub repo
- [ ] Curate first 20 products manually with affiliate links
- [ ] Build basic product listing page with TanStack Router route

---

## Architecture Flow

```
Visitor
  |
  v
GlowFind AI Store  (TanStack Router + TanStack Query  on  Cloudflare Pages)
  |
  v
AI Search & Recommendations  (Claude API + Fuse.js)
  |
  v
Shopee Affiliate Links
  |
  v
Buyer purchases on Shopee  ->  You earn commission
```

---

_Generated with Claude — AI Ecommerce Implementation Plan v2.0 (TanStack Edition)_
