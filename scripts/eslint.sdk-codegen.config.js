// ESLint config used ONLY by scripts/generate-sdk.mjs as an automated post-codegen step.
//
// Generated code may import type-only symbols as values. With `verbatimModuleSyntax`
// (tsconfig.app.json) that is a TS1484 error and
// Vite would keep the imports at runtime. This rewrites them to `import type`.
import tseslint from 'typescript-eslint'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  {
    files: ['src/sdk/generated/**/*.ts'],
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
