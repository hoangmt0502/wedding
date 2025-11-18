import { useState } from "react";
import { List, Box, AppBar, Toolbar, Typography } from "@mui/material";
import { menuConfig } from "../../constants/sidebar";
import { SIDEBAR_HEIGHT_TOP } from "../../constants/layout";
import TogglePosition from "./TogglePosition";
import TopSidebarItem from "./TopSidebarItem";

export default function TopSidebar({
  activeMenu,
  onToggleMenu,
  onSetActiveMenu,
}: {
  activeMenu: string | null;
  onToggleMenu: (menuKey?: string) => void;
  onSetActiveMenu: (activeMenu: string | null) => void;
}) {
  return (
    <>
      <AppBar
        position="fixed"
        color="default"
        elevation={1}
        sx={{
          background: "linear-gradient(135deg, #f5f6ff, #eaeefe)",
          height: SIDEBAR_HEIGHT_TOP,
          justifyContent: "center",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* Logo + Title */}
          <Box display="flex" flexDirection={"column"} alignItems="center">
            <Box component="img" src="/logo.svg" sx={{ width: 40 }} />
          </Box>

          {/* Menu Items */}
          <Box
            sx={{
              width: "100%",
              display: "flex",
              px: 2,
              justifyContent: "space-between",
            }}
          >
            <List
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 1,
              }}
            >
              {menuConfig.map((item, index) => (
                <TopSidebarItem
                  key={index}
                  item={item}
                  onToggleMenu={onToggleMenu}
                  activeMenu={activeMenu}
                  onSetActiveMenu={onSetActiveMenu}
                />
              ))}
            </List>
            <TogglePosition />
          </Box>
        </Toolbar>
      </AppBar>

      {/* Spacer for fixed AppBar */}
      <Box sx={{ height: 64 }} />
    </>
  );
}
