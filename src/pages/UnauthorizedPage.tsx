import {
  Box,
  Button,
  Stack,
  Typography,
} from '@mui/material';

import { Link } from 'react-router-dom';

export default function UnauthorizedPage() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        px: 3,
      }}
    >
      <Stack
        spacing={2}
        sx={{
          alignItems: 'center',
          textAlign: 'center',
          maxWidth: 500,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            color: 'text.primary',
          }}
        >
          403
        </Typography>

        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            color: 'text.primary',
          }}
        >
          Access Denied
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
        >
          You don't have permission to access this
          page.
        </Typography>

        <Button
          component={Link}
          to="/dashboard"
          variant="contained"
        >
          Back to Dashboard
        </Button>
      </Stack>
    </Box>
  );
}