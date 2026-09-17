#!/usr/bin/env bash
# Regenerates the typed OpenAPI SDK + TanStack Query hooks in src/sdk.
#
#   npm run gen:api                                          # backend must be running on :8080
#   npm run gen:api -- --offline                             # reuse the committed api-spec.json
#   SPEC_URL=http://localhost:9090/api-docs npm run gen:api  # other host/port
#
# On Windows, run from Git Bash (PowerShell cannot execute .sh files directly).
set -euo pipefail
cd "$(dirname "$0")/.."

# springdoc is configured with springdoc.api-docs.path=/api-docs (not /v3/api-docs).
SPEC_URL="${SPEC_URL:-http://localhost:8080/api-docs}"
SPEC="api-spec.json"

if [[ "${1:-}" == "--offline" ]]; then
  [[ -f "$SPEC" ]] || { echo "error: $SPEC not found, run once with the backend up" >&2; exit 1; }
  echo "→ using saved $SPEC"
else
  echo "→ fetching spec: $SPEC_URL"
  if ! curl -sSf --max-time 30 "$SPEC_URL" -o "$SPEC.tmp"; then
    rm -f "$SPEC.tmp"
    echo "error: could not reach $SPEC_URL. Is the backend running?" >&2
    exit 1
  fi
  # An error page or a login redirect would wreck the SDK, so reject it here.
  if ! head -c 50 "$SPEC.tmp" | grep -q '"openapi"'; then
    echo "error: response is not an OpenAPI document:" >&2
    head -c 200 "$SPEC.tmp" >&2; echo >&2
    rm -f "$SPEC.tmp"
    exit 1
  fi
  mv "$SPEC.tmp" "$SPEC"
fi

# Wipe old output so endpoints deleted in the backend disappear here too.
# src/sdk/setup.ts is NOT inside these folders, so it survives.
rm -rf src/sdk/requests src/sdk/queries

echo "→ generating"
# The hook pins the generator to TypeScript 5.4 (see scripts/sdk-codegen-hooks.mjs).
node --import ./scripts/sdk-codegen-hooks.mjs \
  node_modules/@7nohe/openapi-react-query-codegen/dist/cli.mjs -i "$SPEC" -o src/sdk

echo "→ converting type-only imports to 'import type' (verbatimModuleSyntax)"
npx --no-install eslint --no-config-lookup -c scripts/eslint.sdk-codegen.config.js --fix \
  "src/sdk/requests/**/*.ts" "src/sdk/queries/**/*.ts"

echo "→ formatting"
npx --no-install prettier --write "$SPEC" "src/sdk/requests/**/*.ts" "src/sdk/queries/*.ts" --log-level warn || true

echo "Done. Next: npm run typecheck  (shows every screen the API change broke)"
