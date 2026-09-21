/**
 * Hand-written runtime config for the generated OpenAPI SDK.
 *
 * Lives outside requests/ and queries/, so `npm run gen:api` never touches it.
 * Imported first thing in main.tsx, before any request is made.
 */
import { OpenAPI } from './requests/core/OpenAPI';

// Generated paths already include the /api prefix (e.g. /api/v1/doctor), and the
// generated default BASE is springdoc's "http://localhost:8080".
//
// "" = same origin: in dev, calls go to /api/... and the Vite proxy forwards them to :8080.
// In deployed environments, set VITE_SDK_BASE_URL to the backend ORIGIN (no /api suffix).
//
// Deliberately NOT VITE_API_BASE_URL: that one is the Axios base URL and ends in /api,
// which would produce /api/api/v1/... here.
OpenAPI.BASE = import.meta.env.VITE_SDK_BASE_URL || '';

// TODO(auth): wire the JWT once pages migrate to generated hooks. Protected endpoints
// will return 401 until then. The access token lives in the in-memory tokenService
// (src/features/auth/services/tokenService.ts), e.g.:
//
//   OpenAPI.TOKEN = async () => tokenService.getAccessToken() ?? '';
//
// Note that the SDK uses fetch, not the Axios apiClient, so it does NOT inherit the
// Axios 401 -> refresh-token retry interceptor. That behaviour must be designed for
// the SDK (e.g. via OpenAPI.interceptors.response) as part of that step.
