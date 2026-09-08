import {
    Box,
    Card,
    CardContent,
    Stack,
    Typography,
} from '@mui/material';

import type { ReactNode } from 'react';

interface StatCardProps {
    title: string;
    value: string | number;
    subtitle?: string;
    icon: ReactNode;
}

export default function StatCard({
    title,
    value,
    subtitle,
    icon,
}: StatCardProps) {
    return (
        <Card
            elevation={0}
            sx={{
                border: '1px solid #e5e7eb',
                borderRadius: '10px',
                backgroundColor: '#ffffff',
            }}
        >
            <CardContent
                sx={{
                    p: 2.5,

                    '&:last-child': {
                        pb: 2.5,
                    },
                }}
            >
                <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                    }}
                >
                    {/* Content */}

                    <Box>
                        <Typography
                            sx={{
                                fontSize: '0.85rem',
                                fontWeight: 500,
                                color: '#64748b',
                            }}
                        >
                            {title}
                        </Typography>

                        <Typography
                            variant="h4"
                            sx={{
                                mt: 1,
                                fontWeight: 700,
                                color: '#172b4d',
                            }}
                        >
                            {value}
                        </Typography>

                        {subtitle && (
                            <Typography
                                sx={{
                                    fontSize: '0.75rem',
                                    color: '#94a3b8',
                                    mt: 0.5,
                                }}
                            >
                                {subtitle}
                            </Typography>
                        )}
                    </Box>

                    {/* Icon */}

                    <Box
                        sx={{
                            width: 42,
                            height: 42,
                            borderRadius: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#eaf3ff',
                            color: '#1976d2',
                            flexShrink: 0,

                            '& svg': {
                                fontSize: 21,
                            },
                        }}
                    >
                        {icon}
                    </Box>
                </Stack>
            </CardContent>
        </Card>
    );
}