# Local CI Execution Report: Bharat Properties Website

- **Repository:** `bharatpropertiesWebsite`
- **Branch:** `seo/phase-12`
- **Commit Hash:** `6ca61ec`
- **Execution Timestamp:** 2026-11-25T08:09:13Z
- **Node Version:** `v20.20.2`
- **Environment:** Local Isolated Sandbox (Mock CRM / Local HTTP)

---

## 1. Summary Pass / Fail Table

| Step # | Command / Check Description | Exit Code | Status | Notes |
| :--- | :--- | :---: | :---: | :--- |
| **1** | `npm ci` | 0 | **PASS** | Clean dependency tree installed (358 packages). |
| **2** | `npm audit --omit=dev --audit-level=high` | 0 | **PASS** | 0 high or critical production vulnerabilities. |
| **3** | `npm run lint` | 0 | **PASS** | ESLint static analysis passed with zero errors/warnings. |
| **4** | `npm test` | 0 | **PASS** | All 40 unit and invariant tests passed in 222ms. |
| **5** | `USE_MOCK_CRM=1 npm run build` | 0 | **PASS** | Next.js 15 production build; 24/24 static pages generated. |
| **6** | `npm run seo:check` | 0 | **PASS** | 114/114 assertions passed across SSR, schemas, redirects. |
| **7** | Negative Build: Unreachable CRM | 1 | **PASS** | Aborted build with exit code 1 as expected. |
| **8** | Negative Build: `VERCEL=1 USE_MOCK_CRM=1` | 1 | **PASS** | Overrode mock flag, aborted build with exit code 1. |
| **9** | Secret Scan (`node scripts/secret-scan.mjs`) | 0 | **PASS** | Scanned for `AIza`, `BP-WEB-INTEGRATION`, `mongodb+srv`, `Bearer`. |

---

## 2. Command Details & Trimmed Outputs

### Step 1: `npm ci`
- **Command:** `npm ci`
- **Exit Code:** `0`
- **Output:**
  ```text
  added 358 packages, and audited 359 packages in 21s
  141 packages are looking for funding
  ```

### Step 2: Security Audit
- **Command:** `npm audit --omit=dev --audit-level=high`
- **Exit Code:** `0`
- **Output:**
  ```text
  found 0 vulnerabilities
  ```

### Step 3: Linting
- **Command:** `npm run lint`
- **Exit Code:** `0`
- **Output:**
  ```text
  > eslint .
  (clean exit, 0 errors, 0 warnings)
  ```

### Step 4: Unit & Invariant Tests
- **Command:** `npm test`
- **Exit Code:** `0`
- **Output:**
  ```text
  > node --test scripts/test-*.mjs

  ✔ RERA Static Scanner: fails if any string matching /RERA[-A-Z0-9]*\d{3,}/ appears hardcoded in src/
  ✔ RERA Scanner Invariant: correctly flags synthetic sample RERA numbers
  ✔ RERA Registration Helper: returns empty array when all env vars are unset or empty
  ✔ RERA Registration Helper: supports Haryana state-specific registration
  ✔ RERA Registration Helper: supports Punjab state-specific registration
  ✔ RERA Registration Helper: supports dual Haryana + Punjab registrations simultaneously
  ✔ RERA Registration Helper: falls back to generic NEXT_PUBLIC_RERA_NUMBER only when state vars missing
  ✔ JSON-LD Schema Guard: organizationGraph omits license field when env vars are unset
  ✔ ReraBadge Component Code Verification: renders null when registrations are empty
  ✔ Page Text & Schema Guard: renders no RERA text when env vars are unset
  ✔ countLocEntries: correctly extracts and counts total, property, and project URLs
  ✔ Visitor IP: extracts valid IPv4 / IPv6 and enforces platform header precedence
  ✔ Proxy Query Sanitizer: strips all=1 and clamps limit to max 200
  ℹ tests 40 | pass 40 | fail 0 | duration_ms 222.86
  ```

### Step 5: Production Build (Mock CRM)
- **Command:** `USE_MOCK_CRM=1 npm run build`
- **Exit Code:** `0`
- **Output:**
  ```text
  [build] 🧪 USE_MOCK_CRM=1 active (Local/CI). Starting mock CRM on port 60233...
  [mock-crm] Mock CRM running on http://127.0.0.1:60233/api/public
  Creating an optimized production build ...
  ✓ Compiled successfully
  ✓ Linting and checking validity of types
  ✓ Generating static pages (24/24)
  ✓ Finalizing page optimization
  ```

### Step 6: SEO & Quality Gates
- **Command:** `npm run seo:check`
- **Exit Code:** `0`
- **Output:**
  ```text
  [1/4] Starting Mock CRM on port 60316...
  [2/4] Starting Next.js production server on port 60317...
  [3/4] Awaiting server readiness via /api/health...
  [4/4] Executing Assertions...
  Quality Gate Summary: 114 Passed, 0 Failed
  🎉 All SEO, SSR, Redirect & Schema Quality Gates PASSED!
  ```

### Step 7: Negative Build Test 1 (Unreachable CRM)
- **Command:** `CRM_API_KEY=invalid-test-key CRM_API_BASE_URL=http://127.0.0.1:9 USE_MOCK_CRM= node scripts/build.mjs`
- **Exit Code:** `1` (Expected failure)
- **Output:**
  ```text
  [build] Verifying upstream CRM authentication (attempt 1/3) at http://127.0.0.1:9/projects?limit=1...
  [build] ⚠️ Connection error on attempt 1: fetch failed
  [build] Verifying upstream CRM authentication (attempt 2/3) at http://127.0.0.1:9/projects?limit=1...
  [build] ⚠️ Connection error on attempt 3: fetch failed
  [build] ❌ BLOCKER ERROR: Upstream CRM is unreachable or unauthorized.
  [build] Build aborted to prevent deploying broken static pages.
  ✅ PASS: Unreachable CRM failed as expected (exit code: 1)
  ```

### Step 8: Negative Build Test 2 (`VERCEL=1 USE_MOCK_CRM=1`)
- **Command:** `VERCEL=1 USE_MOCK_CRM=1 CRM_API_KEY=test-key CRM_API_BASE_URL=http://127.0.0.1:9 node scripts/build.mjs`
- **Exit Code:** `1` (Expected failure)
- **Output:**
  ```text
  [build] ⚠️ Detected Vercel deployment environment. Overriding USE_MOCK_CRM=1 -> Real CRM required.
  [build] Verifying upstream CRM authentication (attempt 1/3) at http://127.0.0.1:9/projects?limit=1...
  [build] ❌ BLOCKER ERROR: Upstream CRM is unreachable or unauthorized.
  [build] Build aborted to prevent deploying broken static pages.
  ✅ PASS: VERCEL=1 USE_MOCK_CRM=1 overridden and failed as expected (exit code: 1)
  ```

### Step 9: Secret Scan
- **Command:** `node scripts/secret-scan.mjs`
- **Exit Code:** `0`
- **Output:**
  ```text
  🔒 Scanning repository for credential patterns (AIza, BP-WEB-INTEGRATION, mongodb+srv, Bearer tokens)...
  ✅ Secret Scan PASSED: No credentials or secret literals found.
  ```

---

## 3. Post-Deploy Production Verification Against Local Server

The verification suite (`node scripts/post-deploy-verify.mjs http://127.0.0.1:59991`) was executed against the local production Next.js build.

### Summary
- **Total Checks:** 62
- **Passed:** 58
- **Failed:** 4 (All 4 are **Expected Mock-Data Failures**)

### Failure Explanation Table

| Check Name | Target URL | Failure Output | Root Cause / Explanation | Classification |
| :--- | :--- | :--- | :--- | :--- |
| **Home Page Mock Strings Scan** | `/` | `mock-project, mock-prop` | Home page lists featured projects and deals sourced from the local mock CRM during build. | **Expected Mock Failure** (Artifact of `USE_MOCK_CRM=1`) |
| **Sitemap XML Mock Strings Scan** | `/sitemap.xml` | `mock-project, mock-prop` | Sitemap includes `/property/mock-prop-1` and `/project/mock-project-1` from the mock catalog. | **Expected Mock Failure** (Artifact of `USE_MOCK_CRM=1`) |
| **Sampled Project Page Body** | `/project/mock-project-1` | `mock-project` | The project slug and body contain the mock identifier by definition. | **Expected Mock Failure** (Artifact of `USE_MOCK_CRM=1`) |
| **Sampled Property Page Body** | `/property/mock-prop-18` | `mock-prop` | The property slug and body contain the mock identifier by definition. | **Expected Mock Failure** (Artifact of `USE_MOCK_CRM=1`) |

### Verification of All Other 58 Rules (100% Passed)
- `/api/health` returned HTTP 200 with `crmReachable: true`.
- Core pages (`/`, `/about`, `/blog`, `/kurukshetra`, `/mohali`) returned HTTP 200, exactly one `<h1>`, canonical on `https://www.bharatproperties.co`, non-empty `<title>`, and valid JSON-LD schemas.
- Utility pages (`/calculator`, `/locations`, `/privacy`, `/terms`) returned HTTP 200, exactly one `<h1>`, non-empty `<title>`, and canonical on `https://www.bharatproperties.co`.
- `/delhi` correctly returned `noindex`.
- Unknown URLs correctly returned HTTP 404 with `noindex`.
- `/blog/blog-1` correctly returned HTTP 308 permanent redirect.
- `/sitemap.xml` parsed as valid XML containing 43 total URLs (25 properties, 1 project). Deep-sampling 5 random properties and 1 project verified all returned 200, 1 H1, and valid JSON-LD.
- `/robots.txt` contained sitemap reference and `/api/` disallow directives.
- Security headers were verified on `/`: `Strict-Transport-Security`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `Content-Security-Policy-Report-Only`, and `X-Powered-By` absent.
- `POST /api/public/submit-lead` with foreign origin returned HTTP 403.
- `GET /api/public/admin/users` blocked with HTTP 404.
