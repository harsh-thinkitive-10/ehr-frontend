#!/usr/bin/env node
/**
 * Regenerates the Orval SDK in src/sdk/generated from api-spec.json.
 *
 *   npm run generate:sdk                                        # use the committed api-spec.json
 *   SPEC_URL=<backend>/api-docs npm run generate:sdk -- --fetch # refresh api-spec.json first
 *   npm run generate:sdk -- --fetch --spec-url <backend>/api-docs
 *
 * The spec URL is a codegen-time input only; the app's runtime base URL is
 * VITE_API_BASE_URL. Exits non-zero on any failure.
 */
import { execFileSync } from 'node:child_process';
import { access, readFile, rename, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

import { generate } from 'orval';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const specPath = path.join(root, 'api-spec.json');
const bins = {
  eslint: 'node_modules/eslint/bin/eslint.js',
  prettier: 'node_modules/prettier/bin/prettier.cjs',
};

function run(tool, args) {
  execFileSync(process.execPath, [path.join(root, bins[tool]), ...args], {
    cwd: root,
    stdio: 'inherit',
  });
}

function argValue(flag) {
  const index = process.argv.indexOf(flag);

  return index === -1 ? undefined : process.argv[index + 1];
}

async function fetchSpec() {
  const specUrl = argValue('--spec-url') ?? process.env.SPEC_URL;

  if (!specUrl) {
    throw new Error('--fetch needs the spec URL: set SPEC_URL or pass --spec-url <url>');
  }

  console.log(`→ fetching spec: ${specUrl}`);

  const response = await fetch(specUrl, { signal: AbortSignal.timeout(30_000) });
  const body = await response.text();

  if (!response.ok) {
    throw new Error(`could not fetch ${specUrl}: HTTP ${response.status}`);
  }

  // An error page or a login redirect would wreck the SDK, so reject it here.
  let spec;
  try {
    spec = JSON.parse(body);
  } catch {
    spec = undefined;
  }
  if (!spec?.openapi) {
    throw new Error(`response is not an OpenAPI document: ${body.slice(0, 200)}`);
  }

  const tmpPath = `${specPath}.tmp`;
  await writeFile(tmpPath, JSON.stringify(spec, null, 2) + '\n');
  await rename(tmpPath, specPath);
  run('prettier', ['--write', 'api-spec.json', '--log-level', 'warn']);
}

async function main() {
  if (process.argv.includes('--fetch')) {
    await fetchSpec();
  } else {
    await readFile(specPath).catch(() => {
      throw new Error('api-spec.json not found; run with --fetch against a running backend');
    });
    console.log('→ using committed api-spec.json');
  }

  console.log('→ generating');
  await rm(path.join(root, 'src/sdk/generated'), { recursive: true, force: true });
  await generate(path.join(root, 'orval.config.ts'));

  // Orval logs spec/validation errors but still resolves; it just writes nothing.
  await access(path.join(root, 'src/sdk/generated/index.ts')).catch(() => {
    throw new Error('Orval produced no output; see the errors above');
  });

  // verbatimModuleSyntax requires `import type` for type-only imports.
  console.log('→ normalizing type-only imports');
  run('eslint', [
    '--no-config-lookup',
    '-c',
    'scripts/eslint.sdk-codegen.config.js',
    '--fix',
    'src/sdk/generated/**/*.ts',
  ]);
  run('prettier', ['--write', 'src/sdk/generated/**/*.ts', '--log-level', 'warn']);

  console.log('Done. Next: npm run typecheck');
}

main().catch((error) => {
  console.error(`error: ${error instanceof Error ? error.message : error}`);
  process.exit(1);
});
