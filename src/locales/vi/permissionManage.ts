const permissionManage = {
  detailPermission: "Chi tiết quyền",

  labelActionBar: "Quyền được chọn",
  pleaseSelectOneView: "Vui lòng chọn một quyền để xem chi tiết!",
  pleaseSelectOneEdit: "Vui lòng chọn một quyền để chỉnh sửa!",
  pleaseSelectOneDelete: "Vui lòng chọn ít nhất một quyền để xóa!",
  notFoundPermission: "Không tìm thấy thông tin quyền!",

  deleteNoice: (name: string) => `Xác nhận xoá quyền: ${name}?`,
  deletedSuccess: (name: string) => `Xoá thành công quyền: ${name}.`,

  updateSuccess: "Thông tin quyền đã được cập nhật.",
  createSuccess: "Một quyền mới đã được tạo.",

  ordinal: 'STT',
  name: 'Tên quyền',
  description: 'Mô tả',
  actions: 'Hành động',
}

export default permissionManage;