/**
 * Secret Scanner Script
 * Scans repository files (excluding docs, .git, .next, node_modules) for leaked credentials.
 * Patterns checked:
 *  - AIza Google API key prefix
 *  - BP-WEB-INTEGRATION legacy key prefix
 *  - mongodb+srv connection strings
 *  - Hardcoded "Bearer <token>" literals outside test assertions and docs
 */

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const projectRoot = process.cwd();

const patterns = [
  { name: 'Google API Key (AIza...)', regex: /AIza[0-9A-Za-z_-]{20,}/ },
  { name: 'Legacy CRM Key (BP-WEB-INTEGRATION...)', regex: /BP-WEB-INTEGRATION/ },
  { name: 'MongoDB Atlas URI (mongodb+srv...)', regex: /mongodb\+srv:\/\// },
  { name: 'Bearer Secret Literal', regex: /["'`]Bearer\s+(?!test-|attacker-|\$\{)[A-Za-z0-9_\-\.]{15,}["'`]/ },
];

const ignoredDirs = new Set(['.git', '.next', 'node_modules', '.gemini']);
const ignoredFiles = new Set(['package-lock.json', 'local-ci.sh', 'secret-scan.mjs']);

let violations = [];

function scan(dir) {
  for (const file of readdirSync(dir)) {
    if (ignoredDirs.has(file)) continue;
    const fullPath = join(dir, file);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      scan(fullPath);
    } else {
      // Exclude markdown documentation files (*.md)
      if (file.endsWith('.md') || ignoredFiles.has(file)) continue;

      const content = readFileSync(fullPath, 'utf8');
      const lines = content.split('\n');

      lines.forEach((line, idx) => {
        // Skip scanning the secret scanner itself for pattern definitions
        if (file === 'secret-scan.mjs') return;

        for (const p of patterns) {
          if (p.regex.test(line)) {
            violations.push({
              file: fullPath.replace(projectRoot + '/', ''),
              line: idx + 1,
              pattern: p.name,
              snippet: line.trim().slice(0, 80),
            });
          }
        }
      });
    }
  }
}

console.log('🔒 Scanning repository for credential patterns (AIza, BP-WEB-INTEGRATION, mongodb+srv, Bearer tokens)...');
scan(projectRoot);

if (violations.length > 0) {
  console.error(`\n❌ Secret Scan FAILED: Found ${violations.length} potential credential leak(s):`);
  violations.forEach((v) => {
    console.error(`  - ${v.file}:${v.line} [${v.pattern}]: ${v.snippet}`);
  });
  process.exit(1);
} else {
  console.log('✅ Secret Scan PASSED: No credentials or secret literals found.');
  process.exit(0);
}
