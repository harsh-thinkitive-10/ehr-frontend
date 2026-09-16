import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DescriptionIcon from '@mui/icons-material/Description';
import MedicationIcon from '@mui/icons-material/Medication';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';

import type { ReactNode } from 'react';

import {
  ROLES,
  type Role,
} from '../../features/auth/constant/roles';

export interface MenuItem {
  label: string;
  icon: ReactNode;
  path: string;
  allowedRoles: Role[];
}

/*
 * Main navigation
 */
export const menuItems: MenuItem[] = [
  {
    label: 'Dashboard',
    icon: <DashboardIcon />,
    path: '/dashboard',
    allowedRoles: [
      ROLES.PATIENT,
      ROLES.DOCTOR,
      ROLES.ADMIN,
    ],
  },

  {
    label: 'Patients',
    icon: <PeopleIcon />,
    path: '/patients',
    allowedRoles: [
      ROLES.DOCTOR,
      ROLES.ADMIN,
    ],
  },

  {
    label: 'Appointments',
    icon: <CalendarMonthIcon />,
    path: '/appointments',
    allowedRoles: [
      ROLES.PATIENT,
      ROLES.DOCTOR,
      ROLES.ADMIN,
    ],
  },

  {
    label: 'Medical Records',
    icon: <DescriptionIcon />,
    path: '/medical-records',
    allowedRoles: [
      ROLES.PATIENT,
      ROLES.DOCTOR,
      ROLES.ADMIN,
    ],
  },

  {
    label: 'Prescriptions',
    icon: <MedicationIcon />,
    path: '/prescriptions',
    allowedRoles: [
      ROLES.PATIENT,
      ROLES.DOCTOR,
      ROLES.ADMIN,
    ],
  },

  {
    label: 'Reports',
    icon: <BarChartIcon />,
    path: '/reports',
    allowedRoles: [
      ROLES.DOCTOR,
      ROLES.ADMIN,
    ],
  },
];

/*
 * Profile navigation
 */
export const profileMenuItems: MenuItem[] = [
  {
    label: 'My Profile',
    icon: <PeopleIcon />,
    path: '/patient/profile',
    allowedRoles: [
      ROLES.PATIENT,
    ],
  },

  {
    label: 'My Profile',
    icon: <PeopleIcon />,
    path: '/doctor/profile',
    allowedRoles: [
      ROLES.DOCTOR,
    ],
  },
];

/*
 * Settings
 */
export const settingsMenuItem: MenuItem = {
  label: 'Settings',
  icon: <SettingsIcon />,
  path: '/settings',
  allowedRoles: [
    ROLES.PATIENT,
    ROLES.DOCTOR,
    ROLES.ADMIN,
  ],
};