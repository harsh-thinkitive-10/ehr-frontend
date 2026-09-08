import {
  Box,
  Divider,
  Stack,
  Typography,
} from '@mui/material';

import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DescriptionIcon from '@mui/icons-material/Description';
import MedicationIcon from '@mui/icons-material/Medication';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import FavoriteIcon from '@mui/icons-material/Favorite';

import type { ReactNode } from 'react';

import { NavLink, useNavigate } from 'react-router-dom';

import { useAuth } from '../../features/auth/context';

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

export default function Sidebar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();

    navigate('/login', {
      replace: true,
    });
  };

  return (
    <Box
      component="aside"
      sx={{
        width: 250,
        height: '100vh',
        borderRight: '1px solid #e5e7eb',
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 1200,
      }}
    >
      {/* Logo */}

      <Stack
        direction="row"
        spacing={1.5}
        sx={{
          px: 3,
          py: 3,
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
          py: 3,
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

        <Box
          sx={{
            mt: 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            px: 2,
            py: 1.4,
            borderRadius: '8px',
            cursor: 'pointer',
            color: '#64748b',

            '& svg': {
              fontSize: 20,
            },

            '&:hover': {
              backgroundColor: '#f1f5f9',
              color: '#1976d2',
            },
          }}
        >
          <SettingsIcon fontSize="small" />

          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: '#172b4d',
            }}
          >
            Settings
          </Typography>
        </Box>

        {/* Logout */}

        <Box
          onClick={handleLogout}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            px: 2,
            py: 1.4,
            borderRadius: '8px',
            cursor: 'pointer',
            color: '#dc2626',

            '& svg': {
              fontSize: 20,
            },

            '&:hover': {
              backgroundColor: '#fef2f2',
            },
          }}
        >
          <LogoutIcon fontSize="small" />

          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: '#172b4d',
            }}
          >
            Logout
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}