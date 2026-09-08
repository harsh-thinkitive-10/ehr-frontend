import {
  Box,
  Typography,
} from '@mui/material';

import AuthLayout from '../../../layouts/AuthLayout/AuthLayout';
import { LoginForm } from '../components';

export default function LoginPage() {
  return (
    <AuthLayout>
      <Box>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            color: '#12263f',
            mb: 1,
            fontSize: {
              xs: '2rem',
              md: '2.5rem',
            },
          }}
        >
          Welcome Back
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: '#64748b',
            mb: 5,
          }}
        >
          Sign in to your EHR account to continue
        </Typography>

        <LoginForm />
      </Box>
    </AuthLayout>
  );
}