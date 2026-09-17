// ESLint config used ONLY by scripts/generate-sdk.sh as an automated post-codegen step.
//
// openapi-rq@1.4.1 emits `import { UseQueryOptions, PatientDTO } ...` for type-only
// symbols. With `verbatimModuleSyntax` (tsconfig.app.json) that is a TS1484 error and
// Vite would keep the imports at runtime. This rewrites them to `import type`.
import tseslint from 'typescript-eslint'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  {
    files: ['src/sdk/requests/**/*.ts', 'src/sdk/queries/**/*.ts'],
    languageOptions: { parser: tseslint.parser },
    plugins: { '@typescript-eslint': tseslint.plugin },
    linterOptions: { reportUnusedDisableDirectives: 'off' },
    rules: {
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { fixStyle: 'separate-type-imports' },
      ],
    },
  },
])
