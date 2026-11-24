# Bharat Properties - Owner Action Items & Verification Decisions (OWNER_TODO.md)

This document tracks every specific fact, credential, asset, and architectural setting required from the business owner and legal team. No marketing claims, RERA certificates, or credentials have been invented.

---

## 1. Compliance & Business Identifiers

- [x] **Official RERA Registration Number:**
  - **Status:** Verified and updated to `PBRERA-HRY06-0050`. Configured as active default and rendered via `ReraBadge.jsx` (Footer & About Page) and Schema.org `RealEstateAgent` organization graph metadata.
- [x] **Mohali Office Postal Code:**
  - **Status:** Verified and updated to `140306` (PR 7, Airport Road, Sector 82 Industrial Area, Mohali, Punjab). Confirmed across JSON-LD schemas and UI pages.
- [ ] **Official Mailbox Destinations:**
  - **Context:** Lead forms forward inquiries via CRM API.
  - **Action Required:** Confirm official administrative notification email (`info@bharatproperties.co` / `contact@bharatproperties.co`) and verify SPF, DKIM, and DMARC DNS records for transactional notifications.

---

## 2. Marketing Claims & FAQ Verification

- [ ] **FAQ Content Sign-Off:**
  - **Context:** In `src/content/faqs.js`, speculative appreciation rates, "verified GMADA-approved" builder claims, "documentation desk" claims, and Chandigarh leasehold assertions have been removed or made neutral.
  - **Action Required:** Review the current FAQ answers in `src/content/faqs.js`. If you wish to re-introduce specific service offerings, supply documented proof.
- [ ] **About Us History & Metrics:**
  - **Context:** Any quantitative figures (e.g. years of experience, customer counts, transaction volume) must reflect authentic company milestones.
  - **Action Required:** Review `src/components/AboutPage.jsx` and confirm exact metrics.

---

## 3. Media Assets & Self-Hosting

- [ ] **Hero Video Asset Self-Hosting:**
  - **Context:** The homepage hero video now checks for desktop screen, high-bandwidth connection, and `prefers-reduced-motion: no-preference`. It uses an optimized WebP poster image and lazy-loads video. However, the video stream currently references an external source.
  - **Action Required:** Provide an official branded MP4/WebM drone walkthrough of Tricity/Kurukshetra to self-host on the Bharat Properties CDN (`https://api.bharatproperties.co` or Cloudflare/Vercel Blob), removing external third-party media dependencies.

---

## 4. Production Environment Variables Required for Vercel

The following variables must be configured in Vercel (**Project Settings** -> **Environment Variables** -> **Production**):

- [ ] **`CRM_API_KEY` (CRITICAL / BLOCKER):**
  - **Required:** YES.
  - **Behavior:** The production build (`node scripts/build.mjs`) performs a 3-attempt authenticated check against `/projects?limit=1`. If missing or invalid (HTTP 401/403), the build **aborts immediately with exit code 1**. Mock data is strictly disabled on Vercel.
- [ ] **`CRM_API_BASE_URL`:**
  - **Optional:** Defaults to `https://api.bharatproperties.co/api/public`.
  - **API Capabilities Note:** The website server layer now calls `/listings?all=1` during build and sitemap generation to fetch the full catalog. Confirm the upstream CRM supports `all=1` (or returns the entire dataset). If unsupported, standard limit pagination is returned without breaking.
- [ ] **`GEMINI_API_KEY`:**
  - **Required:** YES, for the website AI chatbot (`/api/webhooks/website-chat`).
- [ ] **`NEXT_PUBLIC_SITE_URL`:**
  - **Required:** YES (`https://www.bharatproperties.co`).
- [ ] **`NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`:**
  - **Required:** YES, for Google Maps Store Locator and office map embeds.
- [ ] **`NEXT_PUBLIC_GA_ID`:**
  - **Optional:** Google Analytics 4 Measurement ID (`G-XXXXXXXXXX`).
- [ ] **`NEXT_PUBLIC_GSC_VERIFICATION`:**
  - **Optional:** Google Search Console site verification token.

---

## 5. Analytics, Webmaster & Legal Review

- [ ] **Google Analytics 4 (GA4):**
  - **Variable:** `NEXT_PUBLIC_GA_ID` (Format: `G-XXXXXXXXXX`).
  - **Action Required:** Provide the GA4 measurement ID and add it to Vercel Environment Variables. The codebase has custom event listeners wired for `lead_form_submit`, `phone_click`, `whatsapp_click`, and `direction_click`.
- [ ] **Google Search Console (GSC):**
  - **Variable:** `NEXT_PUBLIC_GSC_VERIFICATION`.
  - **Action Required:** Provide the GSC verification meta tag string and add to Vercel Environment Variables.
- [ ] **Privacy Policy Legal Review:**
  - **Context:** `src/components/PrivacyPolicy.jsx` describes data collection and analytics tracking.
  - **Action Required:** Have legal counsel review cookie disclosures once GA4 is activated in production.

---

## 5. Repository Protection & GitHub Settings

- [ ] **Branch Protection Rules (`main` branch):**
  - Navigate to **Settings** -> **Branches** in the GitHub repository.
  - Check **Require a pull request before merging**.
  - Check **Require status checks to pass before merging**:
    - Require `verify` (CI Quality Gate: lint, build, security audit, gitleaks, seo-check).
  - Check **Require branches to be up to date before merging**.
  - Check **Require linear history**.
  - Ensure **Do not allow force pushes** is checked.
- [ ] **Dependabot Alerts & PR Review:**
  - Verify that weekly Dependabot security PRs (configured in `.github/dependabot.yml`) are assigned to `@bharatproperties`.

---

## 6. Vercel Platform & Infrastructure Hardening

- [ ] **Transition Content Security Policy (CSP) from Report-Only to Enforced:**
  - **Context:** `next.config.js` currently serves `Content-Security-Policy-Report-Only` to collect telemetry without risking UI breakage across Google Maps, Google Fonts, and CRM image CDNs.
  - **Action Required:** After 7–14 days of monitoring production reports, rename `Content-Security-Policy-Report-Only` to `Content-Security-Policy` in `next.config.js`.
- [ ] **Distributed Rate Limiting Adapter (Upstash / Vercel KV):**
  - **Context:** `src/lib/rateLimit.js` provides an in-memory token bucket limiter with an adapter interface for Upstash Redis / Vercel KV. In-memory rate limiting is best-effort on ephemeral serverless instances.
  - **Action Required:** When monthly lead submission traffic scales, provision Upstash Redis or Vercel KV in the Vercel Marketplace and supply `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`.
- [ ] **Vercel WAF & DDoS Rules:**
  - In Vercel Project Settings -> **Security**, verify WAF is active and Attack Mode is ready if traffic spikes abnormally.
