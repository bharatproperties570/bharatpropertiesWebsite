# Bharat Properties — Owner SEO Action Items & Decisions (SEO_TODO.md)

This document tracks all unverified facts, business terms, legal identifiers, and configuration values that require verification or input from the business owner. In accordance with strict SEO and search engine quality guidelines, **no synthetic or invented facts were introduced**. Placeholders have been created in the codebase and are hidden from public rendering until supplied.

---

## 1. Environment Variables & Credentials to Set

Please set the following environment variables in your Vercel / deployment environment:

| Variable Name | Description | Current State / Action Needed |
| :--- | :--- | :--- |
| `CRM_API_KEY` | Server-side CRM API access key | Required for production CRM proxy. **Rotate old key in CRM!** |
| `CRM_API_BASE_URL` | CRM upstream endpoint | e.g. `https://crm.bharatproperties.co/api` |
| `NEXT_PUBLIC_SITE_URL` | Canonical domain | Configured default: `https://www.bharatproperties.co` |
| `NEXT_PUBLIC_RERA_NUMBER` | Official Haryana/Punjab RERA registration number | Unset. ReraBadge renders in footer & about page once set. |
| `NEXT_PUBLIC_FACEBOOK_URL` | Official Facebook business page URL | **VERIFIED:** `https://www.facebook.com/bharatproperties570` |
| `NEXT_PUBLIC_INSTAGRAM_URL` | Official Instagram business profile URL | **VERIFIED:** `https://www.instagram.com/bhaaratproperties` |
| `NEXT_PUBLIC_LINKEDIN_URL` | Official LinkedIn company page URL | **VERIFIED:** `https://www.linkedin.com/company/42752175/` |
| `NEXT_PUBLIC_TWITTER_URL` | Official X (Twitter) profile URL | Optional / Unset. |
| `NEXT_PUBLIC_YOUTUBE_URL` | Official YouTube channel URL | Optional / Unset. |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Google Maps Platform API key | Needed for interactive store locator on `/locations`. |

---

## 2. Critical Security Notice: CRM Key Rotation

> [!IMPORTANT]
> The legacy CRM API key (ending in `...X7Y9`) has been **completely purged** from all active code in `seo/phase-2`.
> However, because this key was committed in previous git history (prior commits on `main`), **you must immediately rotate / invalidate this key in your CRM backend system** and generate a new key to set in `CRM_API_KEY`.

---

## 3. Official Business Details & NAP Consistency

The following physical office addresses and phones are configured in `src/lib/seo.js` and public pages:

### Kurukshetra (Headquarters)
- **Address:** Shop No 166, Sector 3 Market, Kurukshetra, Haryana 136118
- **Primary Phone:** `+91-9991333570`
- **Email:** `info@bharatproperties.co`
- **Google Maps:** **VERIFIED:** `https://maps.app.goo.gl/Yfr1YSYGP1mrLbNR6`
- **Status:** Fully verified and active in footer, OfficeInfo, schemas, and `llms.txt`.

### Mohali (Regional Branch)
- **Address:** PR 7, Airport Road, Sector 82 Industrial Area, Mohali, Punjab
- **Postal Code (Pincode):** **ACTION NEEDED:** Please confirm the exact 6-digit postal code (e.g. `140306` or `160082`) so it can be added to the LocalBusiness schema in `src/lib/seo.js`.
- **Branch Phones:** `+91-9991000570`, `+91-9996000570`
- **Status:** Phones present in footer/office cards.

---

## 4. Email Accounts Verification

Please verify that the following email addresses actually exist and have active mailboxes before promoting them:
- `info@bharatproperties.co` — Main contact email across schemas, footer, and `llms.txt`.
- `privacy@bharatproperties.co` — Referenced in `/privacy`. Confirm this inbox is monitored or alias to `info@`.
- `legal@bharatproperties.co` — Referenced in `/terms`. Confirm this inbox is monitored or alias to `info@`.

---

## 5. FAQ Verification (Hidden Items with `TODO_OWNER`)

To protect your site from hallucinated legal or financial advice, the following FAQ items are currently marked `TODO_OWNER` in `src/content/faqs.js`. They are automatically **omitted from rendering and schema** until you provide verified wording:

1. **Stamp Duty & Registration Rates:**
   - *Question:* What are the standard stamp duty and property registration charges?
   - *Action:* Provide current Haryana (Kurukshetra) and Punjab (Mohali) slab rates for male vs. female buyers and rural vs. municipal limits.
2. **Brokerage & Advisory Fees:**
   - *Question:* What are the brokerage and advisory fees charged by Bharat Properties?
   - *Action:* State the exact fee structure (e.g. 1% / 2% on resale transactions, zero-brokerage on direct developer bookings, etc.).
3. **Circle Rates (Kurukshetra & Mohali):**
   - *Question:* What are the circle rates for residential land in Kurukshetra/Mohali?
   - *Action:* Confirm whether you wish to display sector-wise average circle rates or provide a direct link to the state revenue portal.
4. **GMADA Transfer Policies (Mohali) & Floor-wise Registration (Chandigarh):**
   - *Action:* Review current legal wording for share transfers and independent kothi floors.

---

## 6. Homepage H1 Approval

- **Current Visual Display:** Main banner shows large headline and subtitle.
- **Proposed Semantic H1:** `"Property Dealer in Kurukshetra & Mohali"` (with `"Bharat Properties"` subtitle).
- **SEO Benefit:** Directly targets high-intent commercial keyword ("Property Dealer in Kurukshetra", "Property Dealer in Mohali") while keeping the existing sleek typography and branding.
- **Status:** Implemented in `src/components/BP_Hero_Final_v4.jsx`. Awaiting owner sign-off.

---

## 7. Marketing Claims Needing Verification

The following existing claims from legacy pages were preserved visually to avoid altering design, but require factual verification for strict Google E-E-A-T compliance:
- Claim: `"$2B+"` in transaction volume (homepage stats).
- Claim: `"20+ years of experience"` (about/stats).
- Claim: Specific review counts / star ratings on static banners.
- **Action:** If these numbers are aspirational, consider updating them to verified figures (e.g. `"1,000+ happy families"`, `"Over 15 years in Kurukshetra"`).
