import { useMemo, useState } from 'react';

import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EventIcon from '@mui/icons-material/Event';
import FilterListIcon from '@mui/icons-material/FilterList';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { useDoctorAppointments } from '../hooks/useDoctorAppointments';

import type { DoctorAppointment } from '../types/doctorAppointment';
import type { AppointmentStatus } from '../types/appointment';

type AppointmentFilter = 'ALL' | AppointmentStatus;

const PAGE_SIZE = 10;

const appointmentFilters: { value: AppointmentFilter; label: string }[] = [
  { value: 'ALL', label: 'All' },
  { value: 'SCHEDULED', label: 'Scheduled' },
  { value: 'PENDING', label: 'Pending' },
  { value: 'CHECK_IN', label: 'Check In' },
  { value: 'COMPLETED', label: 'Completed' },
  { value: 'CANCELLED', label: 'Cancelled' },
  { value: 'NO_SHOW', label: 'No Show' },
  { value: 'RESCHEDULED', label: 'Rescheduled' },
  { value: 'CLOSED', label: 'Closed' },
];

function getPatientInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase();
}

function formatAppointmentDate(date: string) {
  const value = new Date(date);

  return {
    date: value.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }),
    time: value.toLocaleTimeString('en-IN', {
      hour: 'numeric',
      minute: '2-digit',
    }),
  };
}

function getStatusLabel(status: AppointmentStatus) {
  return status.replaceAll('_', ' ');
}

function getStatusColor(status: AppointmentStatus): 'primary' | 'success' | 'warning' | 'error' | 'default' {
  switch (status) {
    case 'SCHEDULED':
      return 'primary';
    case 'PENDING':
    case 'CHECK_IN':
    case 'RESCHEDULED':
      return 'warning';
    case 'COMPLETED':
      return 'success';
    case 'CANCELLED':
    case 'NO_SHOW':
      return 'error';
    case 'CLOSED':
    default:
      return 'default';
  }
}

function getFilterCount(appointments: DoctorAppointment[], filter: AppointmentFilter) {
  if (filter === 'ALL') return appointments.length;
  return appointments.filter((appointment) => appointment.status === filter).length;
}

export default function DoctorAppointmentList() {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);
  const [filter, setFilter] = useState<AppointmentFilter>('ALL');
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null);

  const { data, isLoading, isError, error } = useDoctorAppointments({
    page,
    size: pageSize,
  });

  const appointments = useMemo(() => data?.content ?? [], [data?.content]);

  const filteredAppointments = useMemo(() => {
    if (filter === 'ALL') return appointments;
    return appointments.filter((appointment) => appointment.status === filter);
  }, [appointments, filter]);

  const selectedFilterLabel = appointmentFilters.find((item) => item.value === filter)?.label ?? 'All';

  const handleFilterOpen = (event: React.MouseEvent<HTMLElement>) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleFilterChange = (newFilter: AppointmentFilter) => {
    setFilter(newFilter);
    setPage(0);
    handleFilterClose();
  };

  const handlePageChange = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setPageSize(Number(event.target.value));
    setPage(0);
  };

  if (isError) {
    return (
      <Box>
        <Typography color="error" sx={{ fontWeight: 500 }}>
          {error instanceof Error ? error.message : 'Unable to load your appointments.'}
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        sx={{
          mb: 4,
          alignItems: { xs: 'flex-start', sm: 'center' },
          justifyContent: 'space-between',
        }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
            Appointments
          </Typography>

          <Typography variant="body1">
            View and manage your patient appointments.
          </Typography>
        </Box>

        <Stack direction="row" spacing={1.5}>
          <Button
            variant="outlined"
            startIcon={<FilterListIcon />}
            onClick={handleFilterOpen}
            sx={{ minHeight: 48, px: 2.5 }}
          >
            Filter

            {filter !== 'ALL' && (
              <Chip label={selectedFilterLabel} size="small" sx={{ ml: 1, height: 24 }} />
            )}
          </Button>

          <Menu
            anchorEl={filterAnchorEl}
            open={Boolean(filterAnchorEl)}
            onClose={handleFilterClose}
            slotProps={{
              paper: {
                sx: { mt: 1, minWidth: 210 },
              },
            }}
          >
            {appointmentFilters.map((item) => {
              const count = getFilterCount(appointments, item.value);
              const isSelected = filter === item.value;

              return (
                <MenuItem
                  key={item.value}
                  selected={isSelected}
                  onClick={() => handleFilterChange(item.value)}
                  sx={{ minHeight: 44, px: 2 }}
                >
                  <Stack
                    direction="row"
                    sx={{
                      width: '100%',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Typography sx={{ fontWeight: isSelected ? 600 : 400 }}>
                      {item.label}
                    </Typography>

                    <Chip label={count} size="small" sx={{ height: 22, minWidth: 28 }} />
                  </Stack>
                </MenuItem>
              );
            })}
          </Menu>

          <Button
            variant="contained"
            startIcon={<CalendarMonthIcon />}
            sx={{ minHeight: 48, px: 2.5 }}
          >
            Book Appointment
          </Button>
        </Stack>
      </Stack>

      <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: 1100 }}>
          <TableHead>
            <TableRow>
              <TableCell width={60}>#</TableCell>
              <TableCell sx={{ minWidth: 220 }}>Patient</TableCell>
              <TableCell sx={{ minWidth: 80 }}>Age</TableCell>
              <TableCell sx={{ minWidth: 100 }}>Gender</TableCell>
              <TableCell sx={{ minWidth: 180 }}>Contact</TableCell>
              <TableCell sx={{ minWidth: 180 }}>Reason for Visit</TableCell>
              <TableCell sx={{ minWidth: 170 }}>Date & Time</TableCell>
              <TableCell sx={{ minWidth: 130 }}>Status</TableCell>
              <TableCell sx={{ minWidth: 150 }}>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {isLoading &&
              Array.from({ length: 3 }).map((_, index) => (
                <TableRow key={`loading-${index}`}>
                  <TableCell colSpan={9} sx={{ py: 4, color: 'text.secondary' }}>
                    Loading appointments...
                  </TableCell>
                </TableRow>
              ))}

            {!isLoading && filteredAppointments.length === 0 && (
              <TableRow>
                <TableCell colSpan={9} align="center" sx={{ py: 8 }}>
                  <Stack spacing={1} sx={{ alignItems: 'center' }}>
                    <EventIcon sx={{ fontSize: 40, color: 'text.secondary' }} />

                    <Typography variant="h6">
                      No appointments found
                    </Typography>

                    <Typography variant="body2">
                      No appointments are available for this filter.
                    </Typography>
                  </Stack>
                </TableCell>
              </TableRow>
            )}

            {!isLoading &&
              filteredAppointments.map((appointment, index) => {
                const date = formatAppointmentDate(appointment.appointmentDate);

                return (
                  <TableRow
                    key={`${appointment.patientEmail}-${appointment.appointmentDate}-${index}`}
                    hover
                  >
                    <TableCell>
                      <Typography variant="body2">
                        {page * pageSize + index + 1}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
                        <Avatar
                          sx={{
                            width: 42,
                            height: 42,
                            bgcolor: 'primary.light',
                            color: 'primary.main',
                            fontSize: '0.8125rem',
                            fontWeight: 600,
                          }}
                        >
                          {getPatientInitials(appointment.patientFullName)}
                        </Avatar>

                        <Stack spacing={0.25}>
                          <Typography sx={{ fontWeight: 600 }}>
                            {appointment.patientFullName}
                          </Typography>

                          <Typography variant="body2">
                            {appointment.patientEmail}
                          </Typography>
                        </Stack>
                      </Stack>
                    </TableCell>

                    <TableCell>
                      <Typography variant="body2">{appointment.patientAge}</Typography>
                    </TableCell>

                    <TableCell>
                      <Typography variant="body2">{appointment.patientGender}</Typography>
                    </TableCell>

                    <TableCell>
                      <Typography variant="body2">{appointment.patientPhoneNumber}</Typography>
                      <Typography variant="body2">{appointment.patientEmail}</Typography>
                    </TableCell>

                    <TableCell>
                      <Typography variant="body2">{appointment.reasonForVisit}</Typography>
                    </TableCell>

                    <TableCell>
                      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                        <EventIcon sx={{ fontSize: 20, color: 'text.secondary' }} />

                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.primary' }}>
                            {date.date}
                          </Typography>

                          <Typography variant="body2">
                            {date.time}
                          </Typography>
                        </Box>
                      </Stack>
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={getStatusLabel(appointment.status)}
                        color={getStatusColor(appointment.status)}
                        size="small"
                      />
                    </TableCell>

                    <TableCell>
                      <Button
                        variant="outlined"
                        endIcon={<ChevronRightIcon />}
                        sx={{
                          minHeight: 40,
                          px: 1.5,
                          borderRadius: 1,
                          whiteSpace: 'nowrap',
                        }}
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>

        <Divider />

        {!isLoading && data && (
          <TablePagination
            component="div"
            count={data.totalElements}
            page={data.number}
            onPageChange={handlePageChange}
            rowsPerPage={pageSize}
            onRowsPerPageChange={handlePageSizeChange}
            rowsPerPageOptions={[10, 20, 50, 100]}
            labelRowsPerPage="Show"
            labelDisplayedRows={({ from, to, count }) => `${from}–${to} of ${count}`}
          />
        )}
      </TableContainer>
    </Box>
  );
}