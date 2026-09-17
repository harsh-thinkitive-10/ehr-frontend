import type { ReactNode } from 'react';

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';

export interface AppointmentTableColumn<T> {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'left' | 'center' | 'right';
  render: (
    row: T,
    index: number,
  ) => ReactNode;
}

interface AppointmentTableProps<T> {
  columns: AppointmentTableColumn<T>[];
  rows: T[];

  page: number;
  rowsPerPage: number;
  totalRows: number;

  onPageChange: (
    page: number,
  ) => void;

  onRowsPerPageChange: (
    rowsPerPage: number,
  ) => void;

  getRowKey: (
    row: T,
    index: number,
  ) => string | number;

  emptyMessage?: string;
}

export default function AppointmentTable<
  T,
>({
  columns,
  rows,
  page,
  rowsPerPage,
  totalRows,
  onPageChange,
  onRowsPerPageChange,
  getRowKey,
  emptyMessage = 'No appointments found.',
}: AppointmentTableProps<T>) {
  return (
    <TableContainer
      component={Paper}
      sx={{
        overflowX: 'auto',
      }}
    >
      <Table
        sx={{
          minWidth: 1100,
        }}
        aria-label="Appointments table"
      >
        <TableHead>
          <TableRow>
            {columns.map(
              (column) => (
                <TableCell
                  key={column.id}
                  align={
                    column.align ??
                    'left'
                  }
                  sx={{
                    minWidth:
                      column.minWidth,
                    whiteSpace:
                      'nowrap',
                    backgroundColor:
                      'background.default',
                    color:
                      'text.secondary',
                  }}
                >
                  {column.label}
                </TableCell>
              ),
            )}
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={
                  columns.length
                }
                align="center"
                sx={{
                  py: 6,
                  color:
                    'text.secondary',
                }}
              >
                {emptyMessage}
              </TableCell>
            </TableRow>
          ) : (
            rows.map(
              (
                row,
                index,
              ) => (
                <TableRow
                  key={getRowKey(
                    row,
                    index,
                  )}
                  hover
                >
                  {columns.map(
                    (
                      column,
                    ) => (
                      <TableCell
                        key={
                          column.id
                        }
                        align={
                          column.align ??
                          'left'
                        }
                        sx={{
                          color:
                            'text.primary',
                          verticalAlign:
                            'middle',
                        }}
                      >
                        {column.render(
                          row,
                          index,
                        )}
                      </TableCell>
                    ),
                  )}
                </TableRow>
              ),
            )
          )}
        </TableBody>
      </Table>

      <TablePagination
        component="div"
        count={totalRows}
        page={page}
        rowsPerPage={
          rowsPerPage
        }
        onPageChange={(
          _event,
          nextPage,
        ) => {
          onPageChange(
            nextPage,
          );
        }}
        onRowsPerPageChange={(
          event,
        ) => {
          onRowsPerPageChange(
            Number(
              event.target
                .value,
            ),
          );
        }}
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