import { useState } from "react";
import {
  Box,
  Avatar,
  Typography,
  Menu,
  MenuItem,
  alpha,
  useTheme,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { CachedSharp, LogoutRounded } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { selectTheme } from "../store/slices/themeSlice";
import { useAuth } from "../context/AuthProvider";
import { getSystemMode } from "../utils/themeMode";
import { logout } from "../services/authService";
import CONFIG from "../config";
import { useNavigate } from "react-router-dom";
import locales from "../locales";
import logo from '../assets/logo.png';
import { stopImpersonating } from "../services/userService";
import { toast } from "react-toastify";
import { removeImpersonationToken, setImpersonationToken } from "../store/slices/userSlice";

export default function UserMenu() {
  const { mode, customColorOverrides } = useAppSelector(selectTheme);
  const { user, setUser } = useAuth();
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { common: t_common } = locales["vi"];
  const modeResolve = mode === "system" ? getSystemMode() : mode;

  const { imperToken } = useAppSelector(state => state.user);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);

  const handleToggleMenu = (event: React.MouseEvent<HTMLElement>) => {
    if (menuOpen) {
      setAnchorEl(null);
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleCloseMenu = () => setAnchorEl(null);

  const handleLogout = async () => {
    handleCloseMenu();
    try {
      await logout();
      localStorage.removeItem(CONFIG.ACCESS_TOKEN_KEY);
      setUser(null);
      navigate("/login");
    } catch (error: any) {
      console.error("Logout error:", error.message);
      alert(t_common.logoutError);
    }
  };

  const handleBackToAdmin = async () => {
    handleCloseMenu();
    const impersonationToken = localStorage.getItem(CONFIG.IMPERSONATION_KEY);
    if (!impersonationToken) {
      toast.error(t_common.logoutError);
      return;
    }
    try {
      const res = await stopImpersonating({ impersonation_key: impersonationToken }); 
      localStorage.setItem(CONFIG.ACCESS_TOKEN_KEY, res.token);
      localStorage.removeItem(CONFIG.IMPERSONATION_KEY);
      dispatch(removeImpersonationToken());
      
      setTimeout(() => {
        window.location.href = '/';
      }, 100)
      
    } catch (error) {
       alert(t_common.logoutError);
    }
  }

  return (
    <Box
      onClick={handleToggleMenu}
      role="button"
      tabIndex={0}
      sx={{
        display: "inline-block",
        position: "relative",
        borderRadius: 25,
        backgroundColor: menuOpen
          ? alpha(theme.palette.primary.main, 0.08)
          : alpha(theme.palette.secondary.light, 0.08),
        transition: "background-color 0.2s",
        outline: "none",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          cursor: "pointer",
          py: 0.5,
          pl: 0.5,
          pr: 2,
        }}
      >
        <Avatar
          src={logo}
          sx={{
            background: alpha(
              customColorOverrides?.txtActiveHeader || theme.palette.primary.main,
              modeResolve === "light" ? 0.1 : 0.3
            ),
            color: customColorOverrides?.txtActiveHeader || theme.palette.primary.main,
          }}
        />
        <Box>
          <Typography
            variant="body2"
            fontWeight="600"
            textAlign="left"
            lineHeight="18px"
            color={customColorOverrides?.txtHeader || theme.palette.text.secondary}
          >
            {user?.name}
          </Typography>
          <Typography
            variant="body2"
            textAlign="left"
            lineHeight="18px"
            color={customColorOverrides?.txtHeader || theme.palette.text.secondary}
          >
            {user?.email}
          </Typography>
        </Box>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        PaperProps={{
          sx: { mt: 1, borderRadius: 2, boxShadow: 4, minWidth: "220px", px: 1 },
        }}
        keepMounted
      >
       { imperToken &&  <MenuItem
          onClick={handleBackToAdmin}
          sx={{
            borderRadius: 1,
            "&:hover *": { color: "#fff" },
          }}
        >
          <ListItemIcon>
            <CachedSharp fontSize="small" />
          </ListItemIcon>
          <ListItemText>{t_common.backToAdmin}</ListItemText>
        </MenuItem>}
        <MenuItem
          onClick={handleLogout}
          sx={{
            borderRadius: 1,
            "&:hover *": { color: "#fff" },
          }}
        >
          <ListItemIcon>
            <LogoutRounded fontSize="small" />
          </ListItemIcon>
          <ListItemText>{t_common.logout}</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
}
