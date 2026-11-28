# Production Cutover State Machine

**Status:** GATE 1 IN PROGRESS  
**Last Updated:** 2026-11-28  
**Release Copilot:** Active (Read-Only / Local Enforcement Mode)  
**Execution Authority:** Repository Owner (Manual Production Gates)

---

## Part 0: Cutover Decisions

| Decision | Topic | Setting / Strategy | Owner Status | Notes |
|---|---|---|---|---|
| **D-A** | Document Categories | `photo,image,video,tour,walkthrough,floor-plan,layout-plan` (+ site-plan/master-plan per owner choice) | **CONFIRMED** | Replaces default list completely. KYC, deed, ID, agreements, customer forms are strictly excluded. |
| **D-B** | Cluster Mode / Redis | Owner running `pm2 list` on CRM host to supply instance count [1 / N] | **AWAITING COUNT** | If 1, in-memory rate limiting is safe. If > 1, `REDIS_URL` is mandatory. |
| **D-C** | Reverse Proxy Chain | `TRUST_PROXY_HOPS` tuned via `DEBUG_CLIENT_IP=1` during G6/G11 | **CONFIRMED** | Diagnostics verified via `backend/scripts/verify_proxy_hops.cjs`. |
| **D-D** | RERA Numbers | Owner pastes from certificates into Vercel; left unset if unavailable | **CONFIRMED** | Codebase verified: renders null gracefully with empty env vars (no hardcoded fallbacks). |
| **D-E** | Maintenance Window | Window: 01:00–03:00 IST; Owner on-call for 3 hours after last gate | **CONFIRMED** | Atlas snapshot retention set to 30 days for extended recovery capability. |

---

## Cutover Gates Tracker (G1 – G15)

| Gate | Title | Description | Executor | Status | Notes / Output Ref |
|---|---|---|---|---|---|
| **G1** | MongoDB Atlas Backup | Take on-demand snapshot via Atlas Console (30-day retention, wait Completed) | Owner | **IN PROGRESS** | Awaiting owner "Completed" |
| **G2** | DB User Rotation & Allowlist Audit | Create NEW DB user, update MONGODB_URI, pm2 restart <real-name> --update-env, mongosh/node ping + health ok + fresh pm2 time; audit allowlist, restrict to CRM IP (keep backfill IP); keep OLD user | Owner | PENDING | Dual-user fallback safe |
| **G3** | Capture BEFORE Snapshots | Capture BEFORE snapshots on old code (hidden prompt, curl -sf, mktemp -d, chmod 700/600, JSON check) for /listings?limit=1000 and /projects; owner pastes count; if count is 10, verify against DB count and abort only if real count > 10 | Owner | PENDING | Baseline data preservation |
| **G4** | Media Backfill DRY-RUN | Run backfill_document_isPublic.cjs in dry-run mode from separate clone (e.g. ~/crm-release); owner pastes only counts for review | Owner | PENDING | Zero DB writes; counts only |
| **G5** | Media Backfill LIVE APPLY | Run backfill_document_isPublic.cjs --apply --confirm-backup --tag from separate clone (e.g. ~/crm-release) | Owner | PENDING | Deterministic rollback tagged |
| **G6** | CRM Deploy & Env Hardening | Owner merges CRM branch; deploy code; set CRM env (PUBLIC_API_KEY, WEBSITE_INTEGRATION_KEY, TRUST_PROXY_HOPS, PUBLIC_API_LISTINGS_MAX, PUBLIC_DOCUMENT_CATEGORIES, REDIS_URL); pm2 restart --update-env; npm run preflight:env PASS; health 200 | Owner | PENDING | Code & env synchronization |
| **G7** | AFTER Snapshots & Contract Check | Capture AFTER snapshots (?limit=1000, owner pastes count) + compare-public-api.mjs contract mode from separate clone; delete snapshot dir; abort if contract field lost or listing missing | Owner / Copilot* | PENDING | Zero contract field loss |
| **G8** | Website Vercel Env Setup | Configure production env vars in Vercel; verify names via npm run env:check (pasted by owner; RERA only from certs) | Owner | PENDING | Paste env:check names only |
| **G9** | Website PR Merge to Main | Merge website PR to main (Vercel auto-deploys production; bad key/env fails build keeping old site live) | Owner | PENDING | Auto-deploy to production edge |
| **G10** | Website Post-Deploy Verification | Run npm run verify:prod against https://www.bharatproperties.co (after AUTHORIZE READ-ONLY PROD CHECK) | Owner / Copilot* | PENDING | *Requires owner read-only auth |
| **G11** | Visitor-IP Disambiguation Check | Submit form from Wi-Fi AND mobile data; CRM logs show 2 distinct masked client IPs; tune TRUST_PROXY_HOPS with DEBUG_CLIENT_IP=1 if not | Owner | PENDING | Rate limiter key verification |
| **G12** | End-to-End Test Lead Verification | Submit one real test lead via public website form; confirm appearance in CRM; delete test lead | Owner | PENDING | Write pipeline verification |
| **G13** | Search Console & Performance | Verify domain in Google Search Console, submit sitemap.xml, run PageSpeed mobile check | Owner | PENDING | SEO & crawl validation |
| **G14** | Legacy Key & Old DB User Decommission | After 48h healthy traffic: remove WEBSITE_INTEGRATION_KEY, pm2 restart --update-env, check-old-key-revoked.sh expects 401, delete OLD Atlas DB user | Owner | PENDING | Final security cleanup |
| **G15** | Post-Cutover Monitoring | Execute Day 1 / 2 / 7 monitoring runbook (docs/MONITORING.md) | Owner | PENDING | Track error rates, rate limits |

*Note: The copilot cannot access production environments or read-only endpoints without explicit command `AUTHORIZE READ-ONLY PROD CHECK <gate>` from the owner.*
