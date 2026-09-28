/**
 * In-memory access token. Never persisted: on reload the session is restored
 * from the httpOnly refresh-token cookie (see refreshSession.ts).
 */
let accessToken: string | null = null;

export function getAccessToken(): string | null {
  return accessToken;
}

export function setAccessToken(token: string): void {
  accessToken = token;
}

export function clearAccessToken(): void {
  accessToken = null;
}
