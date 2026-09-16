import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';

interface ProfileDrawerProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function ProfileDrawer({
  open,
  onClose,
  children,
}: ProfileDrawerProps) {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: 400,
        },
      }}
    >
      {/* Header */}

      <Box
        sx={{
          px: 3,
          py: 1,
        }}
      >
        <Stack
          direction="row"
          sx={{
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: '#172b4d',
            }}
          >
            My Profile
          </Typography>

          <IconButton
            onClick={onClose}
            aria-label="Close profile"
          >
            <CloseIcon />
          </IconButton>
        </Stack>
      </Box>

      <Divider />

      <Box
        sx={{
          px: 3,
          py: 3,
        }}
      >
        {children}
      </Box>
    </Drawer>
  );
}