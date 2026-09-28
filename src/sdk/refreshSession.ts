import { setAccessToken } from './accessToken';
import { refresh } from './generated/auth/auth';

/**
 * Payload of the login/refresh `Response.data`. The OpenAPI spec types `data`
 * as a plain object, so this shape is declared here.
 */
export interface AuthTokenData {
  access_token: string;
  expires_in: number;
  token_type: string;
}

let refreshPromise: Promise<string> | null = null;

/**
 * Exchanges the refresh-token cookie for a new access token and stores it.
 * Concurrent callers share one in-flight request.
 */
export function refreshSession(): Promise<string> {
  if (!refreshPromise) {
    refreshPromise = refresh()
      .then((response) => {
        const newAccessToken = (response.data as unknown as AuthTokenData).access_token;

        setAccessToken(newAccessToken);

        return newAccessToken;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
}
