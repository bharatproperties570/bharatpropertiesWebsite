/**
 * Production Mock Leak Detector
 *
 * Scans the built Next.js server output (.next/server/app) to verify that
 * no mock test artifacts ('mock-project', 'mock-prop') leaked into static
 * or server bundles during a production build.
 */

import fs from 'node:fs';
import path from 'node:path';

const FORBIDDEN_STRINGS = ['mock-project', 'mock-prop'];
const TARGET_DIR = path.resolve(process.cwd(), '.next/server/app');

function scanDirectory(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanDirectory(fullPath, fileList);
    } else if (entry.isFile()) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

function findViolations(dir) {
  const files = scanDirectory(dir);
  const violations = [];

  for (const file of files) {
    try {
      const content = fs.readFileSync(file, 'utf-8');
      for (const pattern of FORBIDDEN_STRINGS) {
        if (content.includes(pattern)) {
          const relPath = path.relative(process.cwd(), file);
          violations.push({ file: relPath, pattern });
        }
      }
    } catch {
      // Binary or non-UTF8 files can be safely skipped
    }
  }

  return violations;
}

function runUnitTest() {
  console.log('🧪 Running unit-style self-test for mock leak detector...');
  const testDir = path.resolve(process.cwd(), '.next/test-leak-probe');
  fs.mkdirSync(testDir, { recursive: true });
  fs.writeFileSync(path.join(testDir, 'test-clean.txt'), 'Genuine CRM Project Listing');
  fs.writeFileSync(path.join(testDir, 'test-leak.txt'), 'Leaked mock-project details');

  const violations = findViolations(testDir);
  fs.rmSync(testDir, { recursive: true, force: true });

  if (violations.length === 1 && violations[0].pattern === 'mock-project') {
    console.log('✅ Unit self-test passed: Leak detector correctly identified mock artifact violation.\n');
    return true;
  } else {
    console.error('❌ Unit self-test failed: Violation detection failed.', violations);
    process.exit(1);
  }
}

function run() {
  if (process.argv.includes('--test')) {
    runUnitTest();
    process.exit(0);
  }

  // Always run self-test first to prove the detector functions
  runUnitTest();

  console.log('======================================================');
  console.log('🔍 Checking for Mock Data Leaks in Production Build');
  console.log(`   Target Directory: ${TARGET_DIR}`);
  console.log('======================================================\n');

  if (process.env.USE_MOCK_CRM === '1') {
    console.log('[leak-check] ⚠️ Notice: USE_MOCK_CRM=1 is explicitly set in environment.');
    console.log('[leak-check] Skipping scan on intentional mock build output.');
    console.log('[leak-check] For non-mock builds, this check scans and fails on any mock artifacts.\n');
    process.exit(0);
  }

  if (!fs.existsSync(TARGET_DIR)) {
    console.error(`[leak-check] ❌ Error: Build directory not found at ${TARGET_DIR}`);
    console.error('[leak-check] Run "npm run build" before running the mock leak check.');
    process.exit(1);
  }

  const violations = findViolations(TARGET_DIR);

  if (violations.length > 0) {
    console.error('[leak-check] ❌ CRITICAL FAILURE: Mock test data leaked into production build output!');
    console.error(`             Found ${violations.length} forbidden mock reference(s):\n`);
    for (const v of violations) {
      console.error(`  - In "${v.file}": contains forbidden string "${v.pattern}"`);
    }
    console.error('\n[leak-check] Production builds must be run with genuine CRM credentials without USE_MOCK_CRM.');
    process.exit(1);
  }

  console.log('✅ PASS: Clean production build verified. Zero mock artifacts found in .next/server/app.\n');
  process.exit(0);
}

run();
