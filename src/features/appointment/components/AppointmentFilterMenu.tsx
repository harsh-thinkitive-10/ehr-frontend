import {
  Chip,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';

import type {
  AppointmentStatus,
} from '../types/appointment';

import {
  appointmentStatusOptions,
} from '../constant/appointmentStatus';

export type AppointmentFilter =
  | 'ALL'
  | AppointmentStatus;

interface AppointmentFilterMenuProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  value: AppointmentFilter;
  counts?: Partial<
    Record<AppointmentFilter, number>
  >;
  onClose: () => void;
  onChange: (
    value: AppointmentFilter,
  ) => void;
}

export default function AppointmentFilterMenu({
  anchorEl,
  open,
  value,
  counts,
  onClose,
  onChange,
}: AppointmentFilterMenuProps) {
  const handleChange = (
    nextValue: AppointmentFilter,
  ) => {
    onChange(nextValue);
    onClose();
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            mt: 1,
            minWidth: 210,
            borderRadius: '10px',
          },
        },
      }}
    >
      {/* ALL */}

      <MenuItem
        selected={value === 'ALL'}
        onClick={() =>
          handleChange('ALL')
        }
        sx={{
          minHeight: 44,
          px: 2,
        }}
      >
        <Stack
          direction="row"
          sx={{
            width: '100%',
            alignItems: 'center',
            justifyContent:
              'space-between',
          }}
        >
          <Typography
            sx={{
              fontWeight:
                value === 'ALL'
                  ? 600
                  : 400,
            }}
          >
            All
          </Typography>

          {counts?.ALL !== undefined && (
            <Chip
              label={counts.ALL}
              size="small"
              sx={{
                height: 22,
                minWidth: 28,
                fontSize:
                  '0.75rem',
              }}
            />
          )}
        </Stack>
      </MenuItem>

      {/* STATUS OPTIONS */}

      {appointmentStatusOptions.map(
        (option) => {
          const selected =
            value === option.value;

          const count =
            counts?.[
              option.value
            ];

          return (
            <MenuItem
              key={option.value}
              selected={selected}
              onClick={() =>
                handleChange(
                  option.value,
                )
              }
              sx={{
                minHeight: 44,
                px: 2,
              }}
            >
              <Stack
                direction="row"
                sx={{
                  width: '100%',
                  alignItems:
                    'center',
                  justifyContent:
                    'space-between',
                }}
              >
                <Typography
                  sx={{
                    fontWeight:
                      selected
                        ? 600
                        : 400,
                  }}
                >
                  {option.label}
                </Typography>

                {count !==
                  undefined && (
                  <Chip
                    label={count}
                    size="small"
                    sx={{
                      height: 22,
                      minWidth: 28,
                      fontSize:
                        '0.75rem',
                    }}
                  />
                )}
              </Stack>
            </MenuItem>
          );
        },
      )}
    </Menu>
  );
}