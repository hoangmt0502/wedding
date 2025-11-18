import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Box,
  IconButton,
  TextField,
  InputAdornment,
  useTheme,
} from "@mui/material";
import { Menu, Notifications, Search, Settings } from "@mui/icons-material";
import { useAuth } from "../context/AuthProvider";
import { useResponsive } from "../hooks/useResponsive";
import { HEADER_HEIGHT, SIDEBAR_HEIGHT_TOP } from "../constants/layout";
import { useSidebar } from "../context/SidebarProvider";
import { getPageTitle } from "../utils/getPageTitle";
import { useLocation } from "react-router-dom";
import React from "react";
import { useAppSelector } from "../store/hook";
import { selectTheme } from "../store/slices/themeSlice";
import { alpha } from '@mui/material/styles';
import { getSystemMode } from "../utils/themeMode";
import UserMenu from "./UserMenu";

type HeaderProps = {
  toggleSetting: () => void;
};

const Header: React.FC<HeaderProps> = ({ toggleSetting }) => {
  const { isDesktop, isMobile } = useResponsive();
  const { mode, customColorOverrides } = useAppSelector(selectTheme);
  const { user } = useAuth();
  const { widthSidebar, toggleOpenDrawer, isTopSideBar } = useSidebar();
  const { pathname } = useLocation();
  const theme = useTheme();
  const modeResolve = mode === 'system' ? getSystemMode() : mode

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        width: isDesktop ? `calc(100% - ${widthSidebar}px)` : "100%",
        height: HEADER_HEIGHT,
        ml: `${widthSidebar}px`,
        backgroundColor: theme.palette.custom.bodyBg,
        pr: isTopSideBar ? 0 : 1,
        pt: 1,
        pl: isMobile ? 1 : 0,
        pb: 0,
        color: "#000",
        top: isTopSideBar ? SIDEBAR_HEIGHT_TOP : 0,
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          bgcolor: customColorOverrides?.bgHeader || theme.palette.custom.bgHeader,
          borderRadius: 2,
          height: "100%",
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
        }}
      >
        <Box display={"flex"}>
          {!isDesktop && (
            <IconButton color="inherit" onClick={toggleOpenDrawer}>
              <Menu />
            </IconButton>
          )}
          {isDesktop && (
            <Box>
              <Typography
                textAlign={"start"}
                variant="h6"
                fontWeight={700}
                color={ customColorOverrides?.txtActiveHeader || theme.palette.text.primary}
              >
                {getPageTitle(pathname).title}
              </Typography>
              {!!getPageTitle(pathname)?.subTitle && (
                <Typography
                  textAlign={"start"}
                  variant="body2"
                  color={theme.palette.text.secondary}
                >
                  {getPageTitle(pathname)?.subTitle}
                </Typography>
              )}
            </Box>
          )}
        </Box>

        {/* Search + Icons + Avatar */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {!isMobile && <>
            <TextField
              variant="outlined"
              placeholder="Tìm kiếm"
              sx={{
                bgcolor: theme.palette.custom.bgSearchBox,
                borderRadius: "999px",
                "& .MuiOutlinedInput-root": {
                  px: 1.5,
                  borderRadius: "100%",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
              }}
              size="small"
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="start">
                      <Search fontSize="small" />
                    </InputAdornment>
                  ),
                },
              }}
            />
            <IconButton color="inherit"
              sx={{
                background: alpha(customColorOverrides?.txtActiveHeader || theme.palette.primary.main, modeResolve === 'light' ? 0.1 : 0.3),
                '&:hover': {
                  background: alpha(customColorOverrides?.txtActiveHeader || theme.palette.primary.main, modeResolve === 'light' ? 0.3 : 0.5),
                },
                '&:active': {
                  background: alpha(customColorOverrides?.txtActiveHeader || theme.palette.primary.main, modeResolve === 'light' ? 0.5 : 0.7),
                },
                '&:focus': {
                  background: alpha(customColorOverrides?.txtActiveHeader || theme.palette.primary.main, modeResolve === 'light' ? 0.5 : 0.7),
                },
                '&:focus-visible': {
                  background: alpha(customColorOverrides?.txtActiveHeader || theme.palette.primary.main, modeResolve === 'light' ? 0.5 : 0.7),
                },
                '&:disabled': {
                  background: alpha(customColorOverrides?.txtActiveHeader || theme.palette.primary.main, modeResolve === 'light' ? 0.5 : 0.7),
                },
                '&:active:not(:disabled)': {
                  background: alpha(customColorOverrides?.txtActiveHeader || theme.palette.primary.main, modeResolve === 'light' ? 0.5 : 0.7),
                },
              }}
            >
              <Notifications sx={{ color: customColorOverrides?.txtActiveHeader || theme.palette.primary.main }} />
            </IconButton>
          </>}
          <IconButton color="inherit" onClick={toggleSetting}
            sx={{
              background: alpha(customColorOverrides?.txtActiveHeader || theme.palette.primary.main, modeResolve === 'light' ? 0.1 : 0.3),
              '&:hover': {
                background: alpha(customColorOverrides?.txtActiveHeader || theme.palette.primary.main, modeResolve === 'light' ? 0.2 : 0.5),
              },
              '&:active': {
                background: alpha(customColorOverrides?.txtActiveHeader || theme.palette.primary.main, modeResolve === 'light' ? 0.5 : 0.7),
              },
              '&:focus': {
                background: alpha(customColorOverrides?.txtActiveHeader || theme.palette.primary.main, modeResolve === 'light' ? 0.5 : 0.7),
              },
              '&:focus-visible': {
                background: alpha(customColorOverrides?.txtActiveHeader || theme.palette.primary.main, modeResolve === 'light' ? 0.5 : 0.7),
              },
              '&:disabled': {
                background: alpha(customColorOverrides?.txtActiveHeader || theme.palette.primary.main, modeResolve === 'light' ? 0.5 : 0.7),
              },
              '&:active:not(:disabled)': {
                background: alpha(customColorOverrides?.txtActiveHeader || theme.palette.primary.main, modeResolve === 'light' ? 0.5 : 0.7),
              },
            }}
          >
            <Settings sx={{ color: customColorOverrides?.txtActiveHeader || theme.palette.primary.main }} />
          </IconButton>
          <UserMenu />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default React.memo(Header);
