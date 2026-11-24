# Bharat Properties - Enterprise Next.js Platform

Enterprise-grade real estate web platform for Bharat Properties (`https://www.bharatproperties.co`), built with Next.js 15 (App Router), React 19, and backed by a CRM API data synchronization layer.

---

## 1. Architecture Overview

```
                      ┌───────────────────────────────────────────────┐
                      │              Edge / CDN (Vercel)             │
                      │  - Security Headers (HSTS, CSP, COOP, etc.)   │
                      │  - Same-Origin Verification                   │
                      └───────────────────────┬───────────────────────┘
                                              │
                      ┌───────────────────────▼───────────────────────┐
                      │          Next.js 15 App Router                │
                      │  - SSR & ISR (300s / 3600s revalidation)      │
                      │  - JSON-LD Structured Data (Schema.org)       │
                      │  - Next/Image optimization & WebP pipeline    │
                      └──────────────┬─────────────────┬──────────────┘
                                     │                 │
      ┌──────────────────────────────▼───┐         ┌───▼───────────────────────────┐
      │     API Proxy & Serverless       │         │       CRM Data Service        │
      │  - /api/public/[...slug]         │         │  - Retry with exponential     │
      │  - Honeypot & Time-to-fill checks│         │    backoff on 5xx / outage    │
      │  - Token Bucket Rate Limiting    │         │  - Outage Isolation (Prevents │
      │  - Server-side Schema Validation │         │    caching empty pages in ISR)│
      └──────────────────────────────────┘         └───────────────────────────────┘
```

### Key Highlights
- **Framework:** Next.js 15 (App Router), React 19.
- **Security:** CSP Report-Only with `/api/csp-report` telemetry collector, strict HSTS (`max-age=63072000; includeSubDomains`), Permissions-Policy, COOP, same-origin validation on POST proxy requests, body size enforcement (`<= 100KB`), and rate limiting.
- **Data Resilience:** CRM layer with automatic retry, timeout limits, and failure boundaries that preserve cached ISR content during upstream outages rather than generating blank pages.
- **Environment-Aware Listings Synchronization:** Server-side operations (SSR, SSG, sitemap generation) fetch complete catalog with `/listings?all=1`; browser clients query `/listings?limit=200` via the public proxy.
- **Proxy Security & Query Sanitization:** `/api/public/[...slug]` strips `all=1` to block unauthorized full database exports from external browsers and clamps `limit` between 1 and 200. Client-supplied `X-Client-IP` is never trusted; real visitor IP is resolved strictly from trusted edge headers.
- **Sitemap Protection:** Dedupes slugs, caps sitemaps at 50,000 URLs conforming to search protocols (with chunking support), and retains last-known good CRM items upon transient upstream CRM failures.
- **SEO & A11y:** Canonical domain enforcement (`www.bharatproperties.co`), automated breadcrumbs, dynamic JSON-LD schemas (`RealEstateAgent`, `Place`, `Article`, `BreadcrumbList`, `FAQPage`), and accessible focus states.
- **Drone Assets:** Verified local WebP assets in `public/images/` for Chandigarh, Kurukshetra, Mohali, Panchkula, Karnal, Sonepat, Delhi, Gurgaon, and Noida, with graceful local fallbacks for Kharar, Zirakpur, and New Chandigarh.

---

## 2. Environment Variables & Vercel Deployment

All secrets must remain server-side and never be prefixed with `NEXT_PUBLIC_`.

### Required Variables for Vercel Production

