let accessToken: string | null = null;
let refreshToken: string | null = null;

export const tokenService = {
  getAccessToken(): string | null {
    return accessToken;
  },

  setAccessToken(token: string): void {
    accessToken = token;
  },

  getRefreshToken(): string | null {
    return refreshToken;
  },

  setRefreshToken(token: string): void {
    refreshToken = token;
  },

  setTokens(
    newAccessToken: string,
    newRefreshToken: string,
  ): void {
    accessToken = newAccessToken;
    refreshToken = newRefreshToken;
  },

  clearTokens(): void {
    accessToken = null;
    refreshToken = null;
  },
};