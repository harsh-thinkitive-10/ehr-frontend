import {
    AppBar,
    Avatar,
    Box,
    IconButton,
    InputBase,
    Stack,
    Toolbar,
    Typography,
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

export default function Header() {
    return (
        <AppBar
            position="fixed"
            elevation={0}
            sx={{
                left: 250,
                width: 'calc(100% - 250px)',
                backgroundColor: '#ffffff',
                color: '#172b4d',
                borderBottom: '1px solid #e5e7eb',
            }}
        >
            <Toolbar
                sx={{
                    minHeight: '72px !important',
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
                        backgroundColor: '#f8fafc',
                        border: '1px solid #e5e7eb',
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
                        sx={{
                            color: '#64748b',

                            '&:hover': {
                                backgroundColor: '#f1f5f9',
                            },
                        }}
                    >
                        <NotificationsNoneIcon />
                    </IconButton>

                    {/* User */}

                    <Stack
                        direction="row"
                        spacing={1.5}
                        sx={{
                            alignItems: 'center',
                        }}
                    >
                        <Avatar
                            sx={{
                                width: 38,
                                height: 38,
                                backgroundColor: '#1976d2',
                                fontSize: '0.9rem',
                                fontWeight: 600,
                            }}
                        >
                            P
                        </Avatar>

                        <Box>
                            <Typography
                                sx={{
                                    fontSize: '0.875rem',
                                    fontWeight: 600,
                                    lineHeight: 1.2,
                                }}
                            >
                                Patient
                            </Typography>

                            <Typography
                                sx={{
                                    fontSize: '0.75rem',
                                    color: '#64748b',
                                    lineHeight: 1.2,
                                }}
                            >
                                Patient Account
                            </Typography>
                        </Box>
                    </Stack>
                </Stack>
            </Toolbar>
        </AppBar>
    );
}