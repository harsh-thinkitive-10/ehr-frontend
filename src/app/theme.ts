import { createTheme } from '@mui/material/styles';

const colors = {
  primary: '#1976D2',
  primaryLight: '#EAF3FF',
  primaryDark: '#1259A5',

  secondary: '#169B83',
  secondaryLight: '#E8F7F3',
  secondaryDark: '#0F7765',

  background: '#F8FAFC',
  paper: '#FFFFFF',

  textPrimary: '#172B4D',
  textSecondary: '#64748B',
  textDisabled: '#94A3B8',

  border: '#E5E7EB',
  inputBorder: '#D5DCE5',
  inputHover: '#94A3B8',

  error: '#D32F2F',
  errorLight: '#FDECEC',
  errorDark: '#B71C1C',

  warning: '#ED6C02',
  warningLight: '#FFF4E5',
  warningDark: '#C77700',

  success: '#2E7D32',
  successLight: '#EAF6EC',
  successDark: '#1B5E20',

  info: '#0288D1',
  infoLight: '#E8F4FB',
  infoDark: '#01579B',

  white: '#FFFFFF',
  black: '#000000',
};

const ui = {
  borderRadius: {
    small: 6,
    medium: 10,
    large: 12,
    xlarge: 16,
  },

  button: {
    height: 48,
    radius: 10,
    fontWeight: 600,
  },

  input: {
    height: 48,
    radius: 10,
  },

  card: {
    radius: 12,
    borderWidth: 1,
  },

  chip: {
    radius: 8,
  },

  table: {
    headerBackground: colors.background,
    rowHover: colors.background,
    border: colors.border,
  },

  dialog: {
    radius: 12,
  },

  drawer: {
    width: 500,
  },
};

export const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary,
      light: colors.primaryLight,
      dark: colors.primaryDark,
      contrastText: colors.white,
    },

    secondary: {
      main: colors.secondary,
      light: colors.secondaryLight,
      dark: colors.secondaryDark,
      contrastText: colors.white,
    },

    background: {
      default: colors.background,
      paper: colors.paper,
    },

    text: {
      primary: colors.textPrimary,
      secondary: colors.textSecondary,
      disabled: colors.textDisabled,
    },

    divider: colors.border,

    error: {
      main: colors.error,
      light: colors.errorLight,
      dark: colors.errorDark,
      contrastText: colors.white,
    },

    warning: {
      main: colors.warning,
      light: colors.warningLight,
      dark: colors.warningDark,
      contrastText: colors.white,
    },

    success: {
      main: colors.success,
      light: colors.successLight,
      dark: colors.successDark,
      contrastText: colors.white,
    },

    info: {
      main: colors.info,
      light: colors.infoLight,
      dark: colors.infoDark,
      contrastText: colors.white,
    },
  },

  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',

    h1: {
      fontSize: '2.25rem',
      lineHeight: 1.2,
      fontWeight: 700,
      color: colors.textPrimary,
    },

    h2: {
      fontSize: '2rem',
      lineHeight: 1.25,
      fontWeight: 700,
      color: colors.textPrimary,
    },

    h3: {
      fontSize: '1.75rem',
      lineHeight: 1.3,
      fontWeight: 700,
      color: colors.textPrimary,
    },

    h4: {
      fontSize: '1.5rem',
      lineHeight: 1.35,
      fontWeight: 700,
      color: colors.textPrimary,
    },

    h5: {
      fontSize: '1.25rem',
      lineHeight: 1.4,
      fontWeight: 700,
      color: colors.textPrimary,
    },

    h6: {
      fontSize: '1.125rem',
      lineHeight: 1.45,
      fontWeight: 600,
      color: colors.textPrimary,
    },

    body1: {
      fontSize: '0.95rem',
      lineHeight: 1.6,
      color: colors.textSecondary,
    },

    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
      color: colors.textSecondary,
    },

    subtitle1: {
      fontSize: '1rem',
      lineHeight: 1.5,
      fontWeight: 600,
      color: colors.textPrimary,
    },

    subtitle2: {
      fontSize: '0.875rem',
      lineHeight: 1.45,
      fontWeight: 600,
      color: colors.textPrimary,
    },

    button: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
      textTransform: 'none',
      fontWeight: 600,
    },

    caption: {
      fontSize: '0.75rem',
      lineHeight: 1.4,
      color: colors.textSecondary,
    },

    overline: {
      fontSize: '0.75rem',
      lineHeight: 1.5,
      fontWeight: 600,
      letterSpacing: '0.05em',
      color: colors.textSecondary,
    },
  },

  shape: {
    borderRadius: ui.borderRadius.medium,
  },

  spacing: 8,

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          width: '100%',
          height: '100%',
        },

        body: {
          width: '100%',
          minHeight: '100%',
          margin: 0,
          backgroundColor: colors.background,
          color: colors.textPrimary,
        },

        '#root': {
          width: '100%',
          minHeight: '100vh',
        },

        '*': {
          boxSizing: 'border-box',
        },

        '*, *::before, *::after': {
          boxSizing: 'border-box',
        },

        'button, input, textarea, select': {
          font: 'inherit',
        },

        '::selection': {
          backgroundColor: colors.primaryLight,
          color: colors.textPrimary,
        },
      },
    },

    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },

      styleOverrides: {
        root: {
          minHeight: ui.button.height,
          borderRadius: ui.button.radius,
          padding: '0 20px',
          textTransform: 'none',
          fontWeight: ui.button.fontWeight,
        },

        sizeSmall: {
          minHeight: 36,
          padding: '0 14px',
          fontSize: '0.8125rem',
        },

        sizeMedium: {
          minHeight: ui.button.height,
        },

        sizeLarge: {
          minHeight: 52,
          padding: '0 24px',
          fontSize: '0.95rem',
        },

        contained: {
          '&:hover': {
            boxShadow: 'none',
          },

          '&:disabled': {
            backgroundColor: '#E2E8F0',
            color: colors.textDisabled,
          },
        },

        outlined: {
          borderWidth: 1,

          '&:hover': {
            borderWidth: 1,
          },
        },

        text: {
          '&:hover': {
            backgroundColor: colors.primaryLight,
          },
        },
      },
    },

    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: ui.borderRadius.medium,

          '&:hover': {
            backgroundColor: colors.background,
          },
        },

        sizeSmall: {
          padding: 6,
        },
      },
    },

    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        fullWidth: true,
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          minHeight: ui.input.height,
          borderRadius: ui.input.radius,
          backgroundColor: colors.paper,

          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: colors.inputHover,
          },

          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: colors.primary,
            borderWidth: 2,
          },

          '&.Mui-error .MuiOutlinedInput-notchedOutline': {
            borderColor: colors.error,
          },

          '&.Mui-disabled': {
            backgroundColor: colors.background,
          },
        },

        notchedOutline: {
          borderColor: colors.inputBorder,
        },

        input: {
          padding: '13px 14px',
        },

        multiline: {
          padding: 0,
        },
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: colors.textPrimary,
          fontWeight: 600,

          '&.Mui-focused': {
            color: colors.primary,
          },

          '&.Mui-error': {
            color: colors.error,
          },
        },
      },
    },

    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginLeft: 2,
          marginRight: 2,
          marginTop: 5,
          fontSize: '0.75rem',
        },
      },
    },

    MuiSelect: {
      styleOverrides: {
        select: {
          minHeight: ui.input.height,
          display: 'flex',
          alignItems: 'center',
          boxSizing: 'border-box',
        },
      },
    },

    MuiAutocomplete: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            minHeight: ui.input.height,
            borderRadius: ui.input.radius,
          },
        },

        paper: {
          marginTop: 4,
          border: `1px solid ${colors.border}`,
          borderRadius: ui.borderRadius.medium,
          boxShadow: '0 8px 24px rgba(15, 23, 42, 0.08)',
        },

        option: {
          padding: '10px 14px',

          '&[aria-selected="true"]': {
            backgroundColor: colors.primaryLight,
          },

          '&:hover': {
            backgroundColor: colors.background,
          },
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: ui.card.radius,
          border: `${ui.card.borderWidth}px solid ${colors.border}`,
          boxShadow: 'none',
          backgroundColor: colors.paper,
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },

        elevation1: {
          boxShadow: '0 2px 8px rgba(15, 23, 42, 0.06)',
        },

        elevation2: {
          boxShadow: '0 4px 12px rgba(15, 23, 42, 0.08)',
        },

        elevation3: {
          boxShadow: '0 8px 24px rgba(15, 23, 42, 0.10)',
        },
      },
    },

    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: ui.dialog.radius,
          boxShadow: '0 12px 40px rgba(15, 23, 42, 0.15)',
          backgroundImage: 'none',
        },

        paperFullScreen: {
          borderRadius: 0,
        },
      },
    },

    MuiDialogTitle: {
      styleOverrides: {
        root: {
          padding: '20px 24px',
          fontWeight: 700,
          color: colors.textPrimary,
        },
      },
    },

    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: '24px',

          '&:first-child': {
            paddingTop: 24,
          },
        },
      },
    },

    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: '16px 24px',
          gap: 8,
        },
      },
    },

    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: colors.paper,
          backgroundImage: 'none',
          borderColor: colors.border,
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          minHeight: 30,
          borderRadius: ui.chip.radius,
          fontWeight: 600,
        },

        label: {
          paddingLeft: 10,
          paddingRight: 10,
        },
      },
    },

    MuiTableContainer: {
      styleOverrides: {
        root: {
          borderRadius: ui.card.radius,
          border: `1px solid ${colors.border}`,
          backgroundColor: colors.paper,
        },
      },
    },

    MuiTable: {
      styleOverrides: {
        root: {
          borderCollapse: 'separate',
          borderSpacing: 0,
        },
      },
    },

    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: ui.table.headerBackground,
        },
      },
    },

    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: '14px 16px',
          borderColor: ui.table.border,
          color: colors.textPrimary,
          fontSize: '0.875rem',
        },

        head: {
          backgroundColor: ui.table.headerBackground,
          color: colors.textSecondary,
          fontWeight: 600,
          whiteSpace: 'nowrap',
        },

        body: {
          fontWeight: 400,
        },
      },
    },

    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: ui.table.rowHover,
          },

          '&:last-child td': {
            borderBottom: 0,
          },
        },
      },
    },

    MuiTablePagination: {
      styleOverrides: {
        root: {
          borderTop: `1px solid ${colors.border}`,
        },

        toolbar: {
          minHeight: 56,
          paddingLeft: 16,
          paddingRight: 16,
        },

        selectLabel: {
          color: colors.textSecondary,
        },

        displayedRows: {
          color: colors.textSecondary,
        },
      },
    },

    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: colors.border,
        },
      },
    },

    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: ui.borderRadius.medium,
          fontWeight: 500,
        },

        message: {
          padding: '4px 0',
        },

        icon: {
          alignItems: 'center',
        },
      },
    },

    MuiSnackbar: {
      styleOverrides: {
        root: {
          zIndex: 1400,
        },
      },
    },

    MuiMenu: {
      styleOverrides: {
        paper: {
          marginTop: 4,
          border: `1px solid ${colors.border}`,
          borderRadius: ui.borderRadius.medium,
          boxShadow: '0 8px 24px rgba(15, 23, 42, 0.10)',
          backgroundImage: 'none',
        },

        list: {
          padding: 6,
        },
      },
    },

    MuiMenuItem: {
      styleOverrides: {
        root: {
          minHeight: 40,
          borderRadius: 6,
          padding: '8px 12px',

          '&:hover': {
            backgroundColor: colors.background,
          },

          '&.Mui-selected': {
            backgroundColor: colors.primaryLight,

            '&:hover': {
              backgroundColor: colors.primaryLight,
            },
          },
        },
      },
    },

    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: colors.textPrimary,
          borderRadius: 6,
          fontSize: '0.75rem',
          padding: '6px 10px',
        },

        arrow: {
          color: colors.textPrimary,
        },
      },
    },

    MuiPagination: {
      styleOverrides: {
        root: {
          '& .MuiPaginationItem-root': {
            borderRadius: 8,
            fontWeight: 500,
          },
        },
      },
    },

    MuiPaginationItem: {
      styleOverrides: {
        root: {
          color: colors.textSecondary,

          '&.Mui-selected': {
            backgroundColor: colors.primary,
            color: colors.white,

            '&:hover': {
              backgroundColor: colors.primaryDark,
            },
          },

          '&:hover': {
            backgroundColor: colors.background,
          },
        },
      },
    },

    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: colors.inputHover,

          '&.Mui-checked': {
            color: colors.primary,
          },
        },
      },
    },

    MuiRadio: {
      styleOverrides: {
        root: {
          color: colors.inputHover,

          '&.Mui-checked': {
            color: colors.primary,
          },
        },
      },
    },

    MuiSwitch: {
      styleOverrides: {
        root: {
          width: 42,
          height: 26,
          padding: 0,
        },

        switchBase: {
          padding: 3,

          '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: colors.white,

            '& + .MuiSwitch-track': {
              backgroundColor: colors.primary,
              opacity: 1,
            },
          },
        },

        thumb: {
          width: 20,
          height: 20,
        },

        track: {
          borderRadius: 13,
          backgroundColor: '#CBD5E1',
          opacity: 1,
        },
      },
    },

    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: colors.primaryLight,
          color: colors.primary,
          fontWeight: 600,
        },
      },
    },

    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: ui.borderRadius.medium,

          '&:hover': {
            backgroundColor: colors.background,
          },

          '&.Mui-selected': {
            backgroundColor: colors.primaryLight,
            color: colors.primary,

            '&:hover': {
              backgroundColor: colors.primaryLight,
            },
          },
        },
      },
    },

    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 40,
          color: colors.textSecondary,
        },
      },
    },

    MuiBadge: {
      styleOverrides: {
        badge: {
          fontWeight: 600,
        },
      },
    },

    MuiAccordion: {
      styleOverrides: {
        root: {
          border: `1px solid ${colors.border}`,
          borderRadius: ui.borderRadius.medium,
          boxShadow: 'none',

          '&:before': {
            display: 'none',
          },

          '&:first-of-type': {
            borderTopLeftRadius: ui.borderRadius.medium,
            borderTopRightRadius: ui.borderRadius.medium,
          },

          '&:last-of-type': {
            borderBottomLeftRadius: ui.borderRadius.medium,
            borderBottomRightRadius: ui.borderRadius.medium,
          },
        },
      },
    },

    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          minHeight: 52,

          '&.Mui-expanded': {
            minHeight: 52,
          },
        },

        content: {
          margin: '12px 0',

          '&.Mui-expanded': {
            margin: '12px 0',
          },
        },
      },
    },

    MuiLink: {
      styleOverrides: {
        root: {
          color: colors.primary,
          fontWeight: 500,
          textDecoration: 'none',

          '&:hover': {
            textDecoration: 'underline',
          },
        },
      },
    },

    MuiCircularProgress: {
      defaultProps: {
        thickness: 4,
      },
    },
  },
});