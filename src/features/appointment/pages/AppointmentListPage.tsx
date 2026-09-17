import {
  useMemo,
  useState,
} from 'react';

import {
  Avatar,
  Box,
  Button,
  Stack,
  Typography,
} from '@mui/material';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FilterListIcon from '@mui/icons-material/FilterList';

import AppointmentTable, {
  type AppointmentTableColumn,
} from '../components/AppointmentTable';

import AppointmentStatusChip from '../components/AppointmentStatusChip';

import AppointmentDateTime from '../components/AppointmentDateTime';

import AppointmentFilterMenu, {
  type AppointmentFilter,
} from '../components/AppointmentFilterMenu';

import BookAppointmentDialog from '../components/BookAppointmentDialog';

import { usePatientAppointments } from '../hooks/usePatientAppointments';

import type {
  AppointmentStatus,
  PatientAppointment,
} from '../types/appointment';

const PAGE_SIZE = 10;

function getInitials(
  name: string,
): string {
  return name
    .split(' ')
    .filter(Boolean)
    .map(
      (word: string) =>
        word[0],
    )
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export default function AppointmentListPage() {
  const [page, setPage] =
    useState(0);

  const [pageSize, setPageSize] =
    useState(PAGE_SIZE);

  const [filter, setFilter] =
    useState<AppointmentFilter>(
      'ALL',
    );

  const [
    filterAnchorEl,
    setFilterAnchorEl,
  ] =
    useState<HTMLElement | null>(
      null,
    );

  const [
    isBookAppointmentOpen,
    setIsBookAppointmentOpen,
  ] =
    useState(false);

  const {
    data,
    isLoading,
    isError,
  } =
    usePatientAppointments(
      page,
      pageSize,
    );

  /*
   * Keep a stable empty array reference
   * when appointment data is unavailable.
   */
  const appointments = useMemo(
    () => data?.data?.content ?? [],
    [data?.data?.content],
  );

  /*
   * The appointment API is
   * server paginated.
   *
   * Filtering here applies to
   * the currently loaded page.
   */
  const filteredAppointments =
    useMemo(() => {
      if (filter === 'ALL') {
        return appointments;
      }

      return appointments.filter(
        (
          appointment: PatientAppointment,
        ) =>
          appointment.status ===
          filter,
      );
    }, [
      appointments,
      filter,
    ]);

  /*
   * Filter counts for the
   * currently loaded page.
   */
  const filterCounts =
    useMemo(() => {
      const counts: Partial<
        Record<
          AppointmentFilter,
          number
        >
      > = {
        ALL: appointments.length,
      };

      appointments.forEach(
        (
          appointment: PatientAppointment,
        ) => {
          const status: AppointmentStatus =
            appointment.status;

          counts[status] =
            (counts[status] ?? 0) +
            1;
        },
      );

      return counts;
    }, [appointments]);

  const handleFilterOpen = (
    event: React.MouseEvent<HTMLElement>,
  ) => {
    setFilterAnchorEl(
      event.currentTarget,
    );
  };

  const handleFilterClose =
    () => {
      setFilterAnchorEl(null);
    };

  const handleFilterChange = (
    value: AppointmentFilter,
  ) => {
    setFilter(value);
    setPage(0);
  };

  const handlePageChange = (
    nextPage: number,
  ) => {
    setPage(nextPage);
  };

  const handlePageSizeChange = (
    nextPageSize: number,
  ) => {
    setPageSize(
      nextPageSize,
    );
    setPage(0);
  };

  const columns: AppointmentTableColumn<PatientAppointment>[] =
    useMemo(
      () => [
        {
          id: 'number',
          label: '#',
          minWidth: 60,
          render: (
            _appointment: PatientAppointment,
            index: number,
          ) => (
            <Typography
              variant="body2"
              color="text.secondary"
            >
              {page *
                pageSize +
                index +
                1}
            </Typography>
          ),
        },

        {
          id: 'doctor',
          label: 'Doctor',
          minWidth: 220,
          render: (
            appointment: PatientAppointment,
          ) => (
            <Stack
              direction="row"
              spacing={1.5}
              sx={{
                alignItems:
                  'center',
              }}
            >
              <Avatar
                sx={{
                  width: 42,
                  height: 42,
                  bgcolor:
                    'primary.light',
                  color:
                    'primary.main',
                  fontSize:
                    '0.85rem',
                  fontWeight: 600,
                }}
              >
                {getInitials(
                  appointment.doctorFullName,
                )}
              </Avatar>

              <Stack spacing={0.25}>
                <Typography
                  sx={{
                    fontWeight: 600,
                    color:
                      'text.primary',
                  }}
                >
                  {
                    appointment.doctorFullName
                  }
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  {
                    appointment.doctorEmail
                  }
                </Typography>
              </Stack>
            </Stack>
          ),
        },

        {
          id: 'specialization',
          label: 'Specialization',
          minWidth: 180,
          render: (
            appointment: PatientAppointment,
          ) => (
            <Typography
              variant="body2"
              color="text.secondary"
            >
              {
                appointment.doctorSpecialization
              }
            </Typography>
          ),
        },

        {
          id: 'reasonForVisit',
          label: 'Reason for Visit',
          minWidth: 200,
          render: (
            appointment: PatientAppointment,
          ) => (
            <Typography
              variant="body2"
              color="text.secondary"
            >
              {
                appointment.reasonForVisit
              }
            </Typography>
          ),
        },

        {
          id: 'appointmentDate',
          label: 'Date & Time',
          minWidth: 180,
          render: (
            appointment: PatientAppointment,
          ) => (
            <AppointmentDateTime
              value={
                appointment.appointmentDate
              }
            />
          ),
        },

        {
          id: 'consultationFee',
          label: 'Consultation Fee',
          minWidth: 140,
          render: (
            appointment: PatientAppointment,
          ) => (
            <Typography
              sx={{
                fontWeight: 500,
                color:
                  'text.primary',
              }}
            >
              ₹
              {appointment.consultationFee.toLocaleString(
                'en-IN',
              )}
            </Typography>
          ),
        },

        {
          id: 'status',
          label: 'Status',
          minWidth: 130,
          render: (
            appointment: PatientAppointment,
          ) => (
            <AppointmentStatusChip
              status={
                appointment.status
              }
            />
          ),
        },

        {
          id: 'actions',
          label: 'Actions',
          minWidth: 130,
          render: () => (
            <Button
              variant="outlined"
            >
              View
            </Button>
          ),
        },
      ],
      [
        page,
        pageSize,
      ],
    );

  return (
    <>
      <Box>
        {/* PAGE HEADER */}

        <Stack
          direction={{
            xs: 'column',
            sm: 'row',
          }}
          spacing={2}
          sx={{
            mb: 4,
            alignItems: {
              xs: 'flex-start',
              sm: 'center',
            },
            justifyContent:
              'space-between',
          }}
        >
          <Box>
            <Typography
              variant="h4"
              sx={{
                mb: 0.5,
              }}
            >
              My Appointments
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
            >
              View your upcoming
              and past appointments.
            </Typography>
          </Box>

          <Stack
            direction="row"
            spacing={1.5}
          >
            {/* FILTER */}

            <Button
              variant="outlined"
              startIcon={
                <FilterListIcon />
              }
              onClick={
                handleFilterOpen
              }
              sx={{
                minHeight: 48,
                px: 2.5,
              }}
            >
              Filter
            </Button>

            {/* BOOK APPOINTMENT */}

            <Button
              variant="contained"
              startIcon={
                <CalendarMonthIcon />
              }
              onClick={() =>
                setIsBookAppointmentOpen(
                  true,
                )
              }
              sx={{
                minHeight: 48,
                px: 2.5,
              }}
            >
              Book Appointment
            </Button>
          </Stack>
        </Stack>

        {/* FILTER MENU */}

        <AppointmentFilterMenu
          anchorEl={
            filterAnchorEl
          }
          open={Boolean(
            filterAnchorEl,
          )}
          value={filter}
          counts={filterCounts}
          onClose={
            handleFilterClose
          }
          onChange={
            handleFilterChange
          }
        />

        {/* LOADING */}

        {isLoading ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent:
                'center',
              py: 8,
            }}
          >
            <Typography
              color="text.secondary"
            >
              Loading appointments...
            </Typography>
          </Box>
        ) : isError ? (
          /* ERROR */

          <Box
            sx={{
              display: 'flex',
              justifyContent:
                'center',
              py: 8,
            }}
          >
            <Typography
              color="error"
            >
              Failed to load
              appointments.
            </Typography>
          </Box>
        ) : (
          /* APPOINTMENT TABLE */

          <AppointmentTable
            columns={columns}
            rows={
              filteredAppointments
            }
            page={page}
            rowsPerPage={
              pageSize
            }
            totalRows={
              data?.data
                ?.totalElements ??
              0
            }
            onPageChange={
              handlePageChange
            }
            onRowsPerPageChange={
              handlePageSizeChange
            }
            getRowKey={(
              appointment: PatientAppointment,
              index: number,
            ) =>
              `${appointment.doctorEmail}-${appointment.appointmentDate}-${index}`
            }
            emptyMessage="No appointments found."
          />
        )}
      </Box>

      {/* BOOK APPOINTMENT DIALOG */}

      <BookAppointmentDialog
        open={
          isBookAppointmentOpen
        }
        onClose={() =>
          setIsBookAppointmentOpen(
            false,
          )
        }
      />
    </>
  );
}