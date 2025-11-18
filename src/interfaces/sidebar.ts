import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

export interface ISidebarMenuItem {
  label: string;
  title?: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  path?: string;
  key?: string;
  permission?: string;
  isPanelsSide?: boolean;
  isTopBar?: boolean;
  children?: ISidebarMenuItem[];
  activeSideKey?: string;
  hideHeader?: boolean;
}

export type ISidebarMenu = ISidebarMenuItem[];
