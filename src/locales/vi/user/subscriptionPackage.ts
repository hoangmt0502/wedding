const subscriptionPackage = {
  // Title actions
  title: 'Gói đăng ký',
  add: 'Thêm gói đăng ký',
  edit: 'Chỉnh sửa',
  view: 'Xem chi tiết',
  delete: 'Xóa',
  searchPlaceholder: 'Tìm kiếm gói đăng ký...',
  itemSelected: 'gói đăng ký được chọn',

  // Table
  ordinal: 'STT',
  name: 'Tên gói',
  price: "Giá",
  originalPrice: "Giá gốc",
  salePrice: "Giá khuyến mãi",
  monthOfUse: "Tháng sử dụng",
  monthOfDiscount: "Tháng khuyến mãi",
  activeCount: "Số tài khoản đã kích hoạt",
  revenue: "Doanh thu",
  note: "Ghi chú",
  actions: 'Hành động',

  // Form
  editTitle: 'Chỉnh sửa gói đăng ký',
  addTitle: 'Thêm gói đăng ký',
  addNew: 'Thêm mới',
  update: 'Cập nhật',
  cancel: 'Hủy',

  // Detail
  detailTitle: 'Chi tiết gói đăng ký',

  // Notifications
  deleteConfirmation: 'Bạn có chắc chắn muốn xóa gói đăng ký này?',
  deleteSuccess: 'Xóa gói đăng ký thành công.',
  deleteError: 'Xóa gói đăng ký thất bại. Vui lòng thử lại.',
  addSuccess: 'Thêm gói đăng ký thành công.',
  addError: 'Thêm gói đăng ký thất bại. Vui lòng thử lại.',
  updateSuccess: 'Cập nhật gói đăng ký thành công.',
  updateError: 'Cập nhật gói đăng ký thất bại. Vui lòng thử lại.',
  searchSuccess: 'Tìm kiếm thành công.',
  searchError: 'Tìm kiếm thất bại. Vui lòng thử lại.',
  getError: 'Lấy thông tin gói đăng ký thất bại. Vui lòng thử lại.',
  getSuccess: 'Lấy thông tin gói đăng ký thành công.',

  // Message warning
  selectOneToView: 'Vui lòng chọn một gói đăng ký!',
  notFound: 'Không tìm thấy gói đăng ký!',
  selectOneToEdit: 'Vui lòng chọn gói đăng ký để sửa!',
  selectToDelete: 'Chọn gói đăng ký để xóa!',
  confirmDeleteTitle: 'Xác nhận xóa',
  confirmDeleteContent: (name: string) => `Xác định xoá gói đăng ký: ${name}?`,
  deletedSuccess: (name: string) => `Xoá thành công gói đăng ký: ${name}.`,

  // Dialog title
  dialogWarning: 'Cảnh báo',
  dialogError: 'Lỗi',
  dialogSuccess: 'Thành công',
  dialogConfirm: 'Xác nhận',
  dialogUpdate: 'Cập nhật',
  dialogAdd: 'Thêm mới',
};

export default subscriptionPackage;
