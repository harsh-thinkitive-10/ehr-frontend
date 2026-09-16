import { useState } from 'react';

import {
  AppBar,
  Avatar,
  Box,
  Divider,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import LogoutIcon from '@mui/icons-material/Logout';

import { useAuth } from '../../features/auth/context';

import PatientProfileDrawer from '../../features/patient/component/profile/ProfileDrawer';
import DoctorProfileDrawer from '../../features/doctor/component/profile/ProfileDrawer';

interface HeaderProps {
  sidebarWidth: number;
}

export default function Header({
  sidebarWidth,
}: HeaderProps) {
  const {
    user,
    roles,
    logout,
  } = useAuth();

  const [profileAnchorEl, setProfileAnchorEl] =
    useState<null | HTMLElement>(null);

  const [patientProfileOpen, setPatientProfileOpen] =
    useState(false);

  const [doctorProfileOpen, setDoctorProfileOpen] =
    useState(false);

  const profileMenuOpen =
    Boolean(profileAnchorEl);

  const handleProfileClick = (
    event: React.MouseEvent<HTMLElement>,
  ) => {
    setProfileAnchorEl(
      event.currentTarget,
    );
  };

  const handleProfileClose = () => {
    setProfileAnchorEl(null);
  };

  const handleMyProfile = () => {
    handleProfileClose();

    if (roles.includes('PATIENT')) {
      setPatientProfileOpen(true);
      return;
    }

    if (roles.includes('DOCTOR')) {
      setDoctorProfileOpen(true);
    }
  };

  const handleLogout = async () => {
    handleProfileClose();

    await logout();
  };

  const displayName =
    user?.name ??
    user?.username ??
    'User';

  const roleLabel =
    roles[0] ?? 'User';

  const avatarLetter =
    displayName.charAt(0).toUpperCase();

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          left: `${sidebarWidth}px`,
          width: `calc(100% - ${sidebarWidth}px)`,
          backgroundColor: '#ffffff',
          color: 'text.primary',
          borderBottom: '1px solid #e5e7eb',
          transition:
            'left 0.2s ease, width 0.2s ease',
        }}
      >
        <Toolbar
          sx={{
            minHeight: '70px !important',
            px: 4,
            justifyContent: 'space-between',
          }}
        >
          {/* Search */}

          <Box
            sx={{
              width: 360,
              height: 40,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              px: 1.5,
              borderRadius: '8px',
              backgroundColor:
                'background.default',
              border: 1,
              borderColor: 'divider',
            }}
          >
            <SearchIcon
              sx={{
                color: '#94a3b8',
                fontSize: 21,
              }}
            />

            <InputBase
              placeholder="Search patients, records..."
              sx={{
                flex: 1,
                fontSize: '0.875rem',

                '& input::placeholder': {
                  color: '#94a3b8',
                  opacity: 1,
                },
              }}
            />
          </Box>

          {/* Right side */}

          <Stack
            direction="row"
            spacing={2}
            sx={{
              alignItems: 'center',
            }}
          >
            {/* Notifications */}

            <IconButton
              aria-label="Notifications"
              sx={{
                color: '#64748b',

                '&:hover': {
                  backgroundColor:
                    '#f1f5f9',
                },
              }}
            >
              <NotificationsNoneIcon />
            </IconButton>

            {/* User */}

            <Stack
              direction="row"
              spacing={1.5}
              onClick={handleProfileClick}
              aria-controls={
                profileMenuOpen
                  ? 'profile-menu'
                  : undefined
              }
              aria-haspopup="true"
              aria-expanded={
                profileMenuOpen
                  ? 'true'
                  : undefined
              }
              sx={{
                alignItems: 'center',
                cursor: 'pointer',
                borderRadius: 2,
                px: 1,
                py: 0.5,
                transition:
                  'background-color 0.2s ease',

                '&:hover': {
                  backgroundColor:
                    '#f8fafc',
                },
              }}
            >
              <Avatar
                sx={{
                  width: 38,
                  height: 38,
                  backgroundColor:
                    '#1976d2',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                }}
              >
                {avatarLetter}
              </Avatar>

              <Box>
                <Typography
                  sx={{
                    fontWeight: 600,
                    color: 'text.primary',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {displayName}
                </Typography>

                <Typography
                  sx={{
                    fontSize: '0.75rem',
                    color: 'text.secondary',
                    lineHeight: 1.2,
                  }}
                >
                  {roleLabel}
                </Typography>
              </Box>
            </Stack>

            {/* Profile Menu */}

            <Menu
              id="profile-menu"
              anchorEl={profileAnchorEl}
              open={profileMenuOpen}
              onClose={handleProfileClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              slotProps={{
                paper: {
                  sx: {
                    mt: 1,
                    minWidth: 200,
                    border:
                      '1px solid #e5e7eb',
                    borderRadius: 2,
                    boxShadow:
                      '0 8px 24px rgba(15, 23, 42, 0.08)',
                  },
                },
              }}
            >
              {/* My Profile */}

              <MenuItem
                onClick={handleMyProfile}
                sx={{
                  gap: 1.5,
                  py: 1.25,
                }}
              >
                <PersonOutlinedIcon
                  fontSize="small"
                  sx={{
                    color:
                      'text.secondary',
                  }}
                />

                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 500,
                  }}
                >
                  My Profile
                </Typography>
              </MenuItem>

              <Divider />

              {/* Logout */}

              <MenuItem
                onClick={handleLogout}
                sx={{
                  gap: 1.5,
                  py: 1.25,
                }}
              >
                <LogoutIcon
                  fontSize="small"
                  sx={{
                    color: '#ef4444',
                  }}
                />

                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 500,
                    color: '#ef4444',
                  }}
                >
                  Logout
                </Typography>
              </MenuItem>
            </Menu>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Patient Profile Drawer */}

      {patientProfileOpen &&
        roles.includes('PATIENT') && (
          <PatientProfileDrawer
            open={patientProfileOpen}
            onClose={() =>
              setPatientProfileOpen(false)
            }
          />
        )}

      {/* Doctor Profile Drawer */}

      {doctorProfileOpen &&
        roles.includes('DOCTOR') && (
          <DoctorProfileDrawer
            open={doctorProfileOpen}
            onClose={() =>
              setDoctorProfileOpen(false)
            }
          />
        )}
    </>
  );
}