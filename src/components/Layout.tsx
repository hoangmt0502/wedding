import { ReactNode, useState } from "react";
import { Box } from "@mui/material";
import Header from "./Header";
import { HEADER_HEIGHT, SIDEBAR_HEIGHT_TOP } from "../constants/layout";
import Sidebar from "./sidebar/index";
import { useSidebar } from "../context/SidebarProvider";
import Footer from "./Footer";
import SettingsSidebar from "./sidebar/RightSidebar";
import { useResponsive } from "../hooks/useResponsive";
import '@fancyapps/ui/dist/fancybox/fancybox.css';

export default function Layout({ children }: { children: ReactNode }) {
	const { isTopSideBar } = useSidebar();
	const [openRightSidebar, setOpenRightSidebar] = useState<boolean>(false);
  const { isMobile } = useResponsive();

	return (
		<Box
			sx={{
				pt: `${isTopSideBar ? HEADER_HEIGHT + SIDEBAR_HEIGHT_TOP : HEADER_HEIGHT
					}px`,
				pr: 1,
				pl: isTopSideBar || isMobile ? 1 : 0,
			}}
		>
			<Header toggleSetting={() => setOpenRightSidebar(prev => !prev)} />
			<Box sx={{ display: "flex" }}>
				{/* Sidebar */}
				<Sidebar />
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
        <SettingsSidebar
          open={openRightSidebar}
          onClose={() => setOpenRightSidebar((prev) => !prev)}
        />
      </Box>
      <Footer />
    </Box>
  );
}
