
import login from "./login";
import common from "./common";
import { helper } from "./helper";
import sidebar from "./sidebar";
import userManage from "./userManage";
import roleManage from "./roleManage";
import permissionManage from "./permissionManage";
import groups from './user/groups';
import subscriptionPackage from "./user/subscriptionPackage";

const vi = {
  login,
  user: {
    groups,
    subscriptionPackage,
  },
  userManage,
  roleManage,
  permissionManage,
  sidebar,
  common,
  helper,
}

export default  vi;
