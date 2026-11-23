# Security Policy — Bharat Properties

## Reporting Security Issues

Bharat Properties takes the security of our platform and user data seriously. If you discover a security vulnerability, please disclose it responsibly:

- **Security Contact:** Email `security@bharatproperties.co` or `info@bharatproperties.co`.
- **Subject:** `[Vulnerability Report] Bharat Properties Web Platform`
- **Response Target:** We aim to acknowledge reports within 24 hours and provide an evaluation within 72 hours.
- Please include reproduction steps and avoid accessing or modifying customer data during testing.

---

## Secret Key Management & Rotation Procedure

### 1. Hardcoded Secrets Policy
- **Strict Rule:** Never hardcode API keys, database credentials, or secret tokens in the repository codebase.
- All secrets are injected exclusively through server-side environment variables (`CRM_API_KEY`, `GEMINI_API_KEY`, `CRM_API_BASE_URL`).
- Client-side code must **NEVER** have access to administrative or private API keys. Public variables must be prefixed with `NEXT_PUBLIC_` and contain only non-sensitive tokens (e.g., Google Maps JavaScript API key restricted by HTTP referer).

### 2. CRM API Key Rotation Procedure
If the CRM API key is ever compromised or scheduled for routine rotation:
1. **Generate New Key in CRM:**
   - Log into the Bharat Properties CRM admin portal.
   - Navigate to **Settings > Integrations > Web API Keys**.
   - Create a new API key (e.g. `BP-WEB-2026-NEW`).
2. **Update Hosting Environment (Vercel):**
   - In the Vercel Dashboard, navigate to **Project Settings > Environment Variables**.
   - Update `CRM_API_KEY` for Production and Preview environments with the new key value.
   - Trigger a project redeploy so serverless functions load the new variable.
3. **Verify Upstream Connectivity:**
   - Test `/api/public/projects` and ensure responses return HTTP 200.
4. **Revoke Old Key:**
   - In the CRM admin portal, revoke / delete the old API key.

### 3. Gemini API Key Rotation Procedure
1. Go to Google AI Studio or Google Cloud Console.
2. Generate a new API key under your project and configure IP/API restrictions.
3. Update `GEMINI_API_KEY` in Vercel project environment variables.
4. Redeploy the application.
5. Invalidate the old key in Google AI Studio.

---

## Network & Defense-in-Depth Protections

1. **Content Security Policy (CSP):**
   - Configured in `next.config.js` in `Content-Security-Policy-Report-Only` mode to safely discover any third-party resource violations.
   - **How to enforce:** Change the header key from `Content-Security-Policy-Report-Only` to `Content-Security-Policy` once report logs show zero false positives.
2. **Reverse Proxy Protection (`/api/public/*`):**
   - Only explicitly allowlisted public CRM endpoints are proxied.
   - POST requests require Same-Origin validation matching `https://www.bharatproperties.co`.
   - Incoming payloads are strictly capped at 100 KB and must be `application/json`.
3. **Anti-Spam & Rate Limiting:**
   - In-memory rate limiting shields endpoints against bursts (lead submissions capped at 5 req/min per IP, chatbot at 15 req/min).
   - Server-side field validation, phone normalization (Indian 10-digit mobile), honeypot detection (`_gotcha`), and minimum human fill-time guards reject automated form spam.
