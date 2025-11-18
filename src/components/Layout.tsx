import { ReactNode, useState } from "react";
import { Box } from "@mui/material";
import { useResponsive } from "../hooks/useResponsive";
import '@fancyapps/ui/dist/fancybox/fancybox.css';

export default function Layout({ children }: { children: ReactNode }) {
  const { isMobile } = useResponsive();

	return (
		<Box
			sx={{
			}}
		>
			<Box sx={{ display: "flex" }}>
        {/* Main Content */}
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            overflowX:"hidden",
            mt: 1,
          }}
        >
          {/* Page Content */}
          <Box>{children}</Box>
        </Box>
      </Box>
    </Box>
  );
}
