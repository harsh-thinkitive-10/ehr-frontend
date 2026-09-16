import {
  Box,
  Divider,
  Stack,
  Typography,
  IconButton,
} from '@mui/material';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { NavLink } from 'react-router-dom';

import {
  menuItems,
  settingsMenuItem,
} from './navigation';

import { useAuth } from '../../features/auth/context';
import { hasAnyRole } from '../../features/auth/util/authorization';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({
  collapsed,
  onToggle,
}: SidebarProps) {
  const { roles } = useAuth();

  /*
   * Show only navigation items that the
   * current user's role can access.
   */
  const visibleMenuItems = menuItems.filter(
    (item) =>
      hasAnyRole(
        roles,
        item.allowedRoles,
      ),
  );

  /*
   * Check whether the current user can
   * access Settings.
   */
  const canAccessSettings =
    hasAnyRole(
      roles,
      settingsMenuItem.allowedRoles,
    );

  /*
   * Resolve role-specific routes.
   *
   * The navigation configuration keeps
   * /appointments as the common logical path.
   *
   * The actual route depends on the user's role.
   */
  const getMenuPath = (path: string): string => {
    if (
      path === '/appointments' &&
      roles.includes('ADMIN')
    ) {
      return '/admin/appointments';
    }

    if (
      path === '/appointments' &&
      roles.includes('DOCTOR')
    ) {
      return '/doctor/appointments';
    }

    return path;
  };

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
            backgroundColor: '#e8ecf0',
            color: '#ffffff',
            backdropFilter: 'blur(10px)',
            flexShrink: 0,
          }}
        >
          <Box
            component="img"
            src="/logo.png"
            alt="Company Logo"
            sx={{
              width: 30,
              height: 30,
              objectFit: 'contain',
            }}
          />
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

        <IconButton
          onClick={onToggle}
          aria-label={
            collapsed
              ? 'Expand sidebar'
              : 'Collapse sidebar'
          }
          size="small"
          sx={{
            ml: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          {collapsed ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </Stack>

      <Divider />

      {/* Navigation */}

      <Stack
        component="nav"
        aria-label="Main navigation"
        spacing={0.5}
        sx={{
          px: 2,
          py: 2,
          flex: 1,
        }}
      >
        {visibleMenuItems.map((item) => {
          /*
           * Resolve the final route based on
           * the current user's role.
           */
          const path = getMenuPath(item.path);

          return (
            <NavLink
              key={item.label + path}
              to={path}
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
                    transition:
                      'all 0.2s ease',

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

                  {!collapsed && (
                    <Typography
                      sx={{
                        fontWeight: 600,
                        color: 'text.primary',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {item.label}
                    </Typography>
                  )}
                </Box>
              )}
            </NavLink>
          );
        })}

        {/* Bottom actions */}

        {canAccessSettings && (
          <NavLink
            to={settingsMenuItem.path}
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
                {settingsMenuItem.icon}

                {!collapsed && (
                  <Typography
                    sx={{
                      fontSize: '1rem',
                      fontWeight: 600,
                      lineHeight: 1.5,
                      color: 'text.primary',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {settingsMenuItem.label}
                  </Typography>
                )}
              </Box>
            )}
          </NavLink>
        )}
      </Stack>
    </Box>
  );
}