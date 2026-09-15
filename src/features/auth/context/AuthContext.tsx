import {
  useState,
  type ReactNode,
} from 'react';

import type { Role } from '../constant/roles';

import { tokenService } from '../services/tokenService';
import {
  authService,
  type LoginResponse,
} from '../services/authService';

import { getRolesFromToken } from '../util/jwt';

import { AuthContext } from './context';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({
  children,
}: AuthProviderProps) {
  const [accessToken, setAccessToken] =
    useState<string | null>(
      tokenService.getAccessToken(),
    );

  const [roles, setRoles] =
    useState<Role[]>([]);

  const login = (data: LoginResponse) => {
    tokenService.setTokens(
      data.access_token,
      data.refresh_token,
    );

    setAccessToken(data.access_token);

    const tokenRoles =
      getRolesFromToken(data.access_token);

    setRoles(tokenRoles);
  };

  const logout = async () => {
    try {
      await authService.logout();
    } finally {
      tokenService.clearTokens();
      setAccessToken(null);
      setRoles([]);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        roles,
        isAuthenticated:
          accessToken !== null,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}