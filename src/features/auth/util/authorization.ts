import type { Role } from '../constant/roles';

export function hasRole(
  roles: Role[],
  requiredRole: Role,
): boolean {
  return roles.includes(requiredRole);
}

export function hasAnyRole(
  roles: Role[],
  requiredRoles: Role[],
): boolean {
  return requiredRoles.some((role) =>
    roles.includes(role),
  );
}

export function hasAllRoles(
  roles: Role[],
  requiredRoles: Role[],
): boolean {
  return requiredRoles.every((role) =>
    roles.includes(role),
  );
}