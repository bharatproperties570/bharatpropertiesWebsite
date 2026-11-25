# Production Cutover State Machine

**Status:** IN PREPARATION  
**Last Updated:** 2026-11-25  
**Release Copilot:** Active (Read-Only / Local Enforcement Mode)  
**Execution Authority:** Repository Owner (Manual Production Gates)

---

## Part 0: Cutover Decisions

| Decision | Topic | Proposed Setting / Candidate | Owner Status | Notes |
|---|---|---|---|---|
| **D-A** | Document Categories | `photo,image,video,tour,walkthrough,floor-plan,layout-plan,site-plan,master-plan` | PENDING | KYC, deed, ID, agreements, customer forms are strictly excluded. |
| **D-B** | Cluster Mode / Redis | 1 instance (fork mode) unless multi-process detected; if multi-process, `REDIS_URL` required | PENDING | Verified via `pm2 jlist` during preflight. |
| **D-C** | Reverse Proxy Chain | `TRUST_PROXY_HOPS=1` (standard single proxy / Cloudflare) | PENDING | Confirmed via `backend/scripts/verify_proxy_hops.cjs`. |
| **D-D** | RERA Numbers | Haryana & Punjab numbers configured via env vars; graceful null display if unset | PENDING | Verified zero hardcoded values in code. |
| **D-E** | Maintenance Window | Recommended: Low-traffic window (e.g., 01:00-03:00 IST) | PENDING | Minimal customer impact window. |

---

## Cutover Gates Tracker (G1 – G13)

| Gate | Title | Description | Executor | Status | Notes / Output Ref |
|---|---|---|---|---|---|
| **G1** | MongoDB Atlas Backup | Take on-demand snapshot via Atlas Console | Owner | PENDING | Baseline recovery point |
| **G2** | CRM Env & Dependency Preflight | Run `npm run preflight:env` on CRM server | Owner | PENDING | Validates keys, proxy hops, Redis |
| **G3** | CRM Dual-Key Env Config | Configure `PUBLIC_API_KEY` alongside `WEBSITE_INTEGRATION_KEY` | Owner | PENDING | Zero-downtime key rotation |
| **G4** | CRM Schema & Index Backfill | Execute idempotent index & field migration scripts | Owner | PENDING | Dry-run first, then apply |
| **G5** | CRM Process Reload | Graceful reload via PM2 (`pm2 reload crm`) | Owner | PENDING | Zero dropped connections |
| **G6** | CRM Read-Only Health Check | Verify `/api/public/health` & endpoints return 200 | Owner / Copilot* | PENDING | *Requires owner read-only auth |
| **G7** | Website Vercel Env Setup | Configure production env vars in Vercel Dashboard | Owner | PENDING | `CRM_API_KEY`, site URL, etc. |
| **G8** | Website Vercel Preview Deploy | Build & test preview deployment on Vercel | Owner | PENDING | Run verify against preview URL |
| **G9** | Website Production Promotion | Promote preview to production or merge to deploy branch | Owner | PENDING | Vercel instant deployment |
| **G10** | Website Post-Deploy Verification | Run `npm run verify:prod` against production URL | Owner / Copilot* | PENDING | *Requires owner read-only auth |
| **G11** | End-to-End Lead Submission | Submit single test lead via public form & verify in CRM | Owner | PENDING | Verifies write pipeline & IP capture |
| **G12** | Legacy Key Decommission | Remove `WEBSITE_INTEGRATION_KEY` from CRM env & reload PM2 | Owner | PENDING | Closes dual-key window |
| **G13** | Post-Cutover Monitoring | Execute Day 1 / 2 / 7 monitoring runbook | Owner | PENDING | Track error rates, rate limits |

*Note: The copilot cannot access production environments or read-only endpoints without explicit command `AUTHORIZE READ-ONLY PROD CHECK <gate>` from the owner.*
