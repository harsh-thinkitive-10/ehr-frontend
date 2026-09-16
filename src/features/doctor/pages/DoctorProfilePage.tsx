import { useState } from 'react';
import { Button, Stack, Typography } from '@mui/material';

import DoctorProfileDrawer from '../component/profile/ProfileDrawer';

export default function DoctorProfilePage() {
  const [profileOpen, setProfileOpen] = useState(true);

  return (
    <>
      <Stack spacing={0.5}>
        <Typography variant="h4">
          My Profile
        </Typography>

        <Typography>
          View your professional profile information.
        </Typography>
      </Stack>

      <DoctorProfileDrawer
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
      />

      {!profileOpen && (
        <Button
          variant="contained"
          onClick={() => setProfileOpen(true)}
          sx={{ mt: 3, width: 'fit-content' }}
        >
          View Profile
        </Button>
      )}
    </>
  );
}