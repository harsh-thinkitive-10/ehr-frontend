import {
  Box,
  Divider,
  Stack,
  Typography,
  IconButton,
} from '@mui/material';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';

import { NavLink } from 'react-router-dom';

import {
  menuItems,
  settingsMenuItem,
} from './navigation';

import {
  ROLES,
} from '../../features/auth/constant/roles';

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
   * ---------------------------------------------------------
   * Visible Navigation
   * ---------------------------------------------------------
   *
   * Only show navigation items that
   * the current user's role can access.
   *
   * ADMIN:
   * - Medical Records hidden
   * - Prescriptions hidden
   *
   * Other roles:
   * - Existing navigation remains unchanged.
   */
  const visibleMenuItems =
    menuItems.filter((item) => {
      /*
       * Hide Medical Records and
       * Prescriptions only for ADMIN.
       */
      if (
        roles.includes(ROLES.ADMIN) &&
        (
          item.label ===
            'Medical Records' ||
          item.label ===
            'Prescriptions'
        )
      ) {
        return false;
      }

      return hasAnyRole(
        roles,
        item.allowedRoles,
      );
    });

  /*
   * ---------------------------------------------------------
   * Management Access
   * ---------------------------------------------------------
   *
   * Management is ADMIN only.
   *
   * It will contain:
   *
   * - Location Management
   * - Provider Management
   * - Other admin management features later
   */
  const canAccessManagement =
    roles.includes(ROLES.ADMIN);

  /*
   * ---------------------------------------------------------
   * Settings Access
   * ---------------------------------------------------------
   */
  const canAccessSettings =
    hasAnyRole(
      roles,
      settingsMenuItem.allowedRoles,
    );

  /*
   * ---------------------------------------------------------
   * Role-specific Route Mapping
   * ---------------------------------------------------------
   *
   * Navigation contains domain-level paths.
   *
   * Example:
   *
   * /patients
   *
   * Admin:
   * /admin/patients
   *
   * Appointments:
   *
   * Patient -> /appointments
   * Doctor  -> /doctor/appointments
   * Admin   -> /admin/appointments
   */
  const getMenuPath = (
    path: string,
  ): string => {
    /*
     * Patient Management
     */
    if (
      path === '/patients' &&
      roles.includes(ROLES.ADMIN)
    ) {
      return '/admin/patients';
    }

    /*
     * Appointment Management
     */
    if (
      path === '/appointments' &&
      roles.includes(ROLES.ADMIN)
    ) {
      return '/admin/appointments';
    }

    if (
      path === '/appointments' &&
      roles.includes(ROLES.DOCTOR)
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
        borderRight: 1,
        borderColor: 'divider',
        backgroundColor:
          'background.paper',
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
      {/* -------------------------------------------------- */}
      {/* Logo / Header                                       */}
      {/* -------------------------------------------------- */}

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
              borderRadius: 1.25,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor:
                'action.hover',
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
                color: 'text.primary',
              }}
            >
              CarePlus
            </Typography>
          )}
        </Stack>
      </Box>

      <Divider />

      {/* -------------------------------------------------- */}
      {/* Main Navigation                                    */}
      {/* -------------------------------------------------- */}

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
             * Resolve the final route
             * according to current role.
             */
            const path =
              getMenuPath(
                item.path,
              );

            return (
              <NavLink
                key={
                  `${item.label}-${path}`
                }
                to={path}
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  width: '100%',
                }}
              >
                {({ isActive }) => (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
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
                      borderRadius: 1,
                      color: isActive
                        ? 'primary.main'
                        : 'text.secondary',
                      backgroundColor:
                        isActive
                          ? 'primary.light'
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
                            ? 'primary.light'
                            : 'action.hover',
                        color:
                          'primary.main',
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

        {/* ------------------------------------------------ */}
        {/* ADMIN MANAGEMENT                                 */}
        {/* ------------------------------------------------ */}

        {canAccessManagement && (
          <NavLink
            to="/admin/management"
            style={{
              textDecoration: 'none',
              color: 'inherit',
              width: '100%',
            }}
          >
            {({ isActive }) => (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
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
                  borderRadius: 1,
                  color: isActive
                    ? 'primary.main'
                    : 'text.secondary',
                  backgroundColor:
                    isActive
                      ? 'primary.light'
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
                        ? 'primary.light'
                        : 'action.hover',
                    color:
                      'primary.main',
                  },
                }}
              >
                <SettingsSuggestIcon />

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
                    Management
                  </Typography>
                )}
              </Box>
            )}
          </NavLink>
        )}

        {/* ------------------------------------------------ */}
        {/* Settings                                         */}
        {/* ------------------------------------------------ */}

        {canAccessSettings && (
          <NavLink
            to={
              settingsMenuItem.path
            }
            style={{
              textDecoration: 'none',
              color: 'inherit',
              width: '100%',
            }}
          >
            {({ isActive }) => (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
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
                  borderRadius: 1,
                  color: isActive
                    ? 'primary.main'
                    : 'text.secondary',
                  backgroundColor:
                    isActive
                      ? 'primary.light'
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
                        ? 'primary.light'
                        : 'action.hover',
                    color:
                      'primary.main',
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

      {/* -------------------------------------------------- */}
      {/* Collapse / Expand Button                           */}
      {/* -------------------------------------------------- */}

      <Box
        sx={{
          position: 'relative',
          flexShrink: 0,
          height: 48,
        }}
      >
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
            top: '50%',
            right: collapsed
              ? 4
              : 8,
            transform:
              'translateY(-50%)',
            width: 32,
            height: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent:
              'center',
            color:
              'text.secondary',

            '&:hover': {
              backgroundColor:
                'action.hover',
              color:
                'primary.main',
            },
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