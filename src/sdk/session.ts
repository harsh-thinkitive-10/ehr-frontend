import { clearAccessToken } from './accessToken';

let onSessionExpired: (() => void) | null = null;

/** Registered by AuthProvider; called when the session can no longer be refreshed. */
export function setSessionExpiredHandler(handler: (() => void) | null): void {
  onSessionExpired = handler;
}

export function expireSession(): void {
  clearAccessToken();
  onSessionExpired?.();
}
