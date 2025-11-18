import { menuConfig } from "../constants/sidebar";
import locales from "../locales";
const {sidebar: t_sidebar} = locales['vi']

type TResultPageTitle = {
  title?: string;
  subTitle?: string;
};

export const getPageTitle = (pathname: string): TResultPageTitle => {

  let result: TResultPageTitle = { title: t_sidebar.siteName };

  const findInMenu = (
    menus: typeof menuConfig,
    parentLabel?: string,
    hideTitle?: boolean
  ): boolean => {
    for (const item of menus) {
      if (item.path === pathname) {
        const label = (item?.title || item.label)
        result = {
          title: hideTitle ? label : (parentLabel || label),
          subTitle: !!parentLabel && !hideTitle ? label : undefined,
        };
        return true;
      }

      if (item.children) {
        const found = findInMenu(item.children, item.label, item?.hideHeader);
        if (found) return true;
      }
    }
    return false;
  };

  findInMenu(menuConfig);
  return result;
};
