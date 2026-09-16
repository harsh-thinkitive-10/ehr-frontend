import {
  APPLICATION_ROLES,
  type Role,
} from '../constant/roles';

interface JwtPayload {
  preferred_username?: string;
  email?: string;
  name?: string;
  given_name?: string;
  family_name?: string;

  realm_access?: {
    roles?: string[];
  };
}

function decodeBase64Url(value: string): string {
  const base64 = value
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  return decodeURIComponent(
    atob(base64)
      .split('')
      .map(
        (character) =>
          `%${`00${character.charCodeAt(0).toString(16)}`.slice(-2)}`,
      )
      .join(''),
  );
}

export function decodeJwtPayload(
  token: string,
): JwtPayload | null {
  try {
    const payload = token.split('.')[1];

    if (!payload) {
      return null;
    }

    return JSON.parse(
      decodeBase64Url(payload),
    ) as JwtPayload;
  } catch {
    return null;
  }
}

export interface AuthUser {
  username: string | null;
  email: string | null;
  name: string | null;
}

export function getUserFromToken(
  token: string,
): AuthUser {
  const payload = decodeJwtPayload(token);

  return {
    username: payload?.preferred_username ?? null,
    email: payload?.email ?? null,
    name: payload?.name ?? null,
  };
}

export function getRolesFromToken(
  token: string,
): Role[] {
  const payload = decodeJwtPayload(token);

  const roles = payload?.realm_access?.roles;

  if (!Array.isArray(roles)) {
    return [];
  }

  return roles.filter(
    (role): role is Role =>
      APPLICATION_ROLES.includes(role as Role),
  );
}