import {
  Box,
  Button,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import type { PatientGender } from '../../types/patient';

export interface PatientFilterProps {
  gender: PatientGender | undefined;
  age: number | undefined;

  sortBy: string;
  sortDirection: 'asc' | 'desc';

  onGenderChange: (
    gender: PatientGender | undefined,
  ) => void;

  onAgeChange: (
    age: number | undefined,
  ) => void;

  onSortByChange: (
    sortBy: string,
  ) => void;

  onSortDirectionChange: (
    direction: 'asc' | 'desc',
  ) => void;

  onClear: () => void;
  onApply: () => void;
}

export default function PatientFilter({
  gender,
  age,
  sortBy,
  sortDirection,
  onGenderChange,
  onAgeChange,
  onSortByChange,
  onSortDirectionChange,
  onClear,
  onApply,
}: PatientFilterProps) {
  const handleGenderChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >,
  ) => {
    const value = event.target.value;

    onGenderChange(
      value === ''
        ? undefined
        : (value as PatientGender),
    );
  };

  const handleAgeChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >,
  ) => {
    const value = event.target.value;

    if (value === '') {
      onAgeChange(undefined);
      return;
    }

    const numericAge = Number(value);

    if (
      Number.isInteger(numericAge) &&
      numericAge >= 0 &&
      numericAge <= 150
    ) {
      onAgeChange(numericAge);
    }
  };

  return (
    <Paper
      sx={{
        p: 3,
      }}
    >
      <Stack spacing={2}>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 600,
          }}
        >
          Filter Patients
        </Typography>

        <Stack
          direction={{
            xs: 'column',
            sm: 'row',
          }}
          spacing={2}
        >
          {/* =========================
              Gender
              ========================= */}

          <TextField
            select
            label="Gender"
            value={gender ?? ''}
            onChange={handleGenderChange}
            size="small"
            fullWidth
          >
            <MenuItem value="">
              All
            </MenuItem>

            <MenuItem value="MALE">
              Male
            </MenuItem>

            <MenuItem value="FEMALE">
              Female
            </MenuItem>

            <MenuItem value="OTHER">
              Other
            </MenuItem>
          </TextField>

          {/* =========================
              Age
              ========================= */}

          <TextField
            label="Age"
            type="number"
            value={age ?? ''}
            onChange={handleAgeChange}
            size="small"
            fullWidth
            slotProps={{
              htmlInput: {
                min: 0,
                max: 150,
              },
            }}
          />

          {/* =========================
              Sort By
              ========================= */}

          <TextField
            select
            label="Sort By"
            value={sortBy}
            onChange={(event) => {
              onSortByChange(
                event.target.value,
              );
            }}
            size="small"
            fullWidth
          >
            <MenuItem value="fullName">
              Full Name
            </MenuItem>

            <MenuItem value="age">
              Age
            </MenuItem>

            <MenuItem value="gender">
              Gender
            </MenuItem>

            <MenuItem value="email">
              Email
            </MenuItem>
          </TextField>

          {/* =========================
              Sort Direction
              ========================= */}

          <TextField
            select
            label="Order"
            value={sortDirection}
            onChange={(event) => {
              onSortDirectionChange(
                event.target.value as
                  | 'asc'
                  | 'desc',
              );
            }}
            size="small"
            fullWidth
          >
            <MenuItem value="asc">
              Ascending
            </MenuItem>

            <MenuItem value="desc">
              Descending
            </MenuItem>
          </TextField>
        </Stack>

        {/* =========================
            Actions
            ========================= */}

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 1.5,
          }}
        >
          <Button
            variant="outlined"
            onClick={onClear}
          >
            Clear
          </Button>

          <Button
            variant="contained"
            onClick={onApply}
          >
            Apply Filter
          </Button>
        </Box>
      </Stack>
    </Paper>
  );
}