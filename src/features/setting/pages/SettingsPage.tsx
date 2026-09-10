import {
  Box,
  Stack,
  Typography,
} from '@mui/material';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import AppLayout from '../../../layouts/AppLayout/AppLayout';

import ChangePasswordForm from '../../auth/components/password/ChangePasswordForm';

export default function SettingsPage() {
  return (
    <AppLayout>
      <Stack spacing={4}>
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: '#172b4d',
            }}
          >
            Settings
          </Typography>

          <Typography
            sx={{
              mt: 0.5,
              fontSize: '0.95rem',
              color: '#64748b',
            }}
          >
            Manage your account settings.
          </Typography>
        </Box>

        <Box
          sx={{
            maxWidth: 600,
            p: 3,
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
            backgroundColor: '#ffffff',
          }}
        >
          <Stack spacing={3}>
            <Stack
              direction="row"
              spacing={1.5}
              sx={{
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#eff6ff',
                  color: '#1976d2',
                }}
              >
                <LockOutlinedIcon />
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontSize: '1.05rem',
                    fontWeight: 700,
                    color: '#172b4d',
                  }}
                >
                  Change Password
                </Typography>

                <Typography
                  sx={{
                    fontSize: '0.85rem',
                    color: '#64748b',
                  }}
                >
                  Update your account password.
                </Typography>
              </Box>
            </Stack>

            <ChangePasswordForm />
          </Stack>
        </Box>
      </Stack>
    </AppLayout>
  );
}