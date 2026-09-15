import {
  Box,
  Typography,
} from '@mui/material';

import {
  Outlet,
  useLocation,
} from 'react-router-dom';

const pageConfig = {
  '/login': {
    title: 'Welcome Back',
    subtitle: 'Sign in to your CarePlus EHR account',
  },

  '/forgot-password': {
    title: 'Forgot Password',
    subtitle: 'Enter your username to reset your password',
  },
};

export default function LoginLayout() {
  const location = useLocation();

  const config =
    pageConfig[location.pathname as keyof typeof pageConfig];

  return (
    <Box
      sx={{
        width: '100%',
      }}
    >
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
        {config.title}
      </Typography>

      <Typography
        variant="body1"
        sx={{
          color: '#64748b',
          mb: 5,
        }}
      >
        {config.subtitle}
      </Typography>

      <Outlet />
    </Box>
  );
}