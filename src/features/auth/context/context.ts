import { createContext } from 'react';

import type { Role } from '../constant/roles';
import type { Response } from '../../../sdk/generated/common/types';
import type { AuthUser } from '../util/jwt';

interface AuthContextValue {
  accessToken: string | null;
  roles: Role[];
  user: AuthUser | null;
  isAuthenticated: boolean;
  isInitializing: boolean;
  login: (data: Response) => void;
  logout: () => Promise<void>;
}

export const AuthContext =
  createContext<AuthContextValue | undefined>(
    undefined,
  );