#!/usr/bin/env bash
set -eo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
cd "${REPO_ROOT}"

echo "=========================================================="
echo "🚀 Bharat Properties Website - Local CI Suite"
echo "Commit: $(git rev-parse --short HEAD)"
echo "Branch: $(git rev-parse --abbrev-ref HEAD)"
echo "Timestamp: $(date -u +"%Y-%m-%dT%H:%M:%SZ")"
echo "=========================================================="

step() {
  echo ""
  echo ">>> Step $1: $2"
  echo "----------------------------------------------------------"
}

# 1. npm ci
step 1 "Clean Dependency Installation (npm ci)"
npm ci

# 2. npm audit
step 2 "Security Audit (npm audit --omit=dev --audit-level=high)"
npm audit --omit=dev --audit-level=high

# 3. lint
step 3 "Linting & Static Analysis (npm run lint)"
npm run lint

# 4. npm test
step 4 "Unit & Security Invariant Tests (npm test)"
npm test

# 5. build with mock CRM
step 5 "Production Next.js Build with Mock CRM (USE_MOCK_CRM=1 npm run build)"
USE_MOCK_CRM=1 npm run build

# 6. seo:check
step 6 "SEO, SSR, Redirect & Schema Quality Gates (npm run seo:check)"
npm run seo:check

# 7. negative build (unreachable CRM must exit non-zero)
step 7 "Negative Build Test 1: Unreachable CRM must fail build (exit non-zero)"
set +e
CRM_API_KEY=invalid-test-key CRM_API_BASE_URL=http://127.0.0.1:9 USE_MOCK_CRM= node scripts/build.mjs
EXIT_CODE=$?
set -e
if [ $EXIT_CODE -eq 0 ]; then
  echo "❌ FAIL: Expected build with unreachable CRM to fail, but it exited 0!"
  exit 1
fi
echo "✅ PASS: Unreachable CRM failed as expected (exit code: ${EXIT_CODE})"

# 8. VERCEL=1 USE_MOCK_CRM=1 negative build (must not start mock, must exit non-zero)
step 8 "Negative Build Test 2: VERCEL=1 USE_MOCK_CRM=1 must override mock and fail (exit non-zero)"
set +e
VERCEL=1 USE_MOCK_CRM=1 CRM_API_KEY=test-key CRM_API_BASE_URL=http://127.0.0.1:9 node scripts/build.mjs
EXIT_CODE=$?
set -e
if [ $EXIT_CODE -eq 0 ]; then
  echo "❌ FAIL: Expected VERCEL=1 USE_MOCK_CRM=1 build to override mock and fail, but it exited 0!"
  exit 1
fi
echo "✅ PASS: VERCEL=1 USE_MOCK_CRM=1 overridden and failed as expected (exit code: ${EXIT_CODE})"

# 9. secret scan
step 9 "Secret Scan (API keys, CRM keys, MongoDB Atlas URIs, Bearer tokens)"
node scripts/secret-scan.mjs

echo ""
echo "=========================================================="
echo "🎉 ALL 9 LOCAL CI STEPS PASSED SUCCESSFULLY!"
echo "=========================================================="
