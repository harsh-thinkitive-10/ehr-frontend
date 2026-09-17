import {
  useState,
  type ChangeEvent,
} from 'react';

import {
  Alert,
  Avatar,
  Box,
  CircularProgress,
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

import PeopleIcon from '@mui/icons-material/People';

import { usePatients } from '../../hooks/usePatients';

import type {
  Patient,
} from '../../types/patient';

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

function PatientRow({
  patient,
}: {
  patient: Patient;
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
    </TableRow>
  );
}

export default function PatientList() {
  const [page, setPage] =
    useState(0);

  const [pageSize, setPageSize] =
    useState(10);

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = usePatients({
    page,
    size: pageSize,
  });

  /*
   * Backend response:
   *
   * {
   *   code: "OK",
   *   data: {
   *     content: Patient[],
   *     empty: false,
   *     first: true,
   *     last: true,
   *     number: 0,
   *     numberOfElements: 6,
   *     size: 20,
   *     totalElements: 6,
   *     totalPages: 1
   *   },
   *   message: "Patient list fetched successfully"
   * }
   */

  const patients =
    data?.data?.content ?? [];

  const totalPatients =
    data?.data?.totalElements ?? 0;

  const handlePageChange = (
    _event: unknown,
    nextPage: number,
  ) => {
    setPage(nextPage);
  };

  const handlePageSizeChange = (
    event: ChangeEvent<
      HTMLTextAreaElement | HTMLInputElement
    >,
  ) => {
    setPageSize(
      Number(event.target.value),
    );

    setPage(0);
  };

  /*
   * Loading
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
   * Error
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
          : 'Failed to load patients.'}
      </Alert>
    );
  }

  /*
   * Empty state
   */

  if (patients.length === 0) {
    return (
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
          Registered patients will
          appear here.
        </Typography>
      </Paper>
    );
  }

  /*
   * Patient table
   */

  return (
    <TableContainer
      component={Paper}
      sx={{
        overflowX: 'auto',
      }}
    >
      <Table
        sx={{
          minWidth: 850,
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
          </TableRow>
        </TableHead>

        <TableBody>
          {patients.map(
            (
              patient: Patient,
              index: number,
            ) => (
              <PatientRow
                key={`${patient.email}-${patient.phoneNumber}-${index}`}
                patient={patient}
              />
            ),
          )}
        </TableBody>
      </Table>

      <TablePagination
        component="div"
        count={totalPatients}
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
          100,
        ]}
        labelRowsPerPage="Show"
      />
    </TableContainer>
  );
}