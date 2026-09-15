import { Outlet } from 'react-router-dom';
import { useState } from 'react';

import { Box } from '@mui/material';

import Header from './Header';
import Sidebar from './Sidebar';


export default function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);

  const handleSidebarToggle = () => {
    setCollapsed((previous) => !previous);
  };
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#f8fafc',
      }}
    >
      <Sidebar 
        collapsed={collapsed}
        onToggle={handleSidebarToggle}
      />
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
          {<Outlet />}
        </Box>
      </Box>
    </Box>
  );
}