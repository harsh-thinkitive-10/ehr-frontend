import { Delete, Edit } from '@mui/icons-material';
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import type { ReactNode } from 'react';

export interface ManagementColumn<T> {
  key: string;
  label: string;
  render?: (row: T) => ReactNode;
}

interface ManagementTableProps<T> {
  columns: ManagementColumn<T>[];
  rows: T[];
  getRowId: (row: T) => string;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  emptyMessage?: string;
}

export default function ManagementTable<T>({
  columns,
  rows,
  getRowId,
  onEdit,
  onDelete,
  emptyMessage = 'No records found',
}: ManagementTableProps<T>) {
  return (
    <TableContainer component={Paper} elevation={0}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.key} sx={{ fontWeight: 600 }}>
                {column.label}
              </TableCell>
            ))}
            {(onEdit || onDelete) && (
              <TableCell align="right" sx={{ fontWeight: 600 }}>
                Actions
              </TableCell>
            )}
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length + 1} align="center">
                <Typography variant="body2" sx={{ py: 3 }}>
                  {emptyMessage}
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            rows.map((row) => (
              <TableRow key={getRowId(row)}>
                {columns.map((column) => (
                  <TableCell key={column.key}>
                    {column.render
                      ? column.render(row)
                      : String(row[column.key as keyof T] ?? '')}
                  </TableCell>
                ))}

                {(onEdit || onDelete) && (
                  <TableCell align="right">
                    {onEdit && (
                      <IconButton
                        size="small"
                        onClick={() => onEdit(row)}
                      >
                        <Edit fontSize="small" />
                      </IconButton>
                    )}

                    {onDelete && (
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => onDelete(row)}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    )}
                  </TableCell>
                )}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}