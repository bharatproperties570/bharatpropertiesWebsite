# Production Cutover: Website Hardening & SEO Enterprise Integration (Phases 2–14)

## Summary of Changes (Phases 2 through 14)

This release consolidates comprehensive architectural hardening, SEO governance, security protections, and contract alignment between `bharatpropertiesWebsite` and `Bharat-Properties-CRM`.

- **Phase 2 (Asset & Media Pipeline):** Stabilized drone and property media rendering, enforcing aspect ratio integrity, responsive container boundaries, and optimized image loading.
- **Phase 3 (Content Security Policy):** Implemented strict CSP with CSP report-only testing, script integrity directives, and secure domain allowlisting.
- **Phase 4 (ISR Error Handling):** Hardened Incremental Static Regeneration across all dynamic listing and project pages. Data fetching functions throw on upstream 5xx/4xx errors to prevent Next.js from caching error pages or empty states.
- **Phase 5 (Toolchain & Lint Modernization):** Migrated to ESLint 9 FlatConfig with React Hooks, Next.js core vitals, and clean pass across all components.
- **Phase 6 (Build Isolation & Mock Leak Prevention):**
  - Removed automatic mock fallback during production builds.
  - `USE_MOCK_CRM=1` is strictly restricted to CI/local development.
  - If `VERCEL` or `VERCEL_ENV` is detected, mock CRM usage is prohibited.
  - Build script verifies CRM reachability (3 attempts, 5s timeout, authenticated `/projects?limit=1`).
  - Added `scripts/assert-no-mock-leak.mjs` verifying production output contains zero mock strings (`mock-project`, `mock-prop`).
- **Phase 7 (Visitor IP Forwarding & Defensive Field Mapping):**
  - Extracted leftmost valid IPv4/IPv6 address from `x-forwarded-for` (with `x-real-ip` fallback) and forwarded upstream as `X-Client-IP`. Untrusted client-supplied headers are stripped.
  - Defensive mapping in `crmService.js`: missing media, documents, videos, flexible percentages, and collector rates degrade gracefully without throwing or displaying zero-values.
- **Phase 8 (Full Server Catalog Export & Public Proxy Clamping):**
  - Server-side ISR fetches complete listing catalog via authenticated `/listings?all=1`.
  - Public API proxy (`/api/public/[...slug]`) strips `all` query parameters and clamps `limit` to maximum 200 to prevent denial-of-service or unauthenticated data dumps.
  - Sitemap generation handles pagination thresholds (50,000 URLs) and deduplicates entries.
- **Phase 9 (Post-Deploy Verification Suite):**
  - Created `scripts/post-deploy-verify.mjs` (`npm run verify:prod`) to execute non-destructive HTTP contract checks against production or staging base URLs.
- **Phase 10 (Structured Data & Heading Hierarchy):**
  - Standardized JSON-LD schemas: `CollectionPage` and `BlogPosting` on `/blog`, `AboutPage` and `Organization` on `/about`.
  - Enforced single `<h1>` invariant across all index, informational, and legal pages.
- **Phase 11 (RERA Compliance):**
  - Removed all hardcoded RERA numbers from codebase.
  - Added dual registration support: `NEXT_PUBLIC_RERA_NUMBER_HARYANA` and `NEXT_PUBLIC_RERA_NUMBER_PUNJAB`.
  - Added AST scanner preventing hardcoded RERA strings from entering source code.
- **Phase 12 (Local CI Automation & Secret Scanning):**
  - Added `scripts/local-ci.sh` (`npm run ci:local`) executing clean install, vulnerability audit, linting, unit tests, mock build, SEO verification, negative build reachability assertions, and secret scanning.
- **Phase 13 (Synthetic Full-Stack Rehearsal):**
  - Validated complete end-to-end flow with synthetic database, replica sets, and strict schema contracts.
- **Phase 14 (Preflight Environment Validation):**
  - Added `scripts/env-check.mjs` (`npm run env:check`), wired into production build pipeline before CRM handshake.
  - Validates formatting and existence of required variables without printing secret values.

---

## Required Production Environment Variables (Vercel)

| Variable | Requirement | Description / Format |
|---|---|---|
| `CRM_API_KEY` | **Required** | Shared secret key for CRM Public API ($\ge 32$ chars, no whitespace). Must match CRM `PUBLIC_API_KEY`. |
| `GEMINI_API_KEY` | **Required** | Gemini API key for AI assistant features. |
| `NEXT_PUBLIC_SITE_URL` | **Required** | Canonical base URL. Must equal `https://www.bharatproperties.co` exactly. |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | **Required** | Google Maps JavaScript API key for location widgets. |
| `CRM_API_BASE_URL` | Optional | CRM API upstream base URL (defaults to production URL: `https://crm.bharatproperties.co/api/public`). Must be HTTPS and never localhost in production. |
| `NEXT_PUBLIC_RERA_NUMBER_HARYANA` | Optional | Haryana RERA registration number (rendered on badge and structured data when present). |
| `NEXT_PUBLIC_RERA_NUMBER_PUNJAB` | Optional | Punjab RERA registration number (rendered on badge and structured data when present). |
| `NEXT_PUBLIC_GA_ID` | Optional | Google Analytics 4 Measurement ID (`G-XXXXXXXXXX`). |
| `NEXT_PUBLIC_GSC_VERIFICATION` | Optional | Google Search Console verification token. |

*Note: In accordance with zero-leak policies, variable values must be configured directly within the Vercel Project Settings dashboard. Never commit `.env.production` files.*

---

## Rollout & Verification Procedure

1. **Pre-Deployment:**
   - Confirm CRM has been deployed and completed Gate 6 (public API endpoints healthy).
   - Configure required environment variables in Vercel Project Settings for Production.
   - Run local environment check: `npm run env:check`.
2. **Deployment:**
   - Trigger Vercel deployment from release branch or promote target preview deployment.
   - Vercel build will execute `env-check.mjs`, perform authenticated reachability check to CRM `/projects?limit=1`, and verify build artifact hygiene (`check:no-mock-leak`).
3. **Post-Deployment Verification:**
   - Run verification suite against live domain:
     ```bash
     npm run verify:prod -- --base https://www.bharatproperties.co
     ```
   - Confirm `/api/health` returns `200` with `crmReachable: true`.
   - Confirm sitemap, canonicals, single H1s, and JSON-LD structured data pass all checks.

---

## Rollback Plan

If upstream CRM connectivity fails, build fails, or post-deploy verification detects anomalies:
1. **Immediate Vercel Rollback:**
   - Navigate to Vercel Dashboard -> Deployments.
   - Select the previous stable production deployment and click **Promote to Production** (instant CDN pointer swap, zero build time).
2. **DNS / Edge Verification:**
   - Confirm `https://www.bharatproperties.co` serves the previous stable release.

---

## PR Forward Movement Instructions for Repository Owner

To update the open Pull Request (PR #1) with all accumulated changes through Phase 14:
```bash
# Push phase-14 branch to remote
git push origin seo/phase-14

# Update PR #1 target head (fast-forwarding seo/phase-9 to seo/phase-14)
git push origin seo/phase-14:seo/phase-9
```
*Never force-push or push directly to `main`.*
