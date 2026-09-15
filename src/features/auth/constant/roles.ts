export const ROLES = {
  PATIENT: 'PATIENT',
  DOCTOR: 'DOCTOR',
  ADMIN: 'ADMIN',
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

export const APPLICATION_ROLES: Role[] = [
  ROLES.PATIENT,
  ROLES.DOCTOR,
  ROLES.ADMIN,
];