// Stand-in for `typescript` inside the SDK codegen process (see sdk-codegen-hooks.mjs).
// Re-exports the TypeScript build bundled with ts-morph, so the generator's
// ts.SyntaxKind values match the AST that ts-morph produces.
const { createRequire } = require('node:module');

const requireFromTsMorph = createRequire(require.resolve('ts-morph'));

module.exports = requireFromTsMorph('@ts-morph/common').ts;
