import {
  Box,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';

import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DescriptionIcon from '@mui/icons-material/Description';
import MedicationIcon from '@mui/icons-material/Medication';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import FavoriteIcon from '@mui/icons-material/Favorite';

import type { ReactNode } from 'react';

import { NavLink } from 'react-router-dom';


interface MenuItem {
  label: string;
  icon: ReactNode;
  path: string;
}

const menuItems: MenuItem[] = [
  {
    label: 'Dashboard',
    icon: <DashboardIcon />,
    path: '/dashboard',
  },
  {
    label: 'Patients',
    icon: <PeopleIcon />,
    path: '/patients',
  },
  {
    label: 'Appointments',
    icon: <CalendarMonthIcon />,
    path: '/appointments',
  },
  {
    label: 'Medical Records',
    icon: <DescriptionIcon />,
    path: '/medical-records',
  },
  {
    label: 'Prescriptions',
    icon: <MedicationIcon />,
    path: '/prescriptions',
  },
  {
    label: 'Reports',
    icon: <BarChartIcon />,
    path: '/reports',
  },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({
  collapsed,
  onToggle,
}: SidebarProps) {

  return (
    <Box
      component="aside"
      sx={{
        width: collapsed ? 72 : 250,
        height: '100vh',
        borderRight: '1px solid #e5e7eb',
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 1200,
        transition: 'width 0.2s ease',
        overflow: 'hidden',
      }}
    >
      {/* Logo */}

      <Stack
        direction="row"
        spacing={1.5}
        sx={{
          px: collapsed ? 1.5 : 3,
          py: 2,
          alignItems: 'center',

        }}
      >
        <Box
          sx={{
            width: 38,
            height: 38,
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#1976d2',
            color: '#ffffff',
          }}
        >
          <FavoriteIcon fontSize="small" />
        </Box>
        <Typography
          sx={{
            fontSize: '0.9rem',
            fontWeight: 500,
          }}
        >
          CarePlus
        </Typography>
      </Stack>

      <Divider />

      {/* Navigation */}

      <Stack
        component="nav"
        spacing={0.5}
        sx={{
          px: 2,
          py: 2,
          flex: 1,
        }}
      >
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            style={{
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            {({ isActive }) => (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  px: 2,
                  py: 1.4,
                  borderRadius: '8px',
                  color: isActive
                    ? '#1976d2'
                    : '#64748b',
                  backgroundColor: isActive
                    ? '#eaf3ff'
                    : 'transparent',
                  transition: 'all 0.2s ease',

                  '& svg': {
                    fontSize: 20,
                  },

                  '&:hover': {
                    backgroundColor: isActive
                      ? '#eaf3ff'
                      : '#f1f5f9',
                    color: '#1976d2',
                  },
                }}
              >
                {item.icon}

                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    color: '#172b4d',
                  }}
                >
                  {item.label}
                </Typography>
              </Box>
            )}
          </NavLink>
        ))}

        {/* Bottom actions */}

        <NavLink
          to="/settings"
          style={{
            textDecoration: 'none',
            color: 'inherit',
          }}
        >
          {({ isActive }) => (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                px: 2,
                py: 1.4,
                minHeight: 48,
                borderRadius: '8px',
                color: isActive
                  ? '#1976d2'
                  : '#64748b',
                backgroundColor: isActive
                  ? '#eaf3ff'
                  : 'transparent',

                '& svg': {
                  fontSize: 20,
                },

                '&:hover': {
                  backgroundColor: isActive
                    ? '#eaf3ff'
                    : '#f1f5f9',
                  color: '#1976d2',
                },
              }}
            >
              <SettingsIcon fontSize="small" />

              <Typography
                sx={{
                  fontSize: '1rem',
                  fontWeight: 700,
                  lineHeight: 1.5,
                  color: '#172b4d',
                  whiteSpace: 'nowrap',
                }}
              >
                Settings
              </Typography>
            </Box>
          )}
        </NavLink>
      </Stack>
    </Box>
  );
}