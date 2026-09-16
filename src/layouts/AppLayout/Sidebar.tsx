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

const SIDEBAR_WIDTH = 250;
const SIDEBAR_COLLAPSED_WIDTH = 72;

export default function Sidebar({
  collapsed,
  onToggle,
}: SidebarProps) {
  const { roles } = useAuth();

  /*
   * Show only navigation items that the
   * current user's role can access.
   */
  const visibleMenuItems =
    menuItems.filter((item) =>
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
   * Preserve the existing menu path behavior.
   */
  const getMenuPath = (
    path: string,
  ): string => {
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

  const sidebarWidth = collapsed
    ? SIDEBAR_COLLAPSED_WIDTH
    : SIDEBAR_WIDTH;

  return (
    <Box
      component="aside"
      sx={{
        width: sidebarWidth,
        height: '100vh',
        borderRight:
          '1px solid #e5e7eb',
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 1200,
        transition:
          'width 0.2s ease',
        overflow: 'hidden',
      }}
    >
      {/* Logo / Header */}

      <Box
        sx={{
          position: 'relative',
          height: 72,
          flexShrink: 0,
        }}
      >
        <Stack
          direction="row"
          spacing={1.5}
          sx={{
            height: '100%',
            px: collapsed ? 0 : 3,
            alignItems: 'center',
            justifyContent: collapsed
              ? 'center'
              : 'flex-start',
          }}
        >
          {/* Logo */}

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
              backdropFilter:
                'blur(10px)',
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

          {/* Brand */}

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
      </Box>

      <Divider />

      {/* Navigation */}

      <Stack
        component="nav"
        aria-label="Main navigation"
        spacing={0.5}
        sx={{
          px: collapsed ? 1 : 2,
          py: 2,
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
        }}
      >
        {visibleMenuItems.map(
          (item) => {
            /*
             * Resolve the final route based on
             * the current user's role.
             */
            const path =
              getMenuPath(
                item.path,
              );

            return (
              <NavLink
                key={
                  item.label + path
                }
                to={path}
                style={{
                  textDecoration:
                    'none',
                  color: 'inherit',
                  width: '100%',
                }}
              >
                {({ isActive }) => (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems:
                        'center',
                      justifyContent:
                        collapsed
                          ? 'center'
                          : 'flex-start',
                      gap: collapsed
                        ? 0
                        : 1.5,
                      px: collapsed
                        ? 0
                        : 2,
                      py: 1.4,
                      minHeight: 48,
                      borderRadius:
                        '8px',
                      color: isActive
                        ? '#1976d2'
                        : '#64748b',
                      backgroundColor:
                        isActive
                          ? '#eaf3ff'
                          : 'transparent',
                      transition:
                        'all 0.2s ease',

                      '& svg': {
                        fontSize: 20,
                        flexShrink: 0,
                      },

                      '&:hover': {
                        backgroundColor:
                          isActive
                            ? '#eaf3ff'
                            : '#f1f5f9',
                        color:
                          '#1976d2',
                      },
                    }}
                  >
                    {item.icon}

                    {!collapsed && (
                      <Typography
                        sx={{
                          fontWeight: 600,
                          color:
                            'text.primary',
                          whiteSpace:
                            'nowrap',
                        }}
                      >
                        {item.label}
                      </Typography>
                    )}
                  </Box>
                )}
              </NavLink>
            );
          },
        )}

        {/* Settings */}

        {canAccessSettings && (
          <NavLink
            to={
              settingsMenuItem.path
            }
            style={{
              textDecoration:
                'none',
              color: 'inherit',
              width: '100%',
            }}
          >
            {({ isActive }) => (
              <Box
                sx={{
                  display: 'flex',
                  alignItems:
                    'center',
                  justifyContent:
                    collapsed
                      ? 'center'
                      : 'flex-start',
                  gap: collapsed
                    ? 0
                    : 1.5,
                  px: collapsed
                    ? 0
                    : 2,
                  py: 1.4,
                  minHeight: 48,
                  borderRadius:
                    '8px',
                  color: isActive
                    ? '#1976d2'
                    : '#64748b',
                  backgroundColor:
                    isActive
                      ? '#eaf3ff'
                      : 'transparent',

                  '& svg': {
                    fontSize: 20,
                    flexShrink: 0,
                  },

                  '&:hover': {
                    backgroundColor:
                      isActive
                        ? '#eaf3ff'
                        : '#f1f5f9',
                    color:
                      '#1976d2',
                  },
                }}
              >
                {
                  settingsMenuItem.icon
                }

                {!collapsed && (
                  <Typography
                    sx={{
                      fontSize:
                        '1rem',
                      fontWeight: 600,
                      lineHeight:
                        1.5,
                      color:
                        'text.primary',
                      whiteSpace:
                        'nowrap',
                    }}
                  >
                    {
                      settingsMenuItem.label
                    }
                  </Typography>
                )}
              </Box>
            )}
          </NavLink>
        )}

      </Stack>

      <Box>
        {/* Collapse / Expand Button */}

        <IconButton
          onClick={onToggle}
          aria-label={
            collapsed
              ? 'Expand sidebar'
              : 'Collapse sidebar'
          }
          size="small"
          sx={{
            position: 'absolute',
            top: '97vh',
            right: collapsed
              ? 4
              : 8,
            transform:
              'translateY(-50%)',
            width: 32,
            height: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#64748b',
            zIndex: 2,
          }}
        >
          {collapsed ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </Box>
    </Box>
  );
}