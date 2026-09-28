import { useEffect, useRef, useState, type ReactNode } from 'react';
import type { Role } from '../constant/roles';
import { clearAccessToken, getAccessToken, setAccessToken as storeAccessToken } from '../../../sdk/accessToken';
import { refreshSession, type AuthTokenData } from '../../../sdk/refreshSession';
import { setSessionExpiredHandler } from '../../../sdk/session';
import { logout as logoutRequest } from '../../../sdk/generated/auth/auth';
import type { Response } from '../../../sdk/generated/common/types';
import { getRolesFromToken, getUserFromToken, type AuthUser } from '../util/jwt';
import { AuthContext } from './context';
import { queryClient } from '../../../sdk/queryClient';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [accessToken, setAccessToken] = useState<string | null>(getAccessToken());
  const [roles, setRoles] = useState<Role[]>([]);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const initialized = useRef(false);

  useEffect(() => {
    setSessionExpiredHandler(() => {
      queryClient.clear();
      clearAccessToken();
      setAccessToken(null);
      setRoles([]);
      setUser(null);
    });

    if (initialized.current) return;

    initialized.current = true;

    const restoreSession = async () => {
      try {
        console.log('AUTH: restoring session');

        const newAccessToken = await refreshSession();

        console.log('AUTH: refresh success');

        setAccessToken(newAccessToken);
        setRoles(getRolesFromToken(newAccessToken));
        setUser(getUserFromToken(newAccessToken));
      } catch (error) {
        console.error('AUTH: refresh failed', error);

        clearAccessToken();
        setAccessToken(null);
        setRoles([]);
        setUser(null);
      } finally {
        setIsInitializing(false);
      }
    };

    restoreSession();

    return () => {
      setSessionExpiredHandler(null);
    };
  }, []);

  const login = (response: Response) => {
    const newAccessToken = (response.data as unknown as AuthTokenData).access_token;

    storeAccessToken(newAccessToken);
    setAccessToken(newAccessToken);
    setRoles(getRolesFromToken(newAccessToken));
    setUser(getUserFromToken(newAccessToken));
  };

  const logout = async () => {
    try {
      await logoutRequest();
    } finally {
      clearAccessToken();
      queryClient.clear();
      setAccessToken(null);
      setRoles([]);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ accessToken, roles, user, isAuthenticated: accessToken !== null, isInitializing, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
