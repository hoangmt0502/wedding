import React, { useState, useEffect, ReactNode } from "react";
import {
  Logout,
  ExpandLess,
  ExpandMore,
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
  Menu,
} from "@mui/icons-material";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Box,
  useTheme,
  Typography,
  IconButton,
} from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { logout } from "../services/authService";
import CONFIG from "../config";
import { useAuth, hasPermission } from "../context/AuthProvider";
import { useResponsive } from "../hooks/useResponsive";
import { menuConfig } from "../constants/sidebar";
import { ISidebarMenu, ISidebarMenuItem } from "../interfaces/sidebar";
import { useSidebar } from "../context/SidebarProvider";

const CollapseText = ({
  open = true,
  children,
}: {
  open: boolean;
  children: ReactNode;
}) => {
  return (
    <Collapse in={open} orientation="horizontal">
      {children}
    </Collapse>
  );
};

export default function Sidebar() {
  const theme = useTheme();
  const { isDesktop } = useResponsive();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, permissions, setUser } = useAuth();
  const [activeMenu, setActiveMenu] = useState<string[]>([]);
  const {
    widthSidebar,
    isExpandedSidebar,
    isOpenDrawer,
    toggleOpenDrawer,
    toggleExpandedSidebar,
    isHoverSidebar,
    toggleHoverSidebar,
  } = useSidebar();

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem(CONFIG.ACCESS_TOKEN_KEY);
      setUser(null);
      navigate("/login");
    } catch (error: any) {
      console.error("Logout error:", error.message);
      alert("Đăng xuất thất bại. Vui lòng thử lại.");
    }
  };

  const toggleMenu = (menuKey?: string) => {
    const existedActiveMenu = activeMenu.find((item) => item === menuKey);
    let newActiveMenu = [...activeMenu];
    if (existedActiveMenu) {
      newActiveMenu = newActiveMenu.filter((item) => item !== menuKey);
    } else {
      !!menuKey && newActiveMenu.push(menuKey);
    }
    setActiveMenu(newActiveMenu);
  };

  useEffect(() => {
    const findActiveKeys = (
      items: ISidebarMenuItem[],
      currentPath: string,
      parents: string[] = []
    ): string[] => {
      for (const item of items) {
        if (item.children) {
          const result = findActiveKeys(
            item.children,
            currentPath,
            item.key ? [...parents, item.key] : [...parents]
          );
          if (result.length) return result;
        }
        if (item.path === currentPath) {
          return item.key ? [...parents, item.key] : [...parents];
        }
      }
      return [];
    };

    const activeKeys = findActiveKeys(menuConfig, location.pathname);
    setActiveMenu(activeKeys);
  }, [location.pathname]);

  const isActive = (path?: string) => location.pathname === path;
  const textWrap = "nowrap";
  const isTempExpandedSidebar =
    isExpandedSidebar || (!isExpandedSidebar && isHoverSidebar);

  const renderMenuItems = (menuItems: ISidebarMenu, isChild?: boolean) => {
    return menuItems.map((item) => {
      if (item.permission && !hasPermission(user, permissions, item.permission))
        return null;

      const isSelected = isActive(item?.path);
      const color = isSelected
        ? theme.palette.primary.main
        : theme.palette.secondary.main;

      if (item.children) {
        const isExpanded = !!activeMenu?.find((key) => key === item?.key);
        const childColor = isExpanded
          ? theme.palette.primary.main
          : theme.palette.secondary.main;
        return (
          <React.Fragment key={item.key}>
            <ListItem sx={{ p: 0 }}>
              <ListItemButton
                onClick={() => toggleMenu(item.key)}
                sx={{ justifyContent: "space-between" }}
              >
                <Box display={"flex"} alignItems={"center"}>
                  <ListItemIcon sx={{ minWidth: 35, ml: isChild ? 3 : 0 }}>
                    {React.cloneElement(<item.icon />, {
                      sx: { color: childColor },
                    })}
                  </ListItemIcon>
                  <CollapseText open={isTempExpandedSidebar}>
                    <ListItemText
                      primary={item.label}
                      sx={{
                        color: childColor,
                        display: "block",
                        ml: isChild ? 4 : 0,
                        textWrap,
                      }}
                    />
                  </CollapseText>
                </Box>
                {isTempExpandedSidebar ? (
                  isExpanded ? (
                    <ExpandLess color="secondary" />
                  ) : (
                    <ExpandMore color="secondary" />
                  )
                ) : null}
              </ListItemButton>
            </ListItem>
            {isTempExpandedSidebar && (
              <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {renderMenuItems(item.children, true)}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        );
      }

      return (
        <ListItem key={item.path} sx={{ p: 0 }}>
          <ListItemButton
            component={Link}
            to={item.path ?? "#"}
            // selected={isSelected}
            onClick={() => {
              setActiveMenu([]);
            }}
            sx={{
              "&::before": isSelected
                ? {
                    content: '""',
                    position: "absolute",
                    left: 0,
                    top: "22%",
                    bottom: "22%",
                    width: "5px",
                    borderRadius: "0 8px 8px 0",
                    backgroundColor: "primary.main",
                  }
                : {},
            }}
          >
            <ListItemIcon sx={{ minWidth: 35, ml: isChild ? 3 : 0 }}>
              {React.cloneElement(<item.icon />, { sx: { color } })}
            </ListItemIcon>
            <CollapseText open={isTempExpandedSidebar}>
              <ListItemText
                primary={item.label}
                sx={{
                  color,
                  display: "block",
                  textWrap,
                }}
              />
            </CollapseText>
          </ListItemButton>
        </ListItem>
      );
    });
  };

  return (
    <Drawer
      variant={isDesktop ? "permanent" : "temporary"}
      open={isOpenDrawer}
      onClose={toggleOpenDrawer}
      onMouseEnter={() => {
        if (!isExpandedSidebar) toggleHoverSidebar(true);
      }}
      onMouseLeave={() => {
        if (!isExpandedSidebar) toggleHoverSidebar(false);
      }}
      sx={{
        width: widthSidebar,
        flexShrink: 0,
        whiteSpace: "nowrap",
        "& .MuiDrawer-paper": {
          width: widthSidebar,
          background: theme.palette.custom.bodyBg,
          p: 1,
          transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          overflowX: "hidden",
          boxSizing: "border-box",
          border: "none",
        },
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #f5f6ff, #eaeefe)",
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: 1.5,
            pl: 1,
          }}
        >
          <Box display="flex" alignItems="center">
            <Box component="img" src="/logo.svg" sx={{ width: 40, mr: 1 }} />
            <Collapse in={isTempExpandedSidebar} orientation="horizontal">
              <Typography variant="h6" noWrap>
                GPP Đa Phúc
              </Typography>
            </Collapse>
          </Box>
          {isTempExpandedSidebar && (
            <IconButton onClick={toggleExpandedSidebar} size="small">
              {isExpandedSidebar ? (
                <KeyboardDoubleArrowLeft />
              ) : (
                <KeyboardDoubleArrowRight />
              )}
            </IconButton>
          )}
        </Box>

        <List>
          {renderMenuItems(menuConfig)}
          <ListItem sx={{ p: 0 }}>
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon sx={{ minWidth: 35 }}>
                <Logout sx={{ color: theme.palette.secondary.main }} />
              </ListItemIcon>
              <CollapseText open={isTempExpandedSidebar}>
                <ListItemText
                  primary="Đăng xuất"
                  sx={{
                    color: theme.palette.secondary.main,
                    display: "block",
                    textWrap,
                  }}
                />
              </CollapseText>
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}
