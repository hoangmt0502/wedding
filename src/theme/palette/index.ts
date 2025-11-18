import { alpha, PaletteMode } from '@mui/material';

const DefaultPalette = (mode: PaletteMode, ) => {
  const whiteColor = '#FFFFFF';
  const lightColor = '#4c4e64';
  const darkColor = '#eaeaff';
  const mainColor = mode === 'light' ? lightColor : darkColor;

  const defaultBgColor = () => (mode === 'light' ? whiteColor : mode === 'dark' ? '#363A5B' : '#282A42');

  return {
    mode,
    custom: {
      dark: alpha(darkColor, 0.6),
      main: alpha(mainColor, 0.6),
      light: alpha(lightColor, 0.6),
      darkBg: '#282A42',
      lightBg: '#F7F7F9',
      bodyBg: mode === 'light' ? '#F7F7F9' : '#282A42',
      trackBg: mode === 'light' ? '#F2F2F4' : '#41435C',
      tooltipBg: mode === 'light' ? '#262732' : '#464A65',
      tableHeaderBg: mode === 'light' ? '#F5F5F7' : '#3A3E5B',
      bgHeader: mode === 'light' ? '#FFFFFF' : defaultBgColor(),
      txtHeader: mode === 'light' ? '#4B5563' : '#CBD5E1',
      txtActiveHeader: mode === 'light' ? '#1E40AF' : '#60A5FA',
      bgSidebar: mode === 'light' ? whiteColor : '#363A5B',
      txtSidebar: mode === 'light' ? '#4B5563' : '#CBD5E1',
      txtActiveSidebar: mode === 'light' ? '#1E40AF' : '#60A5FA',
      bgContent: defaultBgColor(),
      txtContent:  mode === 'light' ? '#727485' : '#e1e1ff',
      txtTitle:  mode === 'light' ? mainColor : whiteColor,
      btnPrimary: mode === 'light' ? '#1976d2' : '#787EFF',
      btnSecondary: mode === 'light' ? '#666CFF' : '#787EFF',
      link: mode === 'light' ? '#1976d2' : '#42a5f5',
      hover: mode === 'light' ? '#1565c0' : '#1565c0',
      bgSearchBox: mode === 'light' ? '#F4F5F7' : 'rgba(255, 255, 255, 0.2)'
    },
    common: {
      black: '#000',
      white: whiteColor
    },
    primary: {
      main: "#1976d2",
      light: "#42a5f5",
      dark: "#1565c0",
      contrastText: whiteColor,
    },
    secondary: {
      light: '#7F889B',
      main: '#6D788D',
      dark: '#606A7C',
      contrastText: whiteColor
    },
    error: {
      light: '#FF625F',
      main: '#FF4D49',
      dark: '#E04440',
      contrastText: whiteColor
    },
    warning: {
      light: '#FDBE42',
      main: '#FDB528',
      dark: '#DF9F23',
      contrastText: whiteColor
    },
    info: {
      light: '#40CDFA',
      main: '#26C6F9',
      dark: '#21AEDB',
      contrastText: whiteColor
    },
    success: {
      light: '#83E542',
      main: '#72E128',
      dark: '#64C623',
      contrastText: whiteColor
    },
    grey: {
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
      A100: '#F5F5F5',
      A200: '#EEEEEE',
      A400: '#BDBDBD',
      A700: '#616161'
    },
    text: {
      primary: mainColor,
      secondary: alpha(mainColor, 0.8),
      disabled: alpha(mainColor, 0.38)
    },
    divider: alpha(mainColor, 0.12),
    background: {
      paper: mode === 'light' ? '#F7F7F9' : '#282A42',
      default: defaultBgColor()
    },
    action: {
      active: alpha(mainColor, 0.54),
      hover: alpha(mainColor, 0.05),
      hoverOpacity: 0.05,
      selected: alpha(mainColor, 0.08),
      disabled: alpha(mainColor, 0.26),
      disabledBackground: alpha(mainColor, 0.12),
      focus: alpha(mainColor, 0.12),
    }
  };
};

export default DefaultPalette;
