import {
  useMemo,
  useState,
} from 'react';

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
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FilterListIcon from '@mui/icons-material/FilterList';

import {
  usePatientAppointments,
} from '../hooks/usePatientAppointments';

import type {
  AppointmentStatus,
  PatientAppointment,
} from '../services/appointmentService';

type AppointmentFilter =
  | 'ALL'
  | AppointmentStatus;

const PAGE_SIZE = 10;

const appointmentFilters: {
  value: AppointmentFilter;
  label: string;
}[] = [
    {
      value: 'ALL',
      label: 'All',
    },
    {
      value: 'SCHEDULED',
      label: 'Scheduled',
    },
    {
      value: 'PENDING',
      label: 'Pending',
    },
    {
      value: 'CHECK_IN',
      label: 'Check In',
    },
    {
      value: 'COMPLETED',
      label: 'Completed',
    },
    {
      value: 'CANCELLED',
      label: 'Cancelled',
    },
    {
      value: 'NO_SHOW',
      label: 'No Show',
    },
    {
      value: 'RESCHEDULED',
      label: 'Rescheduled',
    },
    {
      value: 'CLOSED',
      label: 'Closed',
    },
  ];

function getDoctorInitials(name: string) {
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
    date: value.toLocaleDateString(
      'en-IN',
      {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      },
    ),

    time: value.toLocaleTimeString(
      'en-IN',
      {
        hour: 'numeric',
        minute: '2-digit',
      },
    ),
  };
}

function getStatusLabel(
  status: AppointmentStatus,
) {
  return status.replaceAll('_', ' ');
}

function getStatusColor(
  status: AppointmentStatus,
):
  | 'primary'
  | 'success'
  | 'warning'
  | 'error'
  | 'default' {
  switch (status) {
    case 'SCHEDULED':
      return 'primary';

    case 'PENDING':
      return 'warning';

    case 'CHECK_IN':
      return 'warning';

    case 'COMPLETED':
      return 'success';

    case 'CANCELLED':
      return 'error';

    case 'NO_SHOW':
      return 'error';

    case 'RESCHEDULED':
      return 'warning';

    case 'CLOSED':
      return 'default';

    default:
      return 'default';
  }
}

function getFilterCount(
  appointments: PatientAppointment[],
  filter: AppointmentFilter,
) {
  if (filter === 'ALL') {
    return appointments.length;
  }

  return appointments.filter(
    (appointment) =>
      appointment.status === filter,
  ).length;
}

export default function AppointmentListPage() {
  const [page, setPage] = useState(0);

  const [pageSize, setPageSize] =
    useState(PAGE_SIZE);

  const [filter, setFilter] =
    useState<AppointmentFilter>('ALL');

  const [filterAnchorEl, setFilterAnchorEl] =
    useState<null | HTMLElement>(null);

  const {
    data,
    isLoading,
    isError,
    error,
  } = usePatientAppointments(
    page,
    pageSize,
  );

  const appointments = useMemo(
    () => data?.data.content ?? [],
    [data?.data.content],
  );

  const filteredAppointments = useMemo(() => {
    if (filter === 'ALL') {
      return appointments;
    }

    return appointments.filter(
      (appointment) =>
        appointment.status === filter,
    );
  }, [appointments, filter]);

  const selectedFilterLabel =
    appointmentFilters.find(
      (item) =>
        item.value === filter,
    )?.label ?? 'All';

  const handleFilterOpen = (
    event: React.MouseEvent<HTMLElement>,
  ) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleFilterChange = (
    newFilter: AppointmentFilter,
  ) => {
    setFilter(newFilter);
    setPage(0);
    handleFilterClose();
  };

  const handlePageChange = (
    _event: unknown,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (
    event: React.ChangeEvent<
      HTMLTextAreaElement | HTMLInputElement
    >,
  ) => {
    setPageSize(
      Number(event.target.value),
    );
    setPage(0);
  };

  if (isError) {
    return (
      <Box>
        <Typography
          color="error"
          sx={{
            fontWeight: 500,
          }}
        >
          {error instanceof Error
            ? error.message
            : 'Unable to load your appointments.'}
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      {/* =========================
          PAGE HEADER
      ========================== */}

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
              fontWeight: 700,
              color: '#172b4d',
              mb: 0.5,
            }}
          >
            My Appointments
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: '#64748b',
            }}
          >
            View your upcoming and past
            appointments.
          </Typography>
        </Box>

        {/* Header Actions */}

        <Stack
          direction="row"
          spacing={1.5}
        >
          {/* Filter Button */}

          <Button
            variant="outlined"
            startIcon={
              <FilterListIcon />
            }
            onClick={handleFilterOpen}
            sx={{
              minHeight: 48,
              px: 2.5,
              borderRadius: '10px',
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            Filter

            {filter !== 'ALL' && (
              <Chip
                label={selectedFilterLabel}
                size="small"
                sx={{
                  ml: 1,
                  height: 24,
                  fontWeight: 600,
                }}
              />
            )}
          </Button>

          {/* Filter Menu */}

          <Menu
            anchorEl={filterAnchorEl}
            open={
              Boolean(filterAnchorEl)
            }
            onClose={
              handleFilterClose
            }
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
            {appointmentFilters.map(
              (item) => {
                const count =
                  getFilterCount(
                    appointments,
                    item.value,
                  );

                const isSelected =
                  filter === item.value;

                return (
                  <MenuItem
                    key={item.value}
                    selected={
                      isSelected
                    }
                    onClick={() =>
                      handleFilterChange(
                        item.value,
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
                            isSelected
                              ? 600
                              : 400,
                        }}
                      >
                        {item.label}
                      </Typography>

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
                    </Stack>
                  </MenuItem>
                );
              },
            )}
          </Menu>

          {/* Book Appointment */}

          <Button
            variant="contained"
            startIcon={
              <CalendarMonthIcon />
            }
            sx={{
              minHeight: 48,
              px: 2.5,
              borderRadius: '10px',
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            Book Appointment
          </Button>
        </Stack>
      </Stack>

      {/* =========================
          APPOINTMENT TABLE
      ========================== */}

      <TableContainer
        component={Paper}
        sx={{
          borderRadius: '12px',
          border:
            '1px solid #e5e7eb',
          boxShadow: 'none',
          overflowX: 'auto',
        }}
      >
        <Table
          sx={{
            minWidth: 1100,
          }}
        >
          {/* TABLE HEADER */}

          <TableHead>
            <TableRow
              sx={{
                backgroundColor:
                  '#f8fafc',
              }}
            >
              <TableCell
                sx={{
                  fontWeight: 600,
                  color: '#64748b',
                  width: 60,
                }}
              >
                #
              </TableCell>

              <TableCell
                sx={{
                  fontWeight: 600,
                  color: '#64748b',
                  minWidth: 220,
                }}
              >
                Doctor
              </TableCell>

              <TableCell
                sx={{
                  fontWeight: 600,
                  color: '#64748b',
                  minWidth: 180,
                }}
              >
                Specialization
              </TableCell>

              <TableCell
                sx={{
                  fontWeight: 600,
                  color: '#64748b',
                  minWidth: 180,
                }}
              >
                Reason for Visit
              </TableCell>

              <TableCell
                sx={{
                  fontWeight: 600,
                  color: '#64748b',
                  minWidth: 170,
                }}
              >
                Date & Time
              </TableCell>

              <TableCell
                sx={{
                  fontWeight: 600,
                  color: '#64748b',
                  minWidth: 130,
                }}
              >
                Consultation
                <br />
                Fee
              </TableCell>

              <TableCell
                sx={{
                  fontWeight: 600,
                  color: '#64748b',
                  minWidth: 130,
                }}
              >
                Status
              </TableCell>

              <TableCell
                sx={{
                  fontWeight: 600,
                  color: '#64748b',
                  minWidth: 150,
                }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          {/* TABLE BODY */}

          <TableBody>
            {/* Loading */}

            {isLoading &&
              Array.from({
                length: 3,
              }).map((_, index) => (
                <TableRow
                  key={`loading-${index}`}
                >
                  <TableCell
                    colSpan={8}
                    sx={{
                      py: 4,
                      color:
                        'text.secondary',
                    }}
                  >
                    Loading appointments...
                  </TableCell>
                </TableRow>
              ))}

            {/* Empty */}

            {!isLoading &&
              filteredAppointments.length ===
              0 && (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    align="center"
                    sx={{
                      py: 8,
                    }}
                  >
                    <Stack
                      spacing={1}
                      sx={{
                        alignItems: 'center',
                      }}
                    >
                      <EventIcon
                        sx={{
                          fontSize: 40,
                          color:
                            'text.secondary',
                        }}
                      />

                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                        }}
                      >
                        No appointments found
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                      >
                        No appointments are
                        available for this
                        filter.
                      </Typography>
                    </Stack>
                  </TableCell>
                </TableRow>
              )}

            {/* APPOINTMENTS */}

            {!isLoading &&
              filteredAppointments.map(
                (
                  appointment,
                  index,
                ) => {
                  const date =
                    formatAppointmentDate(
                      appointment.appointmentDate,
                    );

                  return (
                    <TableRow
                      key={`${appointment.appointmentDate}-${index}`}
                      hover
                    >
                      {/* Number */}

                      <TableCell>
                        <Typography
                          variant="body2"
                          sx={{
                            color:
                              'text.secondary',
                          }}
                        >
                          {page *
                            pageSize +
                            index +
                            1}
                        </Typography>
                      </TableCell>

                      {/* Doctor */}

                      <TableCell>
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
                                '#eaf3ff',
                              color:
                                'primary.main',
                              fontSize:
                                '0.85rem',
                              fontWeight: 600,
                            }}
                          >
                            {getDoctorInitials(
                              appointment.doctorFullName,
                            )}
                          </Avatar>

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
                        </Stack>
                      </TableCell>

                      {/* Specialization */}

                      <TableCell>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                        >
                          {
                            appointment.doctorSpecialization
                          }
                        </Typography>
                      </TableCell>

                      {/* Reason */}

                      <TableCell>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                        >
                          {
                            appointment.reasonForVisit
                          }
                        </Typography>
                      </TableCell>

                      {/* Date */}

                      <TableCell>
                        <Stack
                          direction="row"
                          spacing={1}
                          sx={{
                            alignItems:
                              'center',
                          }}
                        >
                          <EventIcon
                            sx={{
                              fontSize: 20,
                              color:
                                'text.secondary',
                            }}
                          />

                          <Box>
                            <Typography
                              variant="body2"
                              sx={{
                                fontWeight: 500,
                                color:
                                  'text.primary',
                              }}
                            >
                              {date.date}
                            </Typography>

                            <Typography
                              variant="body2"
                              sx={{
                                color:
                                  'text.secondary',
                              }}
                            >
                              {date.time}
                            </Typography>
                          </Box>
                        </Stack>
                      </TableCell>

                      {/* Fee */}

                      <TableCell>
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
                      </TableCell>

                      {/* Status */}

                      <TableCell>
                        <Chip
                          label={getStatusLabel(
                            appointment.status,
                          )}
                          color={getStatusColor(
                            appointment.status,
                          )}
                          size="small"
                          sx={{
                            fontWeight: 600,
                          }}
                        />
                      </TableCell>

                      {/* Actions */}

                      <TableCell>
                        <Button
                          variant="outlined"
                          endIcon={
                            <ChevronRightIcon />
                          }
                          sx={{
                            minHeight: 40,
                            px: 1.5,
                            borderRadius:
                              '8px',
                            textTransform:
                              'none',
                            fontWeight: 600,
                            whiteSpace:
                              'nowrap',
                          }}
                        >
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                },
              )}
          </TableBody>
        </Table>

        <Divider />

        {/* =========================
            PAGINATION
        ========================== */}

        {!isLoading &&
          data?.data && (
            <TablePagination
              component="div"
              count={
                data.data.totalElements
              }
              page={data.data.number}
              onPageChange={
                handlePageChange
              }
              rowsPerPage={
                pageSize
              }
              onRowsPerPageChange={
                handlePageSizeChange
              }
              rowsPerPageOptions={[
                10,
                20,
                50,
                100,
              ]}
              labelRowsPerPage="Show"
              labelDisplayedRows={({
                from,
                to,
                count,
              }) =>
                `${from}–${to} of ${count}`
              }
            />
          )}
      </TableContainer>
    </Box>
  );
}