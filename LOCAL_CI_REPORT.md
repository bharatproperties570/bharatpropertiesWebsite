# Local CI & Real CRM Contract Verification Report: Bharat Properties Website

- **Repository:** `bharatpropertiesWebsite`
- **Branch:** `seo/phase-13` (branched from `seo/phase-12`)
- **Execution Timestamp:** 2026-11-25T17:50:00+05:30
- **Node Version:** `v20.20.2`
- **Mode:** LOCAL ONLY (No production URLs, no GitHub API/tokens, no PR creation, no main/master pushes, no real DB, no secrets printed)

---

## 1. Executive Summary

All local CI validation pipelines (9 steps) and the full End-to-End Real CRM Contract Verification suite passed with **100% success (0 errors, 0 failures)**.

| Step # | Check / Suite Description | Target / Command | Exit Code | Status | Key Output / Evidence |
| :---: | :--- | :--- | :---: | :---: | :--- |
| **1** | Clean Dependency Tree | `npm ci` | `0` | **PASS** | Clean install: 358 packages audited. |
| **2** | Production Security Audit | `npm audit --omit=dev --audit-level=high` | `0` | **PASS** | 0 high or critical production vulnerabilities. |
| **3** | ESLint Code Quality | `npm run lint` | `0` | **PASS** | 0 errors, 0 warnings. |
| **4** | Unit & Invariant Tests | `npm test` | `0` | **PASS** | 40/40 tests passed (RERA hardening, IP extraction, proxy query sanitizing). |
| **5** | Production Next.js Build | `USE_MOCK_CRM=1 npm run build` | `0` | **PASS** | Optimized production build generated. |
| **6** | SEO & Schema Quality Gates | `npm run seo:check` | `0` | **PASS** | 114/114 assertions passed across SSR, JSON-LD, sitemap, and redirects. |
| **7** | Negative Build: Unreachable CRM | `CRM_API_BASE_URL=http://127.0.0.1:9` | `1` | **PASS** | Aborted build with exit code 1 as expected. |
| **8** | Negative Build: Vercel Override | `VERCEL=1 USE_MOCK_CRM=1` | `1` | **PASS** | Overrode mock flag, aborted build with exit code 1. |
| **9** | Secret Scanner | `node scripts/secret-scan.mjs` | `0` | **PASS** | Clean: 0 hardcoded keys, tokens, or MongoDB Atlas URIs. |
| **E2E**| **End-to-End Real CRM Test** | `npm run test:e2e` | `0` | **PASS** | Tested against REAL CRM with synthetic replica set. All contract gates met. |
| **PDV**| **Post-Deploy Verification** | `post-deploy-verify.mjs` (Local) | `0` | **PASS** | 64/64 passed, 0 failed. Zero mock leak failures when built with Real CRM. |

---

## 2. Command Details & Trimmed Outputs (Local CI Runner)

Executed via unified runner `npm run ci:local`:

```
==========================================================
🚀 Bharat Properties Website - Local CI Suite
Branch: seo/phase-13
==========================================================

>>> Step 1: Clean Dependency Installation (npm ci)
added 358 packages in 12s

>>> Step 2: Security Audit (npm audit --omit=dev --audit-level=high)
found 0 vulnerabilities

>>> Step 3: Linting & Static Analysis (npm run lint)
> eslint .
(clean exit, 0 errors, 0 warnings)

>>> Step 4: Unit & Security Invariant Tests (npm test)
✔ RERA Static Scanner: fails if hardcoded RERA numbers appear in src/
✔ RERA Registration Helper: supports Haryana & Punjab state registrations
✔ JSON-LD Schema Guard: omits license field when env vars unset
✔ countLocEntries: extracts total, property, and project URLs
✔ Visitor IP: validates IPv4/IPv6, leftmost precedence, rejects client X-Client-IP
✔ Proxy Query Sanitizer: strips all=1, clamps limit to max 200
ℹ tests 40 | pass 40 | fail 0 | duration_ms 166.48

>>> Step 5: Production Next.js Build with Mock CRM (USE_MOCK_CRM=1 npm run build)
[build] 🧪 USE_MOCK_CRM=1 active (Local/CI). Starting mock CRM on port 59973...
✓ Compiled successfully in 12.7s
✓ Linting and checking validity of types
✓ Collecting page data

>>> Step 6: SEO & Quality Gates (npm run seo:check)
Quality Gate Summary: 114 Passed, 0 Failed
🎉 All SEO, SSR, Redirect & Schema Quality Gates PASSED!

>>> Step 7: Negative Build Test 1: Unreachable CRM must fail build (exit non-zero)
[build] Verifying upstream CRM authentication (attempt 1/3) at http://127.0.0.1:9/projects?limit=1...
[build] ❌ BLOCKER ERROR: Upstream CRM is unreachable or unauthorized.
✅ PASS: Unreachable CRM failed as expected (exit code: 1)

>>> Step 8: Negative Build Test 2: VERCEL=1 USE_MOCK_CRM=1 must override mock and fail (exit non-zero)
[build] ⚠️ Detected Vercel deployment environment. Overriding USE_MOCK_CRM=1 -> Real CRM required.
[build] ❌ BLOCKER ERROR: Upstream CRM is unreachable or unauthorized.
✅ PASS: VERCEL=1 USE_MOCK_CRM=1 overridden and failed as expected (exit code: 1)

>>> Step 9: Secret Scan (API keys, CRM keys, MongoDB Atlas URIs, Bearer tokens)
🔒 Scanning repository for credential patterns (AIza, BP-WEB-INTEGRATION, mongodb+srv, Bearer tokens)...
✅ Secret Scan PASSED: No credentials or secret literals found.

==========================================================
🎉 ALL 9 LOCAL CI STEPS PASSED SUCCESSFULLY!
==========================================================
```

---

## 3. End-to-End Real CRM Contract Verification (`npm run test:e2e`)

Executed via `scripts/e2e-real-crm.mjs` against the REAL CRM Express backend (`Bharat-Properties-CRM`) connected to an ephemeral local MongoDB replica set (`127.0.0.1:59091`).

### Test Architecture & Setup:
1. **Local Ephemeral MongoDB Replica Set:** Provisioned native `mongod` on `127.0.0.1:59091` (`rs0`), initiated single-node replica set, and awaited `isWritablePrimary` election.
2. **Synthetic Database Seeder:** Seeded 36 published deals across 7 cities, 3 projects with images/videos/masterPlan, and 1 inventory.
3. **Document Backfill Live Apply:** Executed `backfill_document_isPublic.cjs --apply --confirm-backup`. 79 media documents safely updated to `isPublic: true`.
4. **Real CRM Backend:** Started Express server on `127.0.0.1:59989` with `PUBLIC_API_KEY=test-real-crm-key-999` and opt-in categories (`PUBLIC_DOCUMENT_CATEGORIES=floor-plan,layout-plan,site-plan,photo,image,video`). Verified `/api/public/health` returned HTTP 200.
5. **Real Website Production Build:** Built website WITHOUT `USE_MOCK_CRM`. `scripts/build.mjs` verified reachability to CRM `/projects?limit=1` via authenticated handshake and compiled static pages against the real CRM.
6. **Website Production Server:** Started Next.js production server on `127.0.0.1:59992`.

### Step-by-Step E2E Verification Results:

#### 1. Sitemap Invariants (`/sitemap.xml`)
- Total URLs in Sitemap: **56**
- Property URLs in Sitemap: **36** (Requirement $\ge 35$: **PASS**)
- Project URLs in Sitemap: **3** (Requirement $\ge 3$: **PASS**)
- Structural Validity: Valid XML with canonical domain URLs.

#### 2. Deep Contract Checks on 3 Properties & 2 Projects

