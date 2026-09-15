import {
  Navigate,
  Outlet,
} from 'react-router-dom';

import { useAuth } from '../features/auth/context';
import { hasAnyRole } from '../features/auth/util/authorization';

import type { Role } from '../features/auth/constant/roles';

interface RoleRouteProps {
  allowedRoles: Role[];
}

export default function RoleRoute({
  allowedRoles,
}: RoleRouteProps) {
  const {
    isAuthenticated,
    roles,
  } = useAuth();

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  if (!hasAnyRole(roles, allowedRoles)) {
    return (
      <Navigate
        to="/unauthorized"
        replace
      />
    );
  }

  return <Outlet />;
}