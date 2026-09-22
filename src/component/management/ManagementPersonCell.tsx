import { Avatar, Stack, Typography } from '@mui/material';

interface ManagementPersonCellProps {
  name: string;
}

export default function ManagementPersonCell({
  name,
}: ManagementPersonCellProps) {
  const initials = name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
      <Avatar sx={{ width: 36, height: 36, fontSize: 14, bgcolor: '#eaf3ff', color: 'primary.main' }}>
        {initials}
      </Avatar>
      <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
        {name}
      </Typography>
    </Stack>
  );
}