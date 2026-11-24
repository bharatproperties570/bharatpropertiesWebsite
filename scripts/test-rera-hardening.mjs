/**
 * Unit Test Suite: RERA Hardening & Anti-Leak Safeguards
 *
 * Verifies:
 * 1. Fails if any string matching /RERA[-A-Z0-9]*\d{3,}/ or "PBRERA" appears hardcoded in src/
 *    (env-driven values excluded).
 * 2. Pure RERA helper returns empty array and undefined licenses when env vars are unset.
 * 3. State-specific labels ("HRERA Reg: <val>" and "Punjab RERA Reg: <val>") render only when set.
 * 4. Generic fallback ("RERA Reg: <val>") renders only when state variables are absent.
 * 5. Schema.org graph omits the "license" property entirely when env vars are unset.
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

import { getReraRegistrations, getLicenses } from '../src/lib/rera.js';
import { organizationGraph } from '../src/lib/seo.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');
const srcDir = join(projectRoot, 'src');

test('RERA Static Scanner: fails if any string matching /RERA[-A-Z0-9]*\\d{3,}/ or "PBRERA" appears hardcoded in src/', () => {
  const reraRegex = /RERA[-A-Z0-9]*\d{3,}/;
  const pbreraRegex = /PBRERA/;
  const violations = [];

  function scanDirectory(dir) {
    const entries = readdirSync(dir);
    for (const entry of entries) {
      const fullPath = join(dir, entry);
      const stat = statSync(fullPath);

      if (stat.isDirectory()) {
        scanDirectory(fullPath);
      } else if (/\.(jsx?|tsx?|json|css|html)$/.test(entry)) {
        const content = readFileSync(fullPath, 'utf8');
        const lines = content.split('\n');

        lines.forEach((line, index) => {
          // Check for hardcoded forbidden RERA number patterns or "PBRERA"
          if (reraRegex.test(line) || pbreraRegex.test(line)) {
            violations.push(`${fullPath}:${index + 1}: ${line.trim()}`);
          }
        });
      }
    }
  }

  scanDirectory(srcDir);

  assert.deepEqual(
    violations,
    [],
    `Found hardcoded RERA numbers or 'PBRERA' in src/:\n${violations.join('\n')}`
  );
});

test('RERA Scanner Invariant: correctly flags synthetic sample RERA numbers', () => {
  const reraRegex = /RERA[-A-Z0-9]*\d{3,}/;
  const pbreraRegex = /PBRERA/;

  assert.ok(reraRegex.test('RERA-HR-KKR-2024-001234'));
  assert.ok(reraRegex.test('RERA-PB-SAS-2023-00789'));
  assert.ok(reraRegex.test('RERA123456'));
  assert.ok(pbreraRegex.test('PBRERA-HRY06-0050'));
  assert.ok(pbreraRegex.test('PBRERA'));

  // Normal informational text must not match
  assert.ok(!reraRegex.test('Ensure project holds a valid state RERA registration'));
  assert.ok(!reraRegex.test('Punjab RERA portal'));
  assert.ok(!reraRegex.test('HRERA for Haryana'));
  assert.ok(!pbreraRegex.test('Punjab RERA portal'));
});

test('RERA Registration Helper: returns empty array when all env vars are unset or empty', () => {
  const emptyEnv = {
    NEXT_PUBLIC_RERA_NUMBER_HARYANA: '',
    NEXT_PUBLIC_RERA_NUMBER_PUNJAB: '',
    NEXT_PUBLIC_RERA_NUMBER: '',
  };

  const registrations = getReraRegistrations(emptyEnv);
  assert.deepEqual(registrations, [], 'Should return no registrations when env is empty');

  const licenses = getLicenses(emptyEnv);
  assert.equal(licenses, undefined, 'License should be undefined when no registrations exist');
});

test('RERA Registration Helper: supports Haryana state-specific registration', () => {
  const haryanaEnv = {
    NEXT_PUBLIC_RERA_NUMBER_HARYANA: 'HRERA-PKL-GGM-1234-2026',
    NEXT_PUBLIC_RERA_NUMBER_PUNJAB: '',
    NEXT_PUBLIC_RERA_NUMBER: '',
  };

  const registrations = getReraRegistrations(haryanaEnv);
  assert.equal(registrations.length, 1);
  assert.equal(registrations[0].state, 'Haryana');
  assert.equal(registrations[0].label, 'HRERA Reg:');
  assert.equal(registrations[0].value, 'HRERA-PKL-GGM-1234-2026');

  const license = getLicenses(haryanaEnv);
  assert.equal(license, 'HRERA-PKL-GGM-1234-2026');
});

test('RERA Registration Helper: supports Punjab state-specific registration', () => {
  const punjabEnv = {
    NEXT_PUBLIC_RERA_NUMBER_HARYANA: '',
    NEXT_PUBLIC_RERA_NUMBER_PUNJAB: 'PBRERA-SAS80-REA0987',
    NEXT_PUBLIC_RERA_NUMBER: '',
  };

  const registrations = getReraRegistrations(punjabEnv);
  assert.equal(registrations.length, 1);
  assert.equal(registrations[0].state, 'Punjab');
  assert.equal(registrations[0].label, 'Punjab RERA Reg:');
  assert.equal(registrations[0].value, 'PBRERA-SAS80-REA0987');

  const license = getLicenses(punjabEnv);
  assert.equal(license, 'PBRERA-SAS80-REA0987');
});

test('RERA Registration Helper: supports dual Haryana + Punjab registrations simultaneously', () => {
  const dualEnv = {
    NEXT_PUBLIC_RERA_NUMBER_HARYANA: 'HRERA-PKL-001',
    NEXT_PUBLIC_RERA_NUMBER_PUNJAB: 'PBRERA-SAS-002',
    NEXT_PUBLIC_RERA_NUMBER: 'FALLBACK-IGNORED',
  };

  const registrations = getReraRegistrations(dualEnv);
  assert.equal(registrations.length, 2);
  assert.equal(registrations[0].label, 'HRERA Reg:');
  assert.equal(registrations[0].value, 'HRERA-PKL-001');
  assert.equal(registrations[1].label, 'Punjab RERA Reg:');
  assert.equal(registrations[1].value, 'PBRERA-SAS-002');

  const licenses = getLicenses(dualEnv);
  assert.deepEqual(licenses, ['HRERA-PKL-001', 'PBRERA-SAS-002']);
});

test('RERA Registration Helper: falls back to generic NEXT_PUBLIC_RERA_NUMBER only when state vars missing', () => {
  const genericEnv = {
    NEXT_PUBLIC_RERA_NUMBER_HARYANA: '',
    NEXT_PUBLIC_RERA_NUMBER_PUNJAB: '',
    NEXT_PUBLIC_RERA_NUMBER: 'GENERIC-RERA-999',
  };

  const registrations = getReraRegistrations(genericEnv);
  assert.equal(registrations.length, 1);
  assert.equal(registrations[0].label, 'RERA Reg:');
  assert.equal(registrations[0].value, 'GENERIC-RERA-999');

  const license = getLicenses(genericEnv);
  assert.equal(license, 'GENERIC-RERA-999');
});

test('JSON-LD Schema Guard: organizationGraph omits license field when env vars are unset', () => {
  // Save existing env
  const origHry = process.env.NEXT_PUBLIC_RERA_NUMBER_HARYANA;
  const origPb = process.env.NEXT_PUBLIC_RERA_NUMBER_PUNJAB;
  const origGeneric = process.env.NEXT_PUBLIC_RERA_NUMBER;

  try {
    delete process.env.NEXT_PUBLIC_RERA_NUMBER_HARYANA;
    delete process.env.NEXT_PUBLIC_RERA_NUMBER_PUNJAB;
    delete process.env.NEXT_PUBLIC_RERA_NUMBER;

    const graph = organizationGraph();
    const orgNode = graph['@graph'].find((n) => n['@id'] && n['@id'].endsWith('#org'));

    assert.ok(orgNode, 'Organization node must exist in graph');
    assert.equal(orgNode.license, undefined, 'Organization node must NOT have a license property when env is unset');

    const graphJson = JSON.stringify(graph);
    assert.ok(!graphJson.includes('"license"'), 'JSON-LD graph must not contain "license" when env is unset');
  } finally {
    // Restore env
    if (origHry !== undefined) process.env.NEXT_PUBLIC_RERA_NUMBER_HARYANA = origHry;
    if (origPb !== undefined) process.env.NEXT_PUBLIC_RERA_NUMBER_PUNJAB = origPb;
    if (origGeneric !== undefined) process.env.NEXT_PUBLIC_RERA_NUMBER = origGeneric;
  }
});

test('ReraBadge Component Code Verification: renders null when registrations are empty', () => {
  const componentPath = join(srcDir, 'components', 'ReraBadge.jsx');
  const code = readFileSync(componentPath, 'utf8');

  // Verify that it imports getReraRegistrations
  assert.ok(code.includes('getReraRegistrations'), 'ReraBadge must use getReraRegistrations');
  // Verify that it checks for empty registrations and returns null
  assert.ok(code.includes('return null'), 'ReraBadge must return null when registrations are empty');
  // Verify no hardcoded string fallback assignment
  assert.ok(!code.includes("|| '") && !code.includes('|| "'), 'ReraBadge must not contain string fallback expressions');
});

test('Page Text & Schema Guard: renders no RERA text when env vars are unset', () => {
  const emptyEnv = {
    NEXT_PUBLIC_RERA_NUMBER_HARYANA: '',
    NEXT_PUBLIC_RERA_NUMBER_PUNJAB: '',
    NEXT_PUBLIC_RERA_NUMBER: '',
  };

  const registrations = getReraRegistrations(emptyEnv);
  assert.equal(registrations.length, 0);

  const renderedText = registrations.map((r) => `${r.label} ${r.value}`).join(' ');
  assert.equal(renderedText, '');
  assert.ok(!renderedText.includes('RERA Reg:'));
  assert.ok(!renderedText.includes('HRERA Reg:'));
  assert.ok(!renderedText.includes('Punjab RERA Reg:'));

  const license = getLicenses(emptyEnv);
  assert.equal(license, undefined);
});

