import { defineConfig } from 'orval';

type Spec = Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any

/**
 * Explicit renames for springdoc operationIds that are ambiguous across tags
 * (`getDashboard` / `getDashboard_1`) or too generic (`delete`, `update`, ...).
 */
const OPERATION_ID_RENAMES: Record<string, string> = {
  getDashboard: 'getPatientDashboard',
  getDashboard_1: 'getAdminDashboard',
  getByUuid: 'getAllergy',
  getByPatient: 'getPatientAllergies',
  create: 'createAllergy',
  update: 'updateAllergy',
  delete: 'deleteAllergy',
};

/** Spring `Pageable` as the flat query params the backend actually reads. */
const PAGEABLE_PARAMS = [
  { name: 'page', in: 'query', required: false, schema: { type: 'integer', default: 0, minimum: 0 } },
  { name: 'size', in: 'query', required: false, schema: { type: 'integer', default: 20, minimum: 1 } },
  { name: 'sort', in: 'query', required: false, schema: { type: 'array', items: { type: 'string' } } },
];

/**
 * Deterministic normalization of api-spec.json before generation. The spec
 * file itself stays exactly as the backend serves it.
 */
function normalizeSpec(input: Spec): Spec {
  const spec: Spec = structuredClone(input);

  // No host may leak into generated code; the base URL is VITE_API_BASE_URL.
  delete spec.servers;

  const paths: Spec = {};

  for (const [path, item] of Object.entries<Spec>(spec.paths)) {
    for (const operation of Object.values<Spec>(item)) {
      operation.operationId = OPERATION_ID_RENAMES[operation.operationId] ?? operation.operationId;
      operation.tags = operation.tags?.map((tag: string) => tag.replace(/-controller$/, ''));

      operation.parameters = operation.parameters
        // The refresh-token cookie is sent by the browser, not by the caller.
        ?.filter((param: Spec) => param.in !== 'cookie')
        .flatMap((param: Spec) =>
          param.schema?.$ref === '#/components/schemas/Pageable' ? PAGEABLE_PARAMS : [param],
        );

      // springdoc declares every response as `*/*`; the API speaks JSON.
      for (const response of Object.values<Spec>(operation.responses ?? {})) {
        if (response.content?.['*/*']) {
          response.content = { 'application/json': response.content['*/*'] };
        }
      }
    }

    // Generated URLs are relative to VITE_API_BASE_URL, which already ends in /api.
    paths[path.replace(/^\/api(?=\/)/, '')] = item;
  }

  spec.paths = paths;

  return spec;
}

export default defineConfig({
  ehr: {
    input: {
      target: './api-spec.json',
      override: {
        transformer: normalizeSpec,
      },
    },
    output: {
      mode: 'tags-split',
      target: './src/sdk/generated/index.ts',
      schemas: './src/sdk/generated/common/types',
      client: 'react-query',
      httpClient: 'axios',
      indexFiles: true,
      clean: true,
      formatter: 'prettier',
      override: {
        mutator: {
          path: './src/sdk/apiClient.ts',
          name: 'apiClient',
        },
        query: {
          signal: true,
        },
      },
    },
  },
});
