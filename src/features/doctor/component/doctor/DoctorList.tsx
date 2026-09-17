import {
  useState,
  type ChangeEvent,
} from 'react';

import {
  Alert,
  Avatar,
  Box,
  CircularProgress,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import SearchInput from '../../../../component/search-input/SearchInput';

import { useDoctors } from '../../hooks/useDoctors';

import type {
  Doctor,
} from '../../types/doctor';

interface DoctorListProps {
  onEdit?: (
    doctor: Doctor,
  ) => void;

  onDelete?: (
    doctor: Doctor,
  ) => void;
}

function getInitials(
  fullName: string,
): string {
  return fullName
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map(
      (name) =>
        name.charAt(0).toUpperCase(),
    )
    .join('');
}

export default function DoctorList({
  onEdit,
  onDelete,
}: DoctorListProps) {
  /*
   * ---------------------------------------------------------
   * Pagination
   * ---------------------------------------------------------
   */

  const [page, setPage] =
    useState(0);

  const [pageSize, setPageSize] =
    useState(10);

  /*
   * ---------------------------------------------------------
   * Search
   * ---------------------------------------------------------
   */

  const [searchInput, setSearchInput] =
    useState('');

  const [search, setSearch] =
    useState('');

  /*
   * ---------------------------------------------------------
   * API
   * ---------------------------------------------------------
   */

  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useDoctors({
    page,
    size: pageSize,
    search:
      search.trim() || undefined,
  });

  /*
   * ---------------------------------------------------------
   * API Data
   * ---------------------------------------------------------
   */

  const doctors =
    data?.data?.content ?? [];

  const totalDoctors =
    data?.data?.totalElements ?? 0;

  /*
   * ---------------------------------------------------------
   * Search
   * ---------------------------------------------------------
   */

  const handleSearchChange = (
    value: string,
  ) => {
    setSearchInput(value);
  };

  const handleSearchSubmit = () => {
    setSearch(
      searchInput.trim(),
    );

    setPage(0);
  };

  /*
   * ---------------------------------------------------------
   * Pagination
   * ---------------------------------------------------------
   */

  const handlePageChange = (
    _event: unknown,
    nextPage: number,
  ) => {
    setPage(nextPage);
  };

  const handlePageSizeChange = (
    event: ChangeEvent<
      HTMLTextAreaElement |
      HTMLInputElement
    >,
  ) => {
    const nextPageSize =
      Number(
        event.target.value,
      );

    setPageSize(
      nextPageSize,
    );

    setPage(0);
  };

  /*
   * ---------------------------------------------------------
   * Loading
   * ---------------------------------------------------------
   */

  if (isLoading) {
    return (
      <Box
        sx={{
          py: 8,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  /*
   * ---------------------------------------------------------
   * Error
   * ---------------------------------------------------------
   */

  if (isError) {
    return (
      <Alert
        severity="error"
        action={
          <Box
            component="button"
            type="button"
            onClick={() => refetch()}
            sx={{
              border: 0,
              background: 'transparent',
              color: 'inherit',
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            Retry
          </Box>
        }
      >
        {error instanceof Error
          ? error.message
          : 'Failed to load doctors.'}
      </Alert>
    );
  }

  return (
    <Stack spacing={2}>
      {/* =====================================================
          SEARCH
          ===================================================== */}

      <Paper
        sx={{
          p: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            width: {
              xs: '100%',
              sm: 520,
            },
          }}
        >
          <Box sx={{ flex: 1 }}>
            <SearchInput
              value={searchInput}
              onChange={
                handleSearchChange
              }
              placeholder="Search doctors..."
            />
          </Box>

          <Box
            component="button"
            type="button"
            onClick={
              handleSearchSubmit
            }
            sx={{
              minHeight: 40,
              px: 2.5,
              border: 0,
              borderRadius: 1.25,
              backgroundColor:
                'primary.main',
              color: '#ffffff',
              fontWeight: 600,
              cursor: 'pointer',
              whiteSpace: 'nowrap',

              '&:hover': {
                backgroundColor:
                  'primary.dark',
              },
            }}
          >
            Search
          </Box>
        </Box>
      </Paper>

      {/* =====================================================
          FETCHING
          ===================================================== */}

      {isFetching && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            px: 1,
          }}
        >
          <CircularProgress size={16} />

          <Typography
            variant="body2"
            color="text.secondary"
          >
            Updating doctors...
          </Typography>
        </Box>
      )}

      {/* =====================================================
          EMPTY STATE
          ===================================================== */}

      {doctors.length === 0 ? (
        <Paper
          sx={{
            py: 8,
            px: 3,
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h6"
            sx={{ mb: 0.5 }}
          >
            No doctors found
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            Try changing your search.
          </Typography>
        </Paper>
      ) : (
        /* ===================================================
           TABLE
           =================================================== */

        <TableContainer
          component={Paper}
          sx={{
            overflowX: 'auto',
          }}
        >
          <Table
            sx={{
              minWidth: 950,
            }}
            aria-label="Doctor management table"
          >
            <TableHead>
              <TableRow>
                <TableCell>
                  Doctor
                </TableCell>

                <TableCell>
                  Specialization
                </TableCell>

                <TableCell>
                  Email
                </TableCell>

                <TableCell>
                  Phone Number
                </TableCell>

                <TableCell>
                  Consultation Fee
                </TableCell>

                <TableCell align="right">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {doctors.map(
                (doctor) => (
                  <TableRow
                    key={doctor.uuid}
                    hover
                  >
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
                            width: 36,
                            height: 36,
                            bgcolor:
                              'primary.light',
                            color:
                              'primary.dark',
                            fontSize:
                              '0.85rem',
                            fontWeight: 600,
                          }}
                        >
                          {getInitials(
                            doctor.fullName,
                          )}
                        </Avatar>

                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 600,
                            color:
                              'text.primary',
                          }}
                        >
                          {
                            doctor.fullName
                          }
                        </Typography>
                      </Stack>
                    </TableCell>

                    {/* Specialization */}

                    <TableCell>
                      {
                        doctor.specialization
                      }
                    </TableCell>

                    {/* Email */}

                    <TableCell>
                      {doctor.email}
                    </TableCell>

                    {/* Phone */}

                    <TableCell>
                      {
                        doctor.phoneNumber
                      }
                    </TableCell>

                    {/* Fee */}

                    <TableCell>
                      ₹
                      {doctor.consultationFee.toFixed(
                        2,
                      )}
                    </TableCell>

                    {/* Actions */}

                    <TableCell align="right">
                      <Stack
                        direction="row"
                        spacing={0.5}
                        sx={{
                          justifyContent:
                            'flex-end',
                        }}
                      >
                        <Tooltip title="Edit doctor">
                          <IconButton
                            size="small"
                            aria-label={`Edit ${doctor.fullName}`}
                            onClick={() =>
                              onEdit?.(
                                doctor,
                              )
                            }
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Delete doctor">
                          <IconButton
                            size="small"
                            color="error"
                            aria-label={`Delete ${doctor.fullName}`}
                            onClick={() =>
                              onDelete?.(
                                doctor,
                              )
                            }
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ),
              )}
            </TableBody>
          </Table>

          {/* Pagination */}

          <TablePagination
            component="div"
            count={totalDoctors}
            page={page}
            rowsPerPage={pageSize}
            onPageChange={
              handlePageChange
            }
            onRowsPerPageChange={
              handlePageSizeChange
            }
            rowsPerPageOptions={[
              10,
              20,
              50,
            ]}
            labelRowsPerPage="Show"
          />
        </TableContainer>
      )}
    </Stack>
  );
}