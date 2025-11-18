import { ReactNode, useEffect, useRef } from "react";
import { hasPermission, useAuth } from "../../context/AuthProvider";
import { ISidebarMenuItem } from "../../interfaces/sidebar";
import { useLocation } from "react-router-dom";
import {
  Box,
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function TopSidebarItem({
  item,
  onToggleMenu,
  activeMenu,
  onSetActiveMenu,
}: {
  item: ISidebarMenuItem;
  onToggleMenu: Function;
  activeMenu: string | null;
  onSetActiveMenu: Function;
}) {
  const { user, permissions } = useAuth();
  const location = useLocation();
  const theme = useTheme();
  const ref = useRef<HTMLDivElement>(null);

  const isActive = (path?: string) => location.pathname === path;

  const isSelected = isActive(item?.path);
  const color = isSelected
    ? theme.palette.primary.main
    : theme.palette.text.primary;

  const hasChildren = !!item.children && Array.isArray(item.children);
  const isExpanded =
    hasChildren &&  activeMenu === item.key //!!activeMenu.find((activeKey) => activeKey === item?.key);
  const isSelectedChild = hasChildren
    ? item?.children?.some((child) => isActive(child.path) && !child.isPanelsSide)
    : false;

  useEffect(() => {
    if (!hasChildren || !isExpanded) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        // onSetActiveMenu((prev: string[]) =>
        //   prev.filter((key) => key !== item.key)
        // );
        onSetActiveMenu((prev: string | null) => (prev === item.key ? null : prev));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [hasChildren, isExpanded, item.key, onSetActiveMenu]);

  if ((item.permission && !hasPermission(user, permissions, item.permission)) || item?.isPanelsSide)
    return null;

  if (hasChildren) {
    const childColor =
      isSelectedChild || isExpanded
        ? theme.palette.primary.main
        : theme.palette.secondary.main;

    return (
      <Box key={item.key} ref={ref} sx={{ position: "relative" }}>
        <ListItem disablePadding>
          <ListItemButton
            sx={{
              border: "1px solid",
              borderColor: "transparent",
              borderRadius: 2,
              px: 2,
              py: 0,
              color: color,
              "&:focus": { outline: "none" },
              "&:active": { boxShadow: "none", outline: "none" },
            }}
            onClick={() => onToggleMenu(item.key)}
          >
            <ListItemIcon sx={{ minWidth: 30 }}>
              <item.icon sx={{ color: childColor }} />
            </ListItemIcon>
            <ListItemText
              primary={item.label}
              sx={{ color: childColor, whiteSpace: "nowrap" }}
            />
            {isExpanded ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse
          in={isExpanded}
          timeout="auto"
          unmountOnExit
          sx={{
            position: "absolute",
            top: "100%",
            left: 0,
            zIndex: 10,
            bgcolor: "background.paper",
            borderRadius: 1,
            boxShadow: 3,
            minWidth: "100%",
          }}
        >
          <List
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
            }}
          >
            {item?.children?.map((itemChild) => (
              <TopSidebarItem
                key={itemChild.path}
                item={itemChild}
                activeMenu={activeMenu}
                onSetActiveMenu={onSetActiveMenu}
                onToggleMenu={onToggleMenu}
              />
            ))}
          </List>
        </Collapse>
      </Box>
    );
  }

  return (
    <ListItem key={item.key} disablePadding sx={{ px: 1 }}>
      <ListItemButton
        component={Link}
        to={item.path ?? "#"}
        sx={{
          border: isSelected ? "1px solid" : "1px solid transparent",
          borderColor: "transparent",
          borderRadius: 2,
          px: 2,
          py: 0,
          color: color,
          "&:focus": { outline: "none" },
          "&:active": { boxShadow: "none", outline: "none" },
        }}
      >
        <ListItemIcon sx={{ minWidth: 30 }}>
          <item.icon sx={{ color }} />
        </ListItemIcon>
        <ListItemText
          primary={item.label}
          sx={{ whiteSpace: "nowrap", color }}
        />
      </ListItemButton>
    </ListItem>
  );
}