| Variable | Scope | Required in Prod | Default / Description |
| :--- | :--- | :--- | :--- |
| `CRM_API_KEY` | Server-Only | **YES** | Authenticates server requests to upstream CRM API. Build fails if missing or invalid. |
| `CRM_API_BASE_URL` | Server-Only | Optional | Upstream CRM base URL (defaults to `https://api.bharatproperties.co/api/public`). |
| `GEMINI_API_KEY` | Server-Only | **YES** | Powers AI chatbot assistant (`/api/webhooks/website-chat`). |
| `NEXT_PUBLIC_SITE_URL` | Client & Server | **YES** | Canonical site URL: `https://www.bharatproperties.co`. |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Client | **YES** | Google Maps API key for Store Locator and office map embeds. |
| `NEXT_PUBLIC_GA_ID` | Client | Optional | Google Analytics 4 Measurement ID (`G-XXXXXXXXXX`). |
| `NEXT_PUBLIC_GSC_VERIFICATION` | Client | Optional | Google Search Console site verification token. |
| `NEXT_PUBLIC_DEFAULT_CITY` | Client | Optional | Fallback city for general listings (default: `Kurukshetra`). |
| `NEXT_PUBLIC_PHONE` | Client | Optional | Primary contact telephone number. |
| `NEXT_PUBLIC_WHATSAPP` | Client | Optional | Primary WhatsApp contact number. |
| `USE_MOCK_CRM` | Local / CI | Test Only | Set `USE_MOCK_CRM=1` for isolated CI/local testing. **Ignored on Vercel**. |

### Production Build Invariants & Failure Behavior
- **Zero Mock Data in Real Builds:** Mock CRM is used **only** when `USE_MOCK_CRM=1` is set explicitly. It will never activate automatically as a fallback.
- **Vercel Enforcement:** If `VERCEL` or `VERCEL_ENV` is detected, `USE_MOCK_CRM` is completely ignored and live CRM authentication is enforced.
- **Pre-Build Health Check:** Any production build without `USE_MOCK_CRM=1` performs an authenticated 3-attempt health check (5s timeout per attempt) against `${CRM_API_BASE_URL}/projects?limit=1`.
- **Immediate Build Abort:** If the CRM is unreachable (connection refused, timeout) or returns HTTP 401/403, the build immediately aborts with exit code 1 to protect production from deploying broken or blank static pages.

---

## 3. Local Setup & Development

### Prerequisites
- Node.js `>= 20.0.0` (enforced via `.nvmrc` and `package.json`)
- npm `>= 10.0.0`

### Step-by-Step Setup
```bash
# 1. Clone repository and navigate to root
cd bharatpropertiesWebsite

# 2. Use supported Node.js version
nvm use 20

# 3. Clean install dependencies
npm ci

# 4. Copy environment template and configure values
cp .env.example .env.local

# 5. Start local development server
npm run dev

# 6. Verify production build
npm run build
npm start
```

---

## 4. ISR & Upstream Outage Behavior

- **Home Page (`/`):** `revalidate = 300` (5 minutes). ISR parallel-fetches hot deals, featured projects, and reviews.
- **City Pages (`/[cityName]`):** `revalidate = 3600` (1 hour) with `dynamicParams = false` restricted to approved core cities (`Kurukshetra`, `Mohali`, `Chandigarh`, `Panchkula`, `Zirakpur`, `Kharar`, `New Chandigarh`). All other slugs return 404.
- **Projects & Properties (`/project/[id]`, `/property/[id]`):** `revalidate = 300` (5 minutes).
- **Outage Protection:** When the CRM service returns 5xx or fails network connection, `crmService.js` throws a descriptive outage error on server components. Next.js catches this and serves the last successfully generated static version instead of overwriting cache with an empty page.

### Listings Synchronization & Query Clamping Invariants
- **Server Execution (`isServer === true`):** `fetchListings()` invokes `/listings?all=1` to pull the complete catalog during build, SSG generation, and periodic revalidation. The updated CRM API serves the full dataset when `all=1` is provided; legacy CRM deployments safely ignore unrecognized query arguments.
- **Client Execution (`isServer === false`):** Browser-side calls query `/listings?limit=200` through the local `/api/public` proxy.
- **Proxy Sanitization (`/api/public/[...slug]`):** External callers hitting the proxy cannot trigger full catalog exports. `sanitizeProxyQuery` strips any `all` parameter variant (`all=1`, `all=true`) and clamps requested `limit` values strictly between `1` and `200`.
- **Sitemap Safeguards (`src/app/sitemap.js`):**
  - **CRM Resilience:** If CRM calls fail during sitemap generation, a warning is logged and previous cached CRM items are retained rather than producing a depleted sitemap.
  - **Slug Deduplication:** Slugs are deduplicated across projects, listings, and blog posts, with canonical URL deduplication across all routes.
  - **Protocol Cap (50,000 URLs):** Output is capped at 50,000 URLs per file in adherence to search engine sitemap specifications, with index chunking support via `generateSitemaps()`.

