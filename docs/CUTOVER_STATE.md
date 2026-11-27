# Production Cutover State Machine

**Status:** GATE 1 IN PROGRESS  
**Last Updated:** 2026-11-26  
**Release Copilot:** Active (Read-Only / Local Enforcement Mode)  
**Execution Authority:** Repository Owner (Manual Production Gates)

---

## Part 0: Cutover Decisions

| Decision | Topic | Setting / Strategy | Owner Status | Notes |
|---|---|---|---|---|
| **D-A** | Document Categories | `photo,image,video,tour,walkthrough,floor-plan,layout-plan` (+ site-plan/master-plan per owner choice) | **CONFIRMED** | Replaces default list completely. KYC, deed, ID, agreements, customer forms are strictly excluded. |
| **D-B** | Cluster Mode / Redis | Owner running `pm2 list` on CRM host to supply instance count [1 / N] | **AWAITING COUNT** | If 1, in-memory rate limiting is safe. If > 1, `REDIS_URL` is mandatory. |
| **D-C** | Reverse Proxy Chain | `TRUST_PROXY_HOPS` tuned via `DEBUG_CLIENT_IP=1` during G6/G10 | **CONFIRMED** | Diagnostics verified via `backend/scripts/verify_proxy_hops.cjs`. |
| **D-D** | RERA Numbers | Owner pastes from certificates into Vercel; left unset if unavailable | **CONFIRMED** | Codebase verified: renders null gracefully with empty env vars (no hardcoded fallbacks). |
| **D-E** | Maintenance Window | Window: 01:00–03:00 IST; Owner on-call for 3 hours after last gate | **CONFIRMED** | Atlas snapshot retention set to 30 days for extended recovery capability. |

---

## Cutover Gates Tracker (G1 – G13)

| Gate | Title | Description | Executor | Status | Notes / Output Ref |
|---|---|---|---|---|---|
| **G1** | MongoDB Atlas Backup | Take on-demand snapshot via Atlas Console (30-day retention) | Owner | **IN PROGRESS** | Awaiting owner "done" |
| **G2** | DB User Rotation & Preflight | Rotate DB user (new user -> verify health -> restrict IP -> delete old user) & preflight | Owner | PENDING | Dual-user fallback safe |
| **G3** | CRM Dual-Key Env Config | Configure `PUBLIC_API_KEY` alongside `WEBSITE_INTEGRATION_KEY` | Owner | PENDING | Zero-downtime key rotation |
| **G4** | CRM Schema & Index Backfill | Execute backfill over SSH on CRM host (or laptop with Atlas IP allowlist) | Owner | PENDING | Dry-run first, then apply with `--confirm-backup` |
| **G5** | CRM Process Reload | Graceful reload via PM2 (`pm2 reload crm`) over SSH | Owner | PENDING | Zero dropped connections |
| **G6** | CRM Read-Only Health Check | Verify `/api/public/health` & endpoints return 200 | Owner / Copilot* | PENDING | *Requires owner read-only auth |
| **G7** | Website Vercel Env Setup | Configure production env vars in Vercel; verify with `npm run env:check` | Owner | PENDING | Paste `env:check` output (names only) |
| **G8** | Website PR Merge & Verify | **Merge PR #1 ONLY at this gate**, build & test deployment on Vercel | Owner | PENDING | Run verify against preview/staging deployment |
| **G9** | Website Production Promotion | Promote deployment to production on Vercel | Owner | PENDING | Instant edge CDN pointer swap |
| **G10** | Website Post-Deploy Verification | Run `npm run verify:prod` against production URL | Owner / Copilot* | PENDING | *Requires owner read-only auth |
| **G11** | End-to-End Lead Submission | Submit single test lead via public form & verify in CRM | Owner | PENDING | Verifies write pipeline & IP capture |
| **G12** | Legacy Key Decommission | Remove `WEBSITE_INTEGRATION_KEY` from CRM env & reload PM2 | Owner | PENDING | Closes dual-key window |
| **G13** | Post-Cutover Monitoring | Execute Day 1 / 2 / 7 monitoring runbook (`docs/MONITORING.md`) | Owner | PENDING | Track error rates, rate limits |

*Note: The copilot cannot access production environments or read-only endpoints without explicit command `AUTHORIZE READ-ONLY PROD CHECK <gate>` from the owner.*
