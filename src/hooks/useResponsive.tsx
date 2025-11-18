import { useTheme, useMediaQuery } from "@mui/material";

export const useResponsive = () => {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // <600px
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md")); // 600px - 959px
  const isDesktop = useMediaQuery(theme.breakpoints.up("md")); // >=960px
  const isLargeDesktop = useMediaQuery(theme.breakpoints.up("lg")); // >=1200px

  return { isMobile, isTablet, isDesktop, isLargeDesktop };
};