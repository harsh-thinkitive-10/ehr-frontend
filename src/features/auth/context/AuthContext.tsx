import { useEffect, useRef, useState, type ReactNode } from 'react';
import type { Role } from '../constant/roles';
import { tokenService } from '../services/tokenService';
import { authService, type LoginResponse } from '../services/authService';
import { getRolesFromToken, getUserFromToken, type AuthUser } from '../util/jwt';
import { AuthContext } from './context';
import { queryClient } from '../../../app/queryClient';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [accessToken, setAccessToken] = useState<string | null>(tokenService.getAccessToken());
  const [roles, setRoles] = useState<Role[]>([]);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const initialized = useRef(false);

  useEffect(() => {
    tokenService.setSessionExpiredHandler(() => {
      queryClient.clear();
      tokenService.clearTokens();
      setAccessToken(null);
      setRoles([]);
      setUser(null);
    });

    if (initialized.current) return;

    initialized.current = true;

    const restoreSession = async () => {
      try {
        console.log('AUTH: restoring session');

        const response = await authService.refresh();

        console.log('AUTH: refresh success');

        const newAccessToken = response.data.access_token;

        tokenService.setAccessToken(newAccessToken);
        setAccessToken(newAccessToken);
        setRoles(getRolesFromToken(newAccessToken));
        setUser(getUserFromToken(newAccessToken));
      } catch (error) {
        console.error('AUTH: refresh failed', error);

        tokenService.clearTokens();
        setAccessToken(null);
        setRoles([]);
        setUser(null);
      } finally {
        setIsInitializing(false);
      }
    };

    restoreSession();

    return () => {
      tokenService.setSessionExpiredHandler(null);
    };
  }, []);

  const login = (response: LoginResponse) => {
    const newAccessToken = response.data.access_token;

    tokenService.setAccessToken(newAccessToken);
    setAccessToken(newAccessToken);
    setRoles(getRolesFromToken(newAccessToken));
    setUser(getUserFromToken(newAccessToken));
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
    <AuthContext.Provider value={{ accessToken, roles, user, isAuthenticated: accessToken !== null, isInitializing, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}