import { IconButton, Tooltip } from "@mui/material";
import { useSidebar } from "../../context/SidebarProvider";
import { ViewSidebar, ViewStream } from "@mui/icons-material";

export default function TogglePosition() {
  const { isTopSideBar, toggleTopSidebar } = useSidebar();
  return (
    <Tooltip title={isTopSideBar ? "Left Sidebar" : "Top Sidebar"}>
      <IconButton onClick={toggleTopSidebar}>
        {isTopSideBar ? <ViewSidebar /> : <ViewStream />}
      </IconButton>
    </Tooltip>
  );
}
