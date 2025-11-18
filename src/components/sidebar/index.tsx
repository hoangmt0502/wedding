import { useEffect, useState } from "react";
import LeftSidebar from "./LeftSidebar";
import TopSidebar from "./TopSidebar";
import { useSidebar } from "../../context/SidebarProvider";
import { menuConfig } from "../../constants/sidebar";
import { ISidebarMenuItem } from "../../interfaces/sidebar";

export default function Sidebar() {
  const { isTopSideBar } = useSidebar();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const onToggleMenu = (menuKey?: string) => {
    menuKey && setActiveMenu((prev) => (prev === menuKey ? null : menuKey));
  };

  useEffect(() => {
    if (isTopSideBar) {
      setActiveMenu(null);
      return;
    }

    const findActiveKey = (
      items: ISidebarMenuItem[],
      currentPath: string
    ): string | null => {
      for (const item of items) {
        if (item.children) {
          const found = findActiveKey(item.children, currentPath);
          if (found) return item.key ?? null;
        }
        if (item.path === currentPath) {
          return item?.activeSideKey || item.path;
        }
      }
      return null;
    };

    const newActiveMenu = findActiveKey(menuConfig, location.pathname);
    if (newActiveMenu !== null) {
      setActiveMenu(newActiveMenu);
    }
  }, [location.pathname, isTopSideBar]);

  if (isTopSideBar) {
    return (
      <TopSidebar
        activeMenu={activeMenu}
        onToggleMenu={onToggleMenu}
        onSetActiveMenu={setActiveMenu}
      />
    );
  }
  return (
    <LeftSidebar
      activeMenu={activeMenu}
      onToggleMenu={onToggleMenu}
      onSetActiveMenu={setActiveMenu}
    />
  );
}