- **Property 1 (`deal-1-luxury-2-bhk-villa-mohali` - Collector Fields Present):**
  - HTTP Status: `200 OK`
  - Heading Check: Exactly one `<h1>`
  - JSON-LD Schema: Parses cleanly (2 blocks: `RealEstateListing` + `BreadcrumbList`)
  - Price & Size: Both present (`₹ 40.00 Lac`, `115 Sq Yard`)
  - Cost Sheet: "Official Circle Rate Details" and "State Assessed Rate" cards rendered as expected (**PASS**)
  - Clean Rendering: Zero raw `'undefined'`, `'null'`, or `'NaN'` text in rendered HTML
  - Gallery Media Comparison:
    - CRM Raw Media: 2 builtup images, 0 property images, 0 documents
    - Website Rendered: 3 unique media URLs (explained by `websiteMetadata.featuredImage` prepended + 2 builtup images deduplicated and optimized via Next.js `/_next/image`)
    - **Verdict:** **PASS**

- **Property 2 (`deal-2-luxury-3-bhk-apartment-kurukshetra` - Collector Fields Present):**
  - HTTP Status: `200 OK`
  - Heading Check: Exactly one `<h1>`
  - JSON-LD Schema: Parses cleanly (2 blocks)
  - Price & Size: Both present (`₹ 55.00 Lac`, `130 Sq Yard`)
  - Cost Sheet: Collector rate information shown as expected (**PASS**)
  - Clean Rendering: Zero raw `'undefined'`, `'null'`, or `'NaN'` text
  - Gallery Media: CRM 2 items -> Rendered 3 unique media URLs (**PASS**)

- **Property 3 (`deal-20-luxury-1-bhk-independent-floor-kharar` - Collector Fields Absent):**
  - HTTP Status: `200 OK`
  - Heading Check: Exactly one `<h1>`
  - JSON-LD Schema: Parses cleanly (2 blocks)
  - Price & Size: Both present (`₹ 3.25 Cr`, `400 Sq Yard`)
  - Cost Sheet: Circle rate details card and collector rate tab strictly **HIDDEN** as expected (**PASS**)
  - Clean Rendering: Zero raw `'undefined'`, `'null'`, or `'NaN'` text (**PASS**)
  - Gallery Media: CRM 0 items -> Rendered 1 featured image URL (**PASS**)

- **Project 1 (`bharat-grand-city-kurukshetra`):**
  - HTTP Status: `200 OK`
  - Heading Check: Exactly one `<h1>`
  - JSON-LD Schema: Parses cleanly (2 blocks)
  - Clean Rendering: Zero raw `'undefined'`, `'null'`, or `'NaN'` text (**PASS**)

- **Project 2 (`aeropolis-it-industrial-park-mohali`):**
  - HTTP Status: `200 OK`
  - Heading Check: Exactly one `<h1>`
  - JSON-LD Schema: Parses cleanly (2 blocks)
  - Clean Rendering: Zero raw `'undefined'`, `'null'`, or `'NaN'` text (**PASS**)

#### 3. Contact Form Submission & Proxy IP Forwarding
- Endpoint: `POST http://127.0.0.1:59992/api/public/submit-lead`
- Client Forwarding Header: `X-Forwarded-For: 203.0.113.199`
- Proxy Response: `HTTP 201 Created` (`{"success":true,"message":"Inquiry received. We will contact you shortly."}`)
- CRM Verification: CRM backend log recorded incoming lead submission carrying `[X-Client-IP: 203.0.113.199]`
- **Verdict:** **PASS** (Confirmed proxy extraction and header forwarding without leaking sensitive data)

#### 4. Post-Deploy Production Verification Against Real CRM Build
Executed `node scripts/post-deploy-verify.mjs http://127.0.0.1:59992`:
- **Total Checks:** 64
- **Passed:** 64
- **Failed:** 0
- **Mock Strings Scan:** Home page, sitemap, sampled property, and sampled project all returned **0 forbidden mock strings** (no `mock-project`, `mock-prop`, or `Test Heights`).
- **Verdict:** **PASSED (Exit code 0)**.

---

## 4. UNVERIFIED / Out of Scope List

The following items are explicitly marked UNVERIFIED because they require external production systems prohibited in LOCAL ONLY mode:
1. **Live Production URLs:** No network calls were dispatched to `https://www.bharatproperties.co` or `https://api.bharatproperties.co`.
2. **Production Database:** No connection was opened to live MongoDB Atlas clusters.
3. **Vercel Remote Deployment:** All builds were performed locally with Next.js CLI.
