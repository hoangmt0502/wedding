const groups = {
  // Title actions
  title: 'Vai trò',
  add: 'Thêm vai trò',
  edit: 'Chỉnh sửa',
  view: 'Xem chi tiết',
  delete: 'Xóa',
  searchPlaceholder: 'Tìm kiếm vai trò...',
  itemSelected: 'Thông tin cơ sở được chọn',

  // Table
  ordinal: 'STT',
  name: 'Tên cơ sở',
  description: 'Mô tả',
  actions: 'Hành động',

  // Form
  editTitle: 'Chỉnh sửa vai trò',
  addTitle: 'Thêm vai trò',

  logoUpload: "Tải lên ảnh logo",
  uploadImageDescription: 'Tải lên hình ảnh (tối đa 5MB, định dạng: jpg, png, jpeg)',

  company: "Công ty",
  nameRequired: 'Tên không được để trống',
  address: "Địa chị",
  phoneNumber: "SĐT",
  taxCode: "Mã số thuế",
  manager: "Phụ trách chuyên môn",
  code: "Mã cơ sở",
  linkedAccount: "Tài khoản liên thông",
  email: "Email",
  fax: "Fax",
  password: "Mật khẩu",
  province: "Tỉnh/Thành phố",
  district: "Quận/Huyện",
  ward: "Phường/Xã",
  record: "Ghi",
  skip: "Bỏ qua",
  addNew: 'Thêm mới',
  update: 'Cập nhật',
  save: 'Lưu lại',
  cancel: 'Hủy',

  // Detail
  detailTitle: 'Chi tiết vai trò',

  // Notifications
  deleteConfirmation: 'Bạn có chắc chắn muốn xóa vai trò này?',
  deleteSuccess: 'Xóa vai trò thành công.',
  deleteError: 'Xóa vai trò thất bại. Vui lòng thử lại.',
  addSuccess: 'Thêm vai trò thành công.',
  addError: 'Thêm vai trò thất bại. Vui lòng thử lại.',
  updateSuccess: 'Cập nhật vai trò thành công.',
  updateError: 'Cập nhật vai trò thất bại. Vui lòng thử lại.',
  searchSuccess: 'Tìm kiếm thành công.',
  searchError: 'Tìm kiếm thất bại. Vui lòng thử lại.',
  getError: 'Lấy thông tin vai trò thất bại. Vui lòng thử lại.',
  getSuccess: 'Lấy thông tin vai trò thành công.',
  removePermissionSuccess: 'Gỡ quyền khỏi vai trò thành công.',

  // Message warning
  selectOneToView: 'Vui lòng chọn một vai trò!',
  unitNotFound: 'Không tìm thấy vai trò!',
  selectOneToEdit: 'Vui lòng chọn vai trò để sửa!',
  selectToDelete: 'Chọn vai trò để xóa!',
  confirmDeleteTitle: 'Xác nhận xóa',
  confirmDeleteContent: (count: number) => `Xóa ${count} vai trò?`,
  deletedSuccess: (count: number) => `Đã xóa ${count} vai trò.`,
}

export default groups