---

## 5. Deployment & Rollback Runbook

### Deployment Checklist
1. Verify branch CI passes (`npm run lint`, `npm audit --omit=dev --audit-level=high`, `npm run build`, `npm run seo:check`).
2. Merge pull request into target deployment branch.
3. Vercel automatically creates an immutable preview deployment.
4. Verify smoke tests on the preview deployment:
   - Check `/api/health` returns `{"status":"ok","crmReachable":true}`.
   - Test form submissions on `/` and dynamic project/property pages.
5. Promote preview to production.

### Rollback Runbook
If an issue occurs in production:
1. **Instant Rollback via Vercel CLI:**
   ```bash
   vercel rollback
   ```
   Or select previous green deployment in the Vercel Dashboard -> **Deployments** -> **Instant Rollback**.
2. **Git Rollback:**
   ```bash
   git revert HEAD -m 1
   git push origin main
   ```
3. Re-verify `/api/health` immediately after rollback.

---

## 6. How to Run SEO & Quality Gate Checks

The repository includes an automated integration suite (`scripts/seo-check.mjs`) that spins up a mock CRM server, boots the built Next.js production server, and validates 50+ quality assertions:

```bash
# Run standard linting
npm run lint

# Security audit on production dependencies
npm audit --omit=dev --audit-level=high

# Full production build
npm run build

# Run automated SEO & Quality Gate Suite
npm run seo:check
```

### Assertions Verified by `npm run seo:check`:
- HTTP status codes (200 for canonical routes, 404 for unknown, 308 for legacy slugs).
- Presence of descriptive `<title>` tag.
- Canonical tag matching `https://www.bharatproperties.co`.
- Correct `robots` meta directives (`index, follow` vs `noindex, nofollow`).
- Strict requirement of exactly **one** `<h1>` tag per page.
- Valid JSON syntax for all `application/ld+json` schema blocks.
- Presence of entity identifier `Bharat Properties` in raw HTML.
- XML validity and canonical URLs in `/sitemap.xml`.
- Crawler rules and sitemap reference in `/robots.txt`.

---

## 7. Key Rotation Runbook

Follow these steps when rotating secrets (`CRM_API_KEY`, `GEMINI_API_KEY`):

1. **CRM API Key Rotation:**
   - Generate a new API key in the CRM administrative portal.
   - Update `CRM_API_KEY` in Vercel Environment Variables (**Settings** -> **Environment Variables** -> **Production**).
   - Trigger a redeployment without cache (`vercel deploy --prod --force`).
   - Verify `/api/health` indicates `crmReachable: true`.
   - Deprecate and revoke the old API key in CRM settings.

2. **Gemini API Key Rotation:**
   - Create a new API key in Google AI Studio / Google Cloud Console.
   - Update `GEMINI_API_KEY` in Vercel Environment Variables.
   - Test the chatbot endpoint:
     ```bash
     curl -X POST https://www.bharatproperties.co/api/webhooks/website-chat \
       -H "Content-Type: application/json" \
       -d '{"message":"Hello"}'
     ```
   - Revoke the old Gemini API key.

---

## 8. Security & Vulnerability Reporting

Please refer to [SECURITY.md](file:///Users/bharatproperties/.gemini/antigravity/scratch/bharatpropertiesWebsite/SECURITY.md) for vulnerability disclosure procedures and security guarantees.
