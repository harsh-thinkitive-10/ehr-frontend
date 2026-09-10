import type { ReactNode } from 'react';
import {
    Box,
    Stack,
    Typography,
} from '@mui/material';

interface ProfileFieldProps {
    icon: ReactNode;
    label: string;
    value: string;
}

export default function ProfileField({
    icon,
    label,
    value,
}: ProfileFieldProps) {
    return (
        <Stack
            direction="row"
            spacing={2}
            sx={{
                alignItems: 'center',
            }}
        >
            <Box
                aria-hidden="true"
                sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '10px',
                    backgroundColor: '#eff6ff',
                    color: '#1976d2',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                }}
            >
                {icon}
            </Box>

            <Box>
                <Typography
                    sx={{
                        fontSize: '0.75rem',
                        color: '#64748b',
                        mb: 0.25,
                    }}
                >
                    {label}
                </Typography>

                <Typography
                    sx={{
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        color: '#172b4d',
                    }}
                >
                    {value}
                </Typography>
            </Box>
        </Stack>
    );
}