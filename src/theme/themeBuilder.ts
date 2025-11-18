import { alpha, createTheme, darken, lighten } from '@mui/material/styles';
import DefaultPalette from './palette';
import { PaletteMode } from '@mui/material';
import palette from '../constants/palette';
import { getSystemMode } from '../utils/themeMode';

export type ThemeColor = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';

const resolveMode = (mode: PaletteMode | 'system'): PaletteMode =>
  mode === 'system' ? getSystemMode() : mode;

const themeBuilder = (
  mode: PaletteMode | 'system',
  themeColor: ThemeColor = 'primary',
  overrides: Partial<ReturnType<typeof DefaultPalette>['custom']> = {},
  userThemeColor: string | undefined
) => {
  const resolvedMode = resolveMode(mode);
  const paletteObj = DefaultPalette(resolvedMode);
  const { custom, mode: _, ...muiPalette } = paletteObj;

  const colorSource = muiPalette[themeColor];
  const safePrimaryColor = colorSource?.main ?? '#666CFF';

  let uThemeColor = {
    main: '',
    light: '',
    dark: '',
    contrastText: '',
  }

  if (!!userThemeColor) {
    uThemeColor = {
      main: userThemeColor,
      light: lighten(userThemeColor, 0.2),
      dark: darken(userThemeColor, 0.2),
      contrastText: '#ffffff',
    }
  }

  return createTheme({
    palette: {
      mode: resolvedMode,
      ...muiPalette,
      primary: {
        ...(!!userThemeColor ? uThemeColor : colorSource),
        main: !!userThemeColor ? uThemeColor?.main : safePrimaryColor
      },
      text: {
        primary: overrides?.txtTitle || paletteObj.text.primary,
        secondary: overrides?.txtContent || paletteObj.text.secondary,
      },
      background: {
        ...paletteObj.background,
        default: overrides?.bgContent || paletteObj.background.default,
      },
      custom: {
        ...custom,
        ...overrides
      },
    },
    typography: {
      fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
      h6: {
        fontWeight: 600
      },
      subtitle2: {
        fontWeight: 600
      },
      body2: {
        fontSize: '0.875rem'
      }
    },
    components: {
      MuiTable: {
        styleOverrides: {
          root: ({theme}) => ({
            minWidth: 650,
            border: `1px solid ${resolvedMode === 'dark' ? alpha(theme.palette.custom.lightBg, 0.15) : alpha(theme.palette.custom.darkBg, 0.05)}`,
          })
        }
      },
      MuiTableHead: {
        styleOverrides: {
          root: ({theme}) => ({
            backgroundColor: alpha(theme.palette.primary.main, 0.25),
            fontWeight: 600,
          })
        }
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            height: 50
          },
          head: ({theme}) => ({
            color: resolvedMode === 'dark' ? alpha(theme.palette.custom.lightBg, 1) : alpha(theme.palette.custom.darkBg, 1),
            fontWeight: 600,
            padding: '12px'
          }),
          body: ({ theme }) => ({
            color: theme.palette.text.primary,
            padding: '4px 12px',
            borderRight: `1px solid ${resolvedMode === 'dark' ? alpha(theme.palette.custom.lightBg, 0.15) : alpha(theme.palette.custom.darkBg, 0.05)}`,
            borderBottom: `1px solid ${resolvedMode === 'dark' ? alpha(theme.palette.custom.lightBg, 0.15) : alpha(theme.palette.custom.darkBg, 0.05)}`,
            '&:last-child': {
              borderRight: 'none'
            }
          })
        }
      },
      MuiCheckbox: {
        styleOverrides: {
          root: {
            color: '#64748b',
            '&.Mui-checked': {
              color: palette.primary.main
            }
          }
        }
      },
      MuiTableRow: {
        styleOverrides: {
          root: ({ theme }) => ({
            '&:hover': {
              backgroundColor:
                theme.palette.mode === 'light'
                  ? alpha(theme.palette.primary.light, 0.1)
                  : alpha(theme.palette.primary.light, 0.08)
            },
            '&.Mui-selected': {
              backgroundColor:
                theme.palette.mode === 'light'
                  ? alpha(theme.palette.primary.main, 0.16)
                  : alpha(theme.palette.primary.light, 0.24),
              '&:hover': {
                backgroundColor:
                  theme.palette.mode === 'light'
                    ? alpha(theme.palette.primary.main, 0.24)
                    : alpha(theme.palette.primary.light, 0.32)
              }
            }
          })
        }
      },
      MuiTableContainer: {
        styleOverrides: {
          root: {
            borderRadius: '8px',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          }
        }
      },
      MuiTableBody: {
        styleOverrides: {
          root: ({ theme }) => ({
            color: theme.palette.text.primary,
          })
        }
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            '&:hover': {
              backgroundColor: palette.primary.light
            }
          }
        }
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '6px',
            boxShadow: 'none',
            fontWeight: 600,
            '&:focus': {
              outline: 'none',
            },
            '&.Mui-focusVisible': {
              outline: 'none',
              boxShadow: 'none',
            },
          },
          outlinedPrimary: ({ theme }) => ({
            borderColor: overrides?.btnPrimary ?? theme.palette.primary.main,
            color: overrides?.btnPrimary ?? theme.palette.primary.main,
            textTransform: 'none',
            '&:hover': {
              borderColor: theme.palette.primary.main,
            },
          }),
          containedPrimary: ({ theme }) => ({
            backgroundColor: overrides?.btnPrimary ?? theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            textTransform: 'none',
          }),
        },
      }
      ,
      MuiIconButton: {
        styleOverrides: {
          root: {
            "&:focus": {
              outline: "none",
            },
            "&:focus-visible": {
              outline: "none",
              boxShadow: "none",
            },
          },
        },
      },
      MuiLink: {
        styleOverrides: {
          root: {
            textDecoration: 'none',
            color: overrides?.link ?? '#666CFF',
            fontWeight: 500,
            '&:hover': {
              textDecoration: 'underline',
              color: overrides?.hover ?? '#5A5FE0'
            }
          }
        }
      },
      MuiCard: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: '8px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
            backgroundColor: theme.palette.background.default,
            transition: 'box-shadow 0.3s ease-in-out',
            '&:hover': {
              boxShadow: '0 6px 24px rgba(0,0,0,0.08)',
            },
          }),
        },
      },
      MuiCardHeader: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderBottom: `1px solid ${resolvedMode === 'dark' ? alpha(theme.palette.custom.lightBg, 0.15) : alpha(theme.palette.custom.darkBg, 0.05)}`,
          }),
          title: {
            fontSize: '1.125rem',
            fontWeight: 600,
          },
          subheader: {
            fontSize: '0.875rem',
          },
        },
      },
      MuiCardContent: {
        styleOverrides: {
          root: {
            '&:last-child': {
              paddingBottom: '16px',
            },
          },
        },
      },
      MuiFormHelperText: {
        styleOverrides: {
          root: {
            marginLeft: 0,
            marginRight: 0
          },
        },
      },
    }
  });
};

export default themeBuilder;
