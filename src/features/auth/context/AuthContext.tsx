import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react';

import { tokenService } from '../services/tokenService';

interface AuthContextValue {
  accessToken: string | null;
  isAuthenticated: boolean;
  login: (accessToken: string) => void;
  logout: () => void;
}

const AuthContext =
  createContext<AuthContextValue | undefined>(
    undefined,
  );

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

  const login = (token: string) => {
    tokenService.setAccessToken(token);
    setAccessToken(token);
  };

  const logout = () => {
    tokenService.clearAccessToken();
    setAccessToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        isAuthenticated: accessToken !== null,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      'useAuth must be used inside AuthProvider',
    );
  }

  return context;
}