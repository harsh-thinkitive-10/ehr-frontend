import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#1976D2',
      light: '#EAF3FF',
      dark: '#1259A5',
      contrastText: '#FFFFFF',
    },

    secondary: {
      main: '#169B83',
      light: '#E8F7F3',
      dark: '#0F7765',
      contrastText: '#FFFFFF',
    },

    background: {
      default: '#F8FAFC',
      paper: '#FFFFFF',
    },

    text: {
      primary: '#172B4D',
      secondary: '#64748B',
      disabled: '#94A3B8',
    },

    divider: '#E5E7EB',

    error: {
      main: '#D32F2F',
      light: '#FDECEC',
      dark: '#B71C1C',
      contrastText: '#FFFFFF',
    },

    warning: {
      main: '#ED6C02',
      light: '#FFF4E5',
      dark: '#C77700',
      contrastText: '#FFFFFF',
    },

    success: {
      main: '#2E7D32',
      light: '#EAF6EC',
      dark: '#1B5E20',
      contrastText: '#FFFFFF',
    },

    info: {
      main: '#0288D1',
      light: '#E8F4FB',
      dark: '#01579B',
      contrastText: '#FFFFFF',
    },
  },

  typography: {
    fontFamily:
      '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',

    h1: {
      fontWeight: 700,
      color: '#172B4D',
    },

    h2: {
      fontWeight: 700,
      color: '#172B4D',
    },

    h3: {
      fontWeight: 700,
      color: '#172B4D',
    },

    h4: {
      fontWeight: 700,
      color: '#172B4D',
    },

    h5: {
      fontWeight: 700,
      color: '#172B4D',
    },

    h6: {
      fontWeight: 600,
      color: '#172B4D',
    },

    body1: {
      color: '#64748B',
      fontSize: '0.95rem',
    },

    body2: {
      color: '#64748B',
      fontSize: '0.875rem',
    },

    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },

  shape: {
    borderRadius: 10,
  },

  spacing: 8,

  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },

      styleOverrides: {
        root: {
          minHeight: 48,
          borderRadius: 10,
          textTransform: 'none',
          fontWeight: 600,
        },

        contained: {
          '&:hover': {
            boxShadow: 'none',
          },
        },

        outlined: {
          borderWidth: '1px',

          '&:hover': {
            borderWidth: '1px',
          },
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          border: '1px solid #E5E7EB',
          boxShadow: 'none',
          backgroundColor: '#FFFFFF',
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 10,

          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#94A3B8',
          },

          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#1976D2',
          },
        },

        notchedOutline: {
          borderColor: '#D5DCE5',
        },
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#172B4D',
          fontWeight: 600,
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 600,
        },
      },
    },

    MuiTableCell: {
      styleOverrides: {
        head: {
          backgroundColor: '#F8FAFC',
          color: '#64748B',
          fontWeight: 600,
        },

        root: {
          borderColor: '#E5E7EB',
        },
      },
    },

    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: '#F8FAFC',
          },
        },
      },
    },

    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: '#E5E7EB',
        },
      },
    },
  },
});