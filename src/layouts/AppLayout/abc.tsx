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
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

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
      {/* Logo / Toggle */}

      <Stack
        direction="row"
        sx={{
          px: collapsed ? 1.5 : 3,
          py: 2,
          alignItems: 'center',
          justifyContent: collapsed
            ? 'center'
            : 'space-between',
          minHeight: 64,
        }}
      >
        <Stack
          direction="row"
          spacing={1.5}
          sx={{
            alignItems: 'center',
            minWidth: 0,
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
              flexShrink: 0,
            }}
          >
            <FavoriteIcon fontSize="small" />
          </Box>

          {!collapsed && (
            <Typography
              sx={{
                fontSize: '0.9rem',
                fontWeight: 500,
                whiteSpace: 'nowrap',
              }}
            >
              CarePlus
            </Typography>
          )}
        </Stack>

        {!collapsed && (
          <IconButton
            onClick={onToggle}
            aria-label="Collapse sidebar"
            size="small"
            sx={{
              color: '#64748b',
              '&:hover': {
                backgroundColor: '#f1f5f9',
                color: '#1976d2',
              },
            }}
          >
            <MenuOpenIcon fontSize="small" />
          </IconButton>
        )}

        {collapsed && (
          <IconButton
            onClick={onToggle}
            aria-label="Expand sidebar"
            size="small"
            sx={{
              position: 'absolute',
              top: 14,
              right: 4,
              color: '#64748b',
              '&:hover': {
                backgroundColor: '#f1f5f9',
                color: '#1976d2',
              },
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
        )}
      </Stack>

      <Divider />

      {/* Navigation */}

      <Stack
        component="nav"
        spacing={0.5}
        sx={{
          px: collapsed ? 1 : 2,
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
            {({ isActive }) => {
              const navigationItem = (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: collapsed
                      ? 'center'
                      : 'flex-start',
                    gap: 1.5,
                    px: collapsed ? 1 : 2,
                    py: 1.4,
                    minHeight: 48,
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
                      flexShrink: 0,
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

                  {!collapsed && (
                    <Typography
                      sx={{
                        fontSize: '1rem',
                        fontWeight: 700,
                        lineHeight: 1.5,
                        color: '#172b4d',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {item.label}
                    </Typography>
                  )}
                </Box>
              );

              return collapsed ? (
                <Tooltip
                  title={item.label}
                  placement="right"
                  arrow
                >
                  {navigationItem}
                </Tooltip>
              ) : (
                navigationItem
              );
            }}
          </NavLink>
        ))}

        {/* Bottom actions */}

        <Box sx={{ mt: 'auto' }}>
          {collapsed ? (
            <Tooltip
              title="Settings"
              placement="right"
              arrow
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  px: 1,
                  py: 1.4,
                  minHeight: 48,
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
              </Box>
            </Tooltip>
          ) : (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                px: 2,
                py: 1.4,
                minHeight: 48,
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
        </Box>
      </Stack>
    </Box>
  );
}