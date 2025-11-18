import { Box, Typography, Stack, Link, IconButton } from "@mui/material";
import {
  Facebook,
  Twitter,
  Instagram,
  YouTube,
  LinkedIn,
} from "@mui/icons-material";
import { useSidebar } from "../context/SidebarProvider";
import { useResponsive } from "../hooks/useResponsive";
import locales from "../locales";

export default function Footer() {
  const { widthSidebar } = useSidebar();
  const { isMobile, isDesktop } = useResponsive();
  const {sidebar: t_sidebar} = locales['vi']
  return (
    <Box
      component="footer"
      bgcolor="background.default"
      px={3}
      py={2}
      borderRadius={3}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      flexWrap="wrap"
      mt={1}
      sx={{
        ml: !isDesktop ? 0 : `${widthSidebar}px`,
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent={{ xs: "center", md: "unset" }}
        gap={{xs: 1, md: 3}}
        flexWrap="wrap"
      >
        <Typography textAlign={"start"} variant="body2" color="text.secondary">
          {'Copyright © 2025 ' + t_sidebar.siteName}
        </Typography>
        <Stack direction="row" spacing={2}>
          <Link
            href="#"
            underline="none"
            fontSize="14px"
          >
            Privacy Policy
          </Link>
          <Link
            href="#"
            underline="none"
            fontSize="14px"
          >
            Term and conditions
          </Link>
          <Link
            href="#"
            underline="none"
            fontSize="14px"
          >
            Contact
          </Link>
        </Stack>
      </Stack>

      <Stack
        direction="row"
        justifyContent={{ xs: "center", md: "flex-end" }}
        flex={1}
        spacing={1}
        mt={{xs: 1, md: 0}}
      >
        <IconButton size="small" color="inherit">
          <Facebook fontSize="small" />
        </IconButton>
        <IconButton size="small" color="inherit">
          <Twitter fontSize="small" />
        </IconButton>
        <IconButton size="small" color="inherit">
          <Instagram fontSize="small" />
        </IconButton>
        <IconButton size="small" color="inherit">
          <YouTube fontSize="small" />
        </IconButton>
        <IconButton size="small" color="inherit">
          <LinkedIn fontSize="small" />
        </IconButton>
      </Stack>
    </Box>
  );
}
