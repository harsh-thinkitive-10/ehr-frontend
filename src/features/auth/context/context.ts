import { createContext } from 'react';

import type { Role } from '../constant/roles';
import type { LoginResponse } from '../services/authService';
import type { AuthUser } from '../util/jwt';

interface AuthContextValue {
  accessToken: string | null;
  roles: Role[];
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (data: LoginResponse) => void;
  logout: () => Promise<void>;
}

export const AuthContext =
  createContext<AuthContextValue | undefined>(
    undefined,
  );