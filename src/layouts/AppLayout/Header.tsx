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

import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../features/auth/context';

import ProfileDrawer from '../../features/patient/component/ProfileDrawer';

export default function Header() {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const [profileAnchorEl, setProfileAnchorEl] =
        useState<null | HTMLElement>(null);

    const [profileDrawerOpen, setProfileDrawerOpen] =
        useState(false);

    const profileMenuOpen =
        Boolean(profileAnchorEl);

    const handleProfileClick = (
        event: React.MouseEvent<HTMLElement>,
    ) => {
        setProfileAnchorEl(event.currentTarget);
    };

    const handleProfileClose = () => {
        setProfileAnchorEl(null);
    };

    const handleMyProfile = () => {
        handleProfileClose();

        setProfileDrawerOpen(true);
    };

    const handleLogout = () => {
        handleProfileClose();

        logout();

        navigate('/login', {
            replace: true,
        });
    };

    const handleProfileDrawerClose = () => {
        setProfileDrawerOpen(false);
    };

    return (
        <>
            <AppBar
                position="fixed"
                elevation={0}
                sx={{
                    left: 250,
                    width: 'calc(100% - 250px)',
                    backgroundColor: '#ffffff',
                    color: '#172b4d',
                    borderBottom:
                        '1px solid #e5e7eb',
                }}
            >
                <Toolbar
                    sx={{
                        minHeight:
                            '72px !important',
                        px: 4,
                        justifyContent:
                            'space-between',
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
                                '#f8fafc',
                            border:
                                '1px solid #e5e7eb',
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
                                fontSize:
                                    '0.875rem',

                                '& input::placeholder':
                                    {
                                        color:
                                            '#94a3b8',
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
                            alignItems:
                                'center',
                        }}
                    >
                        {/* Notifications */}

                        <IconButton
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
                            onClick={
                                handleProfileClick
                            }
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
                                alignItems:
                                    'center',
                                cursor:
                                    'pointer',
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
                                    fontSize:
                                        '0.9rem',
                                    fontWeight: 600,
                                }}
                            >
                                P
                            </Avatar>

                            <Box>
                                <Typography
                                    sx={{
                                        fontSize:
                                            '0.875rem',
                                        fontWeight:
                                            600,
                                        lineHeight:
                                            1.2,
                                    }}
                                >
                                    Patient
                                </Typography>

                                <Typography
                                    sx={{
                                        fontSize:
                                            '0.75rem',
                                        color:
                                            '#64748b',
                                        lineHeight:
                                            1.2,
                                    }}
                                >
                                    Patient Account
                                </Typography>
                            </Box>
                        </Stack>

                        {/* Profile Menu */}

                        <Menu
                            id="profile-menu"
                            anchorEl={
                                profileAnchorEl
                            }
                            open={
                                profileMenuOpen
                            }
                            onClose={
                                handleProfileClose
                            }
                            anchorOrigin={{
                                vertical:
                                    'bottom',
                                horizontal:
                                    'right',
                            }}
                            transformOrigin={{
                                vertical:
                                    'top',
                                horizontal:
                                    'right',
                            }}
                            slotProps={{
                                paper: {
                                    sx: {
                                        mt: 1,
                                        minWidth: 200,
                                        border:
                                            '1px solid #e5e7eb',
                                        borderRadius:
                                            2,
                                        boxShadow:
                                            '0 8px 24px rgba(15, 23, 42, 0.08)',
                                    },
                                },
                            }}
                        >
                            {/* My Profile */}

                            <MenuItem
                                onClick={
                                    handleMyProfile
                                }
                                sx={{
                                    gap: 1.5,
                                    py: 1.25,
                                }}
                            >
                                <PersonOutlinedIcon
                                    fontSize="small"
                                    sx={{
                                        color:
                                            '#64748b',
                                    }}
                                />

                                <Typography
                                    variant="body2"
                                    sx={{
                                        fontWeight:
                                            500,
                                    }}
                                >
                                    My Profile
                                </Typography>
                            </MenuItem>

                            <Divider />

                            {/* Logout */}

                            <MenuItem
                                onClick={
                                    handleLogout
                                }
                                sx={{
                                    gap: 1.5,
                                    py: 1.25,
                                }}
                            >
                                <LogoutIcon
                                    fontSize="small"
                                    sx={{
                                        color:
                                            '#ef4444',
                                    }}
                                />

                                <Typography
                                    variant="body2"
                                    sx={{
                                        fontWeight:
                                            500,
                                        color:
                                            '#ef4444',
                                    }}
                                >
                                    Logout
                                </Typography>
                            </MenuItem>
                        </Menu>
                    </Stack>
                </Toolbar>
            </AppBar>

            {/* Profile Drawer */}

            <ProfileDrawer
                open={
                    profileDrawerOpen
                }
                onClose={
                    handleProfileDrawerClose
                }
            />
        </>
    );
}