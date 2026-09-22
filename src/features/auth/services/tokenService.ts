let accessToken: string | null = null;

let onSessionExpired: (() => void) | null = null;

export const tokenService = {
  getAccessToken(): string | null {
    return accessToken;
  },

  setAccessToken(token: string): void {
    accessToken = token;
  },

  clearTokens(): void {
    accessToken = null;
  },

  setSessionExpiredHandler(handler: (() => void) | null): void {
    onSessionExpired = handler;
  },

  notifySessionExpired(): void {
    onSessionExpired?.();
  },
};