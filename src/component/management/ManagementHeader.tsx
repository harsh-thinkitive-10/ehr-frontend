import { Add } from '@mui/icons-material';
import { Box, Button, Stack, Typography } from '@mui/material';

interface ManagementHeaderProps {
  title: string;
  description: string;
  buttonLabel: string;
  onAdd: () => void;
}

export default function ManagementHeader({
  title,
  description,
  buttonLabel,
  onAdd,
}: ManagementHeaderProps) {
  return (
    <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
      <Box>
        <Typography variant="h5">{title}</Typography>
        <Typography variant="body2" sx={{ mt: 0.5 }}>{description}</Typography>
      </Box>

      <Button variant="contained" startIcon={<Add />} onClick={onAdd}>
        {buttonLabel}
      </Button>
    </Stack>
  );
}