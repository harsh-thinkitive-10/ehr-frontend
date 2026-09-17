import {
  useEffect,
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
import PeopleIcon from '@mui/icons-material/People';

import SearchInput from '../../../../component/search-input/SearchInput';

import PatientFilter from './PatientFilter';

import { usePatients } from '../../hooks/usePatients';

import type {
  Patient,
  PatientGender,
} from '../../types/patient';

interface PatientListProps {
  onEdit?: (
    patient: Patient,
  ) => void;

  onDelete?: (
    patient: Patient,
  ) => void;

  filterOpen?: boolean;
}

type SortDirection =
  | 'asc'
  | 'desc';

function getInitials(
  fullName: string,
): string {
  return fullName
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map(
      (name) =>
        name
          .charAt(0)
          .toUpperCase(),
    )
    .join('');
}

function PatientRow({
  patient,
  onEdit,
  onDelete,
}: {
  patient: Patient;

  onEdit?: (
    patient: Patient,
  ) => void;

  onDelete?: (
    patient: Patient,
  ) => void;
}) {
  return (
    <TableRow hover>
      {/* Patient */}

      <TableCell>
        <Stack
          direction="row"
          spacing={1.5}
          sx={{
            alignItems: 'center',
          }}
        >
          <Avatar
            sx={{
              width: 36,
              height: 36,
              bgcolor: 'primary.light',
              color: 'primary.dark',
              fontSize: '0.85rem',
              fontWeight: 600,
            }}
          >
            {getInitials(
              patient.fullName,
            )}
          </Avatar>

          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
              color: 'text.primary',
            }}
          >
            {patient.fullName}
          </Typography>
        </Stack>
      </TableCell>

      {/* Age */}

      <TableCell>
        {patient.age}
      </TableCell>

      {/* Gender */}

      <TableCell>
        {patient.gender}
      </TableCell>

      {/* Phone */}

      <TableCell>
        {patient.phoneNumber}
      </TableCell>

      {/* Email */}

      <TableCell>
        {patient.email}
      </TableCell>

      {/* Actions */}

      <TableCell>
        <Stack
          direction="row"
          spacing={0.5}
        >
          <Tooltip title="Edit patient">
            <IconButton
              size="small"
              aria-label={`Edit ${patient.fullName}`}
              onClick={() =>
                onEdit?.(patient)
              }
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete patient">
            <IconButton
              size="small"
              color="error"
              aria-label={`Delete ${patient.fullName}`}
              onClick={() =>
                onDelete?.(patient)
              }
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      </TableCell>
    </TableRow>
  );
}

