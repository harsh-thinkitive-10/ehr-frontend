import { createContext } from 'react';

import type { Role } from '../constant/roles';
import type { LoginResponse } from '../services/authService';

export interface AuthContextValue {
  accessToken: string | null;
  roles: Role[];
  isAuthenticated: boolean;
  login: (data: LoginResponse) => void;
  logout: () => Promise<void>;
}

export const AuthContext =
  createContext<AuthContextValue | undefined>(
    undefined,
  );