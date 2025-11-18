import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    custom: {
      dark: string;
      main: string;
      light: string;
      darkBg: string;
      lightBg: string;
      bodyBg: string;
      trackBg: string;
      tooltipBg: string;
      tableHeaderBg: string;
      bgHeader: string;
      txtHeader: string;
      txtActiveHeader: string;
      bgSidebar: string;
      txtSidebar: string;
      txtActiveSidebar: string;
      btnSecondary: string;
      bgSearchBox: string;
      bgContent: string;
      txtContent: string;
      txtTitle: string;
      [key: string]: string;
    };
  }

  interface PaletteOptions {
    custom?: {
      dark?: string;
      main?: string;
      light?: string;
      darkBg?: string;
      lightBg?: string;
      bodyBg?: string;
      trackBg?: string;
      tooltipBg?: string;
      tableHeaderBg?: string;
      bgHeader?: string;
      txtHeader: string;
      txtActiveHeader: string;
      bgSidebar?: string;
      txtSidebar?: string;
      txtActiveSidebar?: string;
      btnSecondary?: string;
      bgContent: string;
      txtContent: string;
      txtTitle: string;
      [key: string]: string;
    };
  }
}