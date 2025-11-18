// context/SidebarContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { useResponsive } from "../hooks/useResponsive";
import {
  SIDEBAR_WIDTH_COLLAPSED,
  SIDEBAR_WIDTH_EXPANDED,
} from "../constants/layout";

interface SidebarContextType {
  isExpandedSidebar: boolean;
  toggleExpandedSidebar: () => void;
  widthSidebar: number;
  isOpenDrawer: boolean;
  toggleOpenDrawer: () => void;
  isHoverSidebar: boolean;
  toggleHoverSidebar: (value: boolean) => void;
  isTopSideBar: boolean;
  toggleTopSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);
let hoverTimeout: NodeJS.Timeout;

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const { isDesktop } = useResponsive();
  const storedExpanded = localStorage.getItem("sidebar_expanded");
  const storedTopSide = localStorage.getItem("sidebar_top");
  const [isExpanded, setIsExpanded] = useState(storedExpanded === "true");
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isHoverSidebar, setIsHoverSidebar] = useState(false);
  const [isTopSideBar, setIsTopSidebar] = useState(storedTopSide === "true");

  const toggleExpanded = () => {
    const newState = !isExpanded;
    setIsExpanded(newState);
    setIsHoverSidebar(false);
    localStorage.setItem("sidebar_expanded", JSON.stringify(newState));
  };
  const toggleOpenDrawer = () => setIsOpenDrawer((prev) => !prev);
  const toggleHoverSidebar = useCallback(
    (hovering: boolean) => {
      if (hoverTimeout) clearTimeout(hoverTimeout);

      hoverTimeout = setTimeout(() => {
        // tránh hover nếu đang expanded bằng tay
        if (!isExpanded && hovering !== isHoverSidebar) {
          setIsHoverSidebar(hovering);
        }
      }, 200);
    },
    [isHoverSidebar, isExpanded]
  );
  const toggleTopSidebar = () => {
    if (!isDesktop) return;
    const newState = !isTopSideBar;
    setIsTopSidebar(newState);
    localStorage.setItem("sidebar_top", JSON.stringify(newState));
  };

  const widthSidebar = isTopSideBar
    ? 0
    : isExpanded || isHoverSidebar
    ? SIDEBAR_WIDTH_EXPANDED
    : SIDEBAR_WIDTH_COLLAPSED;

  useEffect(() => {
    if (!isDesktop) {
      setIsOpenDrawer(true);
      setIsTopSidebar(false);
    }
  }, [isDesktop]);

  useEffect(() => {
    return () => {
      if (hoverTimeout) clearTimeout(hoverTimeout);
    };
  }, []);

  return (
    <SidebarContext.Provider
      value={{
        isExpandedSidebar: isExpanded,
        toggleExpandedSidebar: toggleExpanded,
        widthSidebar,
        isOpenDrawer,
        toggleOpenDrawer,
        isHoverSidebar,
        toggleHoverSidebar,
        isTopSideBar,
        toggleTopSidebar,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = (): SidebarContextType => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};