export default function PatientList({
  onEdit,
  onDelete,
  filterOpen = false,
}: PatientListProps) {
  /*
   * ============================
   * Pagination
   * ============================
   */

  const [page, setPage] =
    useState(0);

  const [pageSize, setPageSize] =
    useState(10);

  /*
   * ============================
   * Search
   * ============================
   */

  const [searchInput, setSearchInput] =
    useState('');

  const [search, setSearch] =
    useState('');

  /*
   * ============================
   * Pending Filter Values
   * ============================
   *
   * These values belong to the
   * filter form.
   *
   * They are NOT sent to the API
   * until Apply Filter is clicked.
   */

  const [filterGender, setFilterGender] =
    useState<
      PatientGender | undefined
    >();

  const [filterAge, setFilterAge] =
    useState<number | undefined>();

  const [filterSortBy, setFilterSortBy] =
    useState('fullName');

  const [
    filterSortDirection,
    setFilterSortDirection,
  ] =
    useState<SortDirection>('asc');

  /*
   * ============================
   * Applied Filter Values
   * ============================
   *
   * IMPORTANT:
   *
   * These start as undefined.
   *
   * Therefore the first API request
   * contains only:
   *
   * page
   * size
   */

  const [gender, setGender] =
    useState<
      PatientGender | undefined
    >();

  const [age, setAge] =
    useState<number | undefined>();

  const [sort, setSort] =
    useState<
      string | undefined
    >();

  /*
   * ============================
   * Search Debounce
   * ============================
   */

  useEffect(() => {
    const timer =
      window.setTimeout(() => {
        const trimmedSearch =
          searchInput.trim();

        setSearch(
          trimmedSearch,
        );

        setPage(0);
      }, 400);

    return () => {
      window.clearTimeout(timer);
    };
  }, [searchInput]);

  /*
   * ============================
   * API
   * ============================
   */

  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = usePatients({
    page,
    size: pageSize,

    search:
      search || undefined,

    gender,

    age,

    sort,
  });

  /*
   * ============================
   * API Data
   * ============================
   */

  const patients =
    data?.data?.content ?? [];

  const totalPatients =
    data?.data?.totalElements ?? 0;

  /*
   * ============================
   * Apply Filter
   * ============================
   */

  const handleApplyFilter = () => {
    /*
     * Apply Gender.
     */

    setGender(
      filterGender,
    );

    /*
     * Apply Age.
     */

    setAge(
      filterAge,
    );

    /*
     * Apply Sort.
     *
     * Example:
     *
     * age + desc
     *
     * becomes:
     *
     * "age,desc"
     */

    setSort(
      `${filterSortBy},${filterSortDirection}`,
    );

    /*
     * Always go back to
     * first page.
     */

    setPage(0);
  };

  /*
   * ============================
   * Clear Filter
   * ============================
   */

  const handleClearFilters = () => {
    /*
     * Clear filter form.
     */

    setFilterGender(undefined);

    setFilterAge(undefined);

    setFilterSortBy(
      'fullName',
    );

    setFilterSortDirection(
      'asc',
    );

    /*
     * Clear applied filters.
     */

    setGender(undefined);

    setAge(undefined);

    setSort(undefined);

    /*
     * First page.
     */

    setPage(0);
  };

  /*
   * ============================
   * Search
   * ============================
   */

  const handleSearchChange = (
    value: string,
  ) => {
    setSearchInput(value);
  };

  /*
   * ============================
   * Pagination
   * ============================
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
   * ============================
   * Initial Loading
   * ============================
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
   * ============================
   * Error
   * ============================
   */

  if (isError) {
    return (
      <Alert
        severity="error"
        action={
          <Box
            component="button"
            type="button"
            onClick={() =>
              refetch()
            }
            sx={{
              border: 0,
              background:
                'transparent',
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
          : 'Failed to load patients.'}
      </Alert>
    );
  }

  return (
    <Stack spacing={2}>
      {/* ============================
          Search
          ============================ */}

      <Paper
        sx={{
          p: 2,
        }}
      >
        <Box
          sx={{
            width: {
              xs: '100%',
              sm: 360,
            },
          }}
        >
          <SearchInput
            value={searchInput}
            onChange={
              handleSearchChange
            }
            placeholder="Search patients..."
          />
        </Box>
      </Paper>

      {/* ============================
          Filter
          ============================ */}

      {filterOpen && (
        <PatientFilter
          gender={
            filterGender
          }
          age={
            filterAge
          }
          sortBy={
            filterSortBy
          }
          sortDirection={
            filterSortDirection
          }
          onGenderChange={
            setFilterGender
          }
          onAgeChange={
            setFilterAge
          }
          onSortByChange={
            setFilterSortBy
          }
          onSortDirectionChange={
            setFilterSortDirection
          }
          onClear={
            handleClearFilters
          }
          onApply={
            handleApplyFilter
          }
        />
      )}

      {/* ============================
          Fetching
          ============================ */}

      {isFetching && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            px: 1,
          }}
        >
          <CircularProgress
            size={16}
          />

          <Typography
            variant="body2"
            color="text.secondary"
          >
            Updating patients...
          </Typography>
        </Box>
      )}

      {/* ============================
          Empty State
          ============================ */}

      {patients.length === 0 ? (
        <Paper
          sx={{
            py: 8,
            px: 3,
            textAlign: 'center',
          }}
        >
          <PeopleIcon
            sx={{
              fontSize: 48,
              color: 'text.disabled',
              mb: 1,
            }}
          />

          <Typography
            variant="h6"
            sx={{
              mb: 0.5,
            }}
          >
            No patients found
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            Try changing your search
            or filters.
          </Typography>
        </Paper>
      ) : (
        <TableContainer
          component={Paper}
          sx={{
            overflowX: 'auto',
          }}
        >
          <Table
            sx={{
              minWidth: 1000,
            }}
            aria-label="Patient management table"
          >
            <TableHead>
              <TableRow>
                <TableCell>
                  Patient
                </TableCell>

                <TableCell>
                  Age
                </TableCell>

                <TableCell>
                  Gender
                </TableCell>

                <TableCell>
                  Phone Number
                </TableCell>

                <TableCell>
                  Email
                </TableCell>

                <TableCell>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {patients.map(
                (
                  patient: Patient,
                ) => (
                  <PatientRow
                    key={
                      patient.uuid
                    }
                    patient={
                      patient
                    }
                    onEdit={
                      onEdit
                    }
                    onDelete={
                      onDelete
                    }
                  />
                ),
              )}
            </TableBody>
          </Table>

          {/* ============================
              Pagination
              ============================ */}

          <TablePagination
            component="div"
            count={
              totalPatients
            }
            page={page}
            rowsPerPage={
              pageSize
            }
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
              100,
            ]}
            labelRowsPerPage="Show"
          />
        </TableContainer>
      )}
    </Stack>
  );
}