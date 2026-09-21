import { useState } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FilterListIcon from '@mui/icons-material/FilterList';

import { useAdminAppointments } from '../hooks/useAdminAppointments';
import BookAppointmentDialog from './BookAppointmentDialog';
import AppointmentTable, { type AppointmentTableColumn } from './AppointmentTable';
import AppointmentStatusChip from './AppointmentStatusChip';
import AppointmentDateTime from './AppointmentDateTime';
import AppointmentFilterMenu, { type AppointmentFilter } from './AppointmentFilterMenu';
import type { AdminAppointment } from '../types/adminAppointment';
import AppointmentDetailsDrawer from './AppointmentDetailsDrawer';

const PAGE_SIZE = 10;

export default function AdminAppointmentList() {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);
  const [filter, setFilter] = useState<AppointmentFilter>('ALL');
  const [filterAnchorEl, setFilterAnchorEl] = useState<HTMLElement | null>(null);
  const [isBookAppointmentOpen, setIsBookAppointmentOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<AdminAppointment | null>(null);

  const { data, isLoading, refetch } = useAdminAppointments({ page, size: pageSize });

  const appointments = data?.content ?? [];

  const filteredAppointments = filter === 'ALL'
    ? appointments
    : appointments.filter((appointment) => appointment.status === filter);

  const handleFilterOpen = (event: React.MouseEvent<HTMLElement>) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleFilterChange = (value: AppointmentFilter) => {
    setFilter(value);
    setPage(0);
    handleFilterClose();
  };

  const columns: AppointmentTableColumn<AdminAppointment>[] = [
    {
      id: 'number',
      label: '#',
      minWidth: 60,
      render: (_appointment, index) => (
        <Typography variant="body2" color="text.secondary">
          {page * pageSize + index + 1}
        </Typography>
      ),
    },
    {
      id: 'patient',
      label: 'Patient',
      minWidth: 220,
      render: (appointment) => (
        <Stack spacing={0.25}>
          <Typography sx={{ fontWeight: 600, color: 'text.primary' }}>
            {appointment.patientFullName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {appointment.patientEmail}
          </Typography>
        </Stack>
      ),
    },
    {
      id: 'doctor',
      label: 'Doctor',
      minWidth: 220,
      render: (appointment) => (
        <Stack spacing={0.25}>
          <Typography sx={{ fontWeight: 600, color: 'text.primary' }}>
            {appointment.doctorFullName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {appointment.doctorEmail}
          </Typography>
        </Stack>
      ),
    },
    {
      id: 'specialization',
      label: 'Specialization',
      minWidth: 170,
      render: (appointment) => (
        <Typography variant="body2" color="text.secondary">
          {appointment.doctorSpecialization}
        </Typography>
      ),
    },
    {
      id: 'location',
      label: 'Location',
      minWidth: 180,
      render: (appointment) => (
        <Stack spacing={0.25}>
          <Typography sx={{ fontWeight: 500, color: 'text.primary' }}>
            {appointment.locationName ?? 'Not assigned'}
          </Typography>
          {appointment.locationCode && (
            <Typography variant="body2" color="text.secondary">
              {appointment.locationCode}
            </Typography>
          )}
        </Stack>
      ),
    },
    {
      id: 'reason',
      label: 'Reason for Visit',
      minWidth: 180,
      render: (appointment) => (
        <Typography variant="body2" color="text.secondary">
          {appointment.reasonForVisit}
        </Typography>
      ),
    },
    {
      id: 'appointmentDate',
      label: 'Date & Time',
      minWidth: 170,
      render: (appointment) => (
        <AppointmentDateTime value={appointment.appointmentDate} />
      ),
    },
    {
      id: 'consultationFee',
      label: 'Consultation Fee',
      minWidth: 130,
      render: (appointment) => (
        <Typography sx={{ fontWeight: 500, color: 'text.primary' }}>
          ₹{appointment.consultationFee.toLocaleString('en-IN')}
        </Typography>
      ),
    },
    {
      id: 'status',
      label: 'Status',
      minWidth: 130,
      render: (appointment) => (
        <AppointmentStatusChip status={appointment.status} />
      ),
    },
    {
      id: 'actions',
      label: 'Actions',
      minWidth: 150,
      render: (appointment) => (
        <Button variant="outlined" size="small" onClick={() => setSelectedAppointment(appointment)}>
          View Details
        </Button>
      ),
    },
  ];

  return (
    <>
      <Box>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          sx={{ mb: 4, alignItems: { xs: 'flex-start', sm: 'center' }, justifyContent: 'space-between' }}
        >
          <Box>
            <Typography variant="h4" sx={{ mb: 0.5 }}>
              All Appointments
            </Typography>
            <Typography variant="body1" color="text.secondary">
              View and manage all patient appointments.
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
            </Button>

            <AppointmentFilterMenu
              anchorEl={filterAnchorEl}
              open={Boolean(filterAnchorEl)}
              value={filter}
              onClose={handleFilterClose}
              onChange={handleFilterChange}
            />

            <Button
              variant="contained"
              startIcon={<CalendarMonthIcon />}
              onClick={() => setIsBookAppointmentOpen(true)}
              sx={{ minHeight: 48, px: 2.5 }}
            >
              Book Appointment
            </Button>
          </Stack>
        </Stack>

        <AppointmentTable
          columns={columns}
          rows={filteredAppointments}
          page={page}
          rowsPerPage={pageSize}
          totalRows={data?.totalElements ?? 0}
          onPageChange={setPage}
          onRowsPerPageChange={(newPageSize) => {
            setPageSize(newPageSize);
            setPage(0);
          }}
          getRowKey={(appointment) => appointment.uuid}
          emptyMessage={isLoading ? 'Loading appointments...' : 'No appointments found.'}
        />
      </Box>

      <BookAppointmentDialog
        open={isBookAppointmentOpen}
        onClose={() => setIsBookAppointmentOpen(false)}
      />
      <AppointmentDetailsDrawer
        open={Boolean(selectedAppointment)}
        appointment={selectedAppointment}
        onClose={() => setSelectedAppointment(null)}
        onUpdated={refetch}
      />
    </>
  );
}