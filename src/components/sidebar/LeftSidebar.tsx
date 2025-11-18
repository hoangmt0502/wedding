import React, { ElementType, ReactNode } from "react";
import {
  Logout,
  ExpandLess,
  ExpandMore,
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
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
  Stack,
  styled,
  ListItemButtonProps,
} from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth, hasPermission } from "../../context/AuthProvider";
import { useResponsive } from "../../hooks/useResponsive";
import { menuConfig } from "../../constants/sidebar";
import { ISidebarMenu } from "../../interfaces/sidebar";
import { useSidebar } from "../../context/SidebarProvider";
import TogglePosition from "./TogglePosition";
import { selectTheme } from "../../store/slices/themeSlice";
import { useAppSelector } from "../../store/hook";
import locales from "../../locales";
import { PATH_NAME } from "../../constants/path";

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

const MenuNavLink = styled(ListItemButton)<
  ListItemButtonProps & { component?: ElementType; href?: string; target?: '_blank' | undefined }
>(({ theme }) => ({
  width: '100%',
  borderRadius: 8,
  transition: 'padding-left .25s ease-in-out',
  '&.active': {
    '&, &:hover': {
      backgroundColor: theme.palette.primary.light,
      '&.Mui-focusVisible': {
        backgroundColor: theme.palette.primary.main
      }
    },
    '& .MuiTypography-root': {
      fontWeight: 500,
      color: `${theme.palette.common.white} !important`
    },
    '& .MuiListItemIcon-root': {
      color: `${theme.palette.common.white} !important`
    },
  }
}))

export default function LeftSidebar({
  activeMenu,
  onToggleMenu,
  onSetActiveMenu,
}: {
  // activeMenu: string[];
  // onToggleMenu: (menuKey?: string) => void;
  // onSetActiveMenu: (activeMenu: string[]) => void;
  activeMenu: string | null;
  onToggleMenu: (menuKey?: string) => void;
  onSetActiveMenu: (activeMenu: string | null) => void;
}) {
  const theme = useTheme();
  const { mode, customColorOverrides } = useAppSelector(selectTheme);
  const { isDesktop } = useResponsive();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, permissions, setUser } = useAuth();
  const {
    widthSidebar,
    isExpandedSidebar,
    isOpenDrawer,
    toggleOpenDrawer,
    toggleExpandedSidebar,
    isHoverSidebar,
    toggleHoverSidebar,
  } = useSidebar();
  const { sidebar: t_sidebar } = locales['vi'];

 

  const isActive = (path?: string) => location.pathname === path;
  const textWrap = "nowrap";
  const isTempExpandedSidebar =
    isExpandedSidebar || (!isExpandedSidebar && isHoverSidebar);

  const renderMenuItems = (menuItems: ISidebarMenu, isChild?: boolean) => {
    return menuItems.map((item) => {
      if ((item.permission && !hasPermission(user, permissions, item.permission, item.path)) || item?.isTopBar)
        return null;

      const isSelected = isActive(item?.path);
      const color = isSelected
        ? ( customColorOverrides?.txtActiveSidebar || theme.palette.primary.main )
        : ( customColorOverrides?.txtSidebar || theme.palette.text.secondary);

      if (item.children) {
        const isExpanded = activeMenu === item.key; // !!activeMenu?.find((key) => key === item?.key);
        const isSelectedChild = item.children.find((item) =>
          isActive(item?.path)
        );
        const childColor =
          isSelectedChild || isExpanded || item?.key === item?.activeSideKey
            ? ( customColorOverrides?.txtActiveSidebar || theme.palette.primary.main )
            : ( customColorOverrides?.txtSidebar || theme.palette.text.secondary);

        return (
          <React.Fragment key={item.key}>
            <ListItem sx={{ py: 0.75, px: 0.5 }}>
              <MenuNavLink
                //onClick={() => onToggleMenu(item.key)}
                onClick={() => {
                  const shouldClose = activeMenu === item.key;
                  onSetActiveMenu(shouldClose ? null : item.key ?? null);
                }}
                className={isActive(item.path) ? 'active' : ''}
                sx={{ justifyContent: "space-between" }}
              >
                <Box display={"flex"} alignItems={"center"}>
                  <ListItemIcon sx={{ minWidth: 35, ml: isChild ? 1.2 : 0 }}>
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
                    <ExpandLess sx={{ color: customColorOverrides?.txtActiveSidebar || theme.palette.primary.main }} />
                  ) : (
                    <ExpandMore sx={{ color: customColorOverrides?.txtSidebar || theme.palette.text.secondary }} />
                  )
                ) : null}
              </MenuNavLink>
            </ListItem>
            {isTempExpandedSidebar && (
              <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                <List component="div"
                  sx={{
                    paddingY: 0,
                    paddingX: 0.5,
                  }}
                >
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
            // onClick={() => {
            //   onSetActiveMenu(null);
            // }}
            sx={{
              // backgroundColor: isSelected ? customColorOverrides?.txtActiveSidebar || theme.palette.primary.main : 'transparent',
              // marginX: '0.5rem',
              borderRadius: '8px',
              // color: isSelected ? theme.palette.primary.contrastText : 'inherit'
              "&::before": isSelected
                ? {
                  content: '""',
                  position: "absolute",
                  left: 0,
                  top: "22%",
                  bottom: "22%",
                  width: "5px",
                  borderRadius: "0 8px 8px 0",
                  backgroundColor: customColorOverrides?.txtActiveSidebar || theme.palette.primary.main,
                }
                : {},
            }}
          >
            <ListItemIcon sx={{ minWidth: 35, ml: isChild ? 1.875 : 0 }}>
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
          p: 1,
          transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          overflow: "hidden",
          boxSizing: "border-box",
          border: "none",
        },
      }}
    >
      <Stack
        sx={{
          width: "100%",
          minHeight: "100%",
          overflowY: 'auto',
          background: theme.palette.custom.bgSidebar,
          borderRadius: 2,
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              p: 1.5,
              pl: 1,
            }}
          >
            <Link to={PATH_NAME.home}>
              <Box display="flex" alignItems="center">
                <Box component="img" src="/logo.svg" sx={{ width: 40, mr: 1 }} />
                <Collapse in={isTempExpandedSidebar} orientation="horizontal">
                  <Typography variant="h6" noWrap sx={{ color: theme.palette.text.primary }}>
                    {t_sidebar.siteName}
                  </Typography>
                </Collapse>
              </Box>
            </Link>
            {isTempExpandedSidebar && (
              <IconButton onClick={toggleExpandedSidebar} size="small">
                {isExpandedSidebar ? (
                  <KeyboardDoubleArrowLeft sx={{ color: theme.palette.custom.buttonPrimary }} />
                ) : (
                  <KeyboardDoubleArrowRight sx={{ color: theme.palette.custom.buttonPrimary }} />
                )}
              </IconButton>
            )}
          </Box>

          <List>
            {renderMenuItems(menuConfig)}
          </List>
        </Box>
        <Stack alignItems={"center"} mb={5}>
          {isTempExpandedSidebar && <TogglePosition />}
        </Stack>
      </Stack>
    </Drawer>
  );
}
