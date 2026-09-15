import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import {
  CssBaseline,
  ThemeProvider,
} from '@mui/material';
import { router } from './app/router';
import { AuthProvider } from './features/auth/context';
import './index.css';
import {QueryClientProvider,} from '@tanstack/react-query';
import {queryClient,} from './app/queryClient';
import { theme } from './app/theme';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>,
);