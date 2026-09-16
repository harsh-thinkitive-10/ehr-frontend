import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { Box } from '@mui/material';

import Header from './Header';
import Sidebar from './Sidebar';

export const SIDEBAR_WIDTH = 250;
export const SIDEBAR_COLLAPSED_WIDTH = 72;

export default function AppLayout() {
  const [collapsed, setCollapsed] =
    useState(false);

  const sidebarWidth = collapsed
    ? SIDEBAR_COLLAPSED_WIDTH
    : SIDEBAR_WIDTH;

  const handleSidebarToggle = () => {
    setCollapsed(
      (previous) => !previous,
    );
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        backgroundColor: '#f8fafc',
      }}
    >
      <Sidebar
        collapsed={collapsed}
        onToggle={handleSidebarToggle}
      />

      <Header
        sidebarWidth={sidebarWidth}
      />

      <Box
        component="main"
        sx={{
          ml: `${sidebarWidth}px`,
          pt: '72px',
          minHeight: '100vh',
          width: `calc(100% - ${sidebarWidth}px)`,
          transition:
            'margin-left 0.2s ease, width 0.2s ease',
        }}
      >
        <Box
          sx={{
            p: 4,
            width: '100%',
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}