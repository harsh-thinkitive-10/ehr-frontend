import {
  useEffect,
  useState,
  type ReactNode,
} from 'react';

import type { Role } from '../constant/roles';

import { tokenService } from '../services/tokenService';
import {
  authService,
  type LoginResponse,
} from '../services/authService';

import {
  getRolesFromToken,
  getUserFromToken,
  type AuthUser,
} from '../util/jwt';

import { AuthContext } from './context';
import { queryClient } from '../../../app/queryClient';

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

  const [user, setUser] =
    useState<AuthUser | null>(null);

  useEffect(() => {
    tokenService.setSessionExpiredHandler(() => {
      queryClient.clear();
      setAccessToken(null);
      setRoles([]);
      setUser(null);
    });

    return () => {
      tokenService.setSessionExpiredHandler(null);
    };
  }, []);

  const login = (data: LoginResponse) => {
    tokenService.setTokens(
      data.access_token,
      data.refresh_token,
    );

    setAccessToken(data.access_token);

    const tokenRoles =
      getRolesFromToken(data.access_token);

    const authenticatedUser =
      getUserFromToken(data.access_token);

    setRoles(tokenRoles);
    setUser(authenticatedUser);
  };

  const logout = async () => {
    try {
      await authService.logout();
    } finally {
      tokenService.clearTokens();
      queryClient.clear();
      setAccessToken(null);
      setRoles([]);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        roles,
        user,
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