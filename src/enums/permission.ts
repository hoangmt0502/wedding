// File
export enum PermissionFile {
  ViewFiles = "view_files", // Xem file
  CreateFiles = "create_files", // Tạo file
  UpdateFiles = "update_files", // Sửa file
  DeleteFiles = "delete_files", // Xóa file
}

// Group
export enum PermissionGroup {
  ViewGroups = "view_groups", // Xem nhóm
  CreateGroups = "create_groups", // Tạo nhóm
  UpdateGroups = "update_groups", // Sửa nhóm
  DeleteGroups = "delete_groups", // Xóa nhóm
  AssignGroups = "assign_groups", // Gán nhóm người dùng
  RemoveGroups = "remove_groups", // Xóa nhóm người dùng
}

// Permissions
export enum PermissionPermissions {
  ViewPermissions = "view_permissions", // Xem danh sách phân quyền
  CreatePermissions = "create_permissions", // Tạo phân quyền
  UpdatePermissions = "update_permissions", // Sửa phân quyền
  DeletePermissions = "delete_permissions", // Xóa phân quyền
}

// Users
export enum PermissionUsers {
  ViewUsers = "view_users", // Xem danh sách người dùng
  UpdateUsers = "update_users", // Sửa người dùng
  DeleteUsers = "delete_users", // Xóa người dùng
  CreateUsers = "create_users", // Tạo người dùng
  AccessUsers = "access_users", // Truy người dùng
}

// Access
export enum PermissionAccess {
  AccessFeatures = "access_features", // Truy cập chức năng
  AccessReports = "access_reports", // Truy cập báo cáo
  AccessLedgers = "access_ledgers", // Truy cập sổ sách
  AccessPharmacy = "access_pharmacy", // Quản lý chi nhánh
  AccessCatalogs = "access_catalogs", // Truy cập danh mục
}
