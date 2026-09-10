import {
    Avatar,
    Box,
    Stack,
    Typography,
} from '@mui/material';

import type { Patient } from '../../types/patient.types';

interface ProfileSummaryProps {
    patient: Patient;
}

export default function ProfileSummary({
    patient,
}: ProfileSummaryProps) {
    const avatarInitial =
        patient.fullName
            ?.trim()
            .charAt(0)
            .toUpperCase() || '?';

    return (
        <Stack
            spacing={1.5}
            sx={{
                alignItems: 'center',
            }}
        >
            <Avatar
                sx={{
                    width: 72,
                    height: 72,
                    backgroundColor: '#1976d2',
                    fontSize: '1.5rem',
                    fontWeight: 600,
                }}
            >
                {avatarInitial}
            </Avatar>

            <Box
                sx={{
                    textAlign: 'center',
                }}
            >
                <Typography
                    sx={{
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        color: '#172b4d',
                    }}
                >
                    {patient.fullName}
                </Typography>

                <Typography
                    sx={{
                        fontSize: '0.85rem',
                        color: '#64748b',
                    }}
                >
                    Patient Account
                </Typography>
            </Box>
        </Stack>
    );
}