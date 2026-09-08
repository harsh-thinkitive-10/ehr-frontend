import type { ReactNode } from 'react';

import { Box } from '@mui/material';

import Sidebar from './Sidebar';
import Header from './Header';

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({
  children,
}: AppLayoutProps) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#f8fafc',
      }}
    >
      <Sidebar />

      <Header />

      <Box
        component="main"
        sx={{
          ml: '250px',
          pt: '72px',
          minHeight: '100vh',
        }}
      >
        <Box
          sx={{
            p: 4,
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}