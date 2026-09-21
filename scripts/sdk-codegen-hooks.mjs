/**
 * Node resolve hook used ONLY by scripts/generate-sdk.sh while running openapi-rq.
 *
 * Why: @7nohe/openapi-react-query-codegen@1.4.1 parses the generated services with
 * ts-morph@22 (which bundles TypeScript 5.4) but compares the AST against
 * `ts.SyntaxKind` imported from the top-level `typescript` package. This app uses
 * TypeScript 6, whose SyntaxKind numbers differ, so codegen fails with
 * "Method block not found".
 *
 * Fix: inside the codegen process only, resolve `typescript` to ts-morph's bundled
 * TypeScript (sdk-codegen-typescript.cjs). The app, ESLint and tsc keep TS 6, and no
 * second `typescript` package (with a competing `tsc` bin) is installed.
 */
import { registerHooks } from 'node:module';

if (typeof registerHooks !== 'function') {
  console.error('error: SDK generation requires Node >= 22.15 (module.registerHooks).');
  process.exit(1);
}

const tsShimUrl = new URL('./sdk-codegen-typescript.cjs', import.meta.url).href;

registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier === 'typescript') {
      return { url: tsShimUrl, format: 'commonjs', shortCircuit: true };
    }
    return nextResolve(specifier, context);
  },
});
