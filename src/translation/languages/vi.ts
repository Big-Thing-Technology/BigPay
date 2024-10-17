const common = {
  login: 'Đăng nhập',
  manage: 'Quản Lý',
  signIn: 'Đăng nhập',
  password: 'Mật khẩu',
  enterPassword: 'Nhập mật khẩu của bạn',
  forgotPassword: 'Quên mật khẩu',
  menu: 'Menu',
  rename: 'Đổi tên',
  typedescription: 'Nhập mô tả',
  title: 'Tiêu đề',
  description: 'Mô tả',
  submit: 'Gửi',
  star: 'Đánh dấu',
  watch: 'Xem',
  tracking: 'Theo dõi',
  mute: 'Tắt tiếng',
  close: 'Đóng',
  add: 'Thêm',
  name: 'Tên',
  test: 'Kiểm tra',
  developing: 'Phát triển',
  email: 'Email',
  action: 'Hành động',
  active: 'Kích hoạt',
  inactive: 'Không kích hoạt',
  available: 'Có sẵn',
  deleted: 'Đã xóa',
  logout: 'Đăng xuất',
  username: 'Tên người dùng',
  notifications: 'Thông báo',
  viewAll: 'Xem tất cả',
  selectLanguage: 'Chọn ngôn ngữ',
  home: 'Trang chủ',
  users: 'Người dùng',
  roleAPermisstion: 'Vai trò và Quyền hạn',
  role: 'Vai trò',
  detail: 'Chi tiết',
  accountsetting: 'Cài đặt tài khoản',
  create: 'Tạo mới',
  update: 'Cập nhật',
  list: 'Danh sách',
  language: 'Ngôn ngữ',
  profile: 'Hồ sơ',
  typeFullName: 'Nhập tên đầy đủ',
  userName: 'Tên tài khoản',
  haveAccount: 'Chưa có tài khoản?',
  emailPH: 'Nhập tên người dùng hoặc địa chỉ email',
  passwordPH: 'Nhập mật khẩu',
  textPrivacy:
    'Bằng cách đăng nhập, bạn xác nhận đã đọc{replace}của BigPay.vn và đồng ý với{replace}.',
  privacyPolicy: 'Chính sách quyền riêng tư',
  termService: 'Điều khoản dịch vụ',
  resetPassword: 'Đặt lại mật khẩu',
  backLogin: ' Quay lại đăng nhập',
  comfirm: 'Xác nhận',
}

const signInScreen = {
  welcomeToTheBigpay: 'Chào Mừng Tới Ví Điện Tử BigPay',
  signInWithYourAccount: 'Đăng nhập bằng tài khoản của bạn.',
  signInWithGoogle: 'Đăng nhập bằng Google',
  signInWithFacebook: 'Đăng nhập bằng Facebook',
  signInWithTwitter: 'Đăng nhập bằng Twitter',
  loginSuccessfully: 'Đăng nhập thành công',
}

const startUpScreen = {
  createOrganization: 'Tạo Tổ Chức Đầu Tiên',
  organizationName: 'Tên tổ chức',
  enterOrganizationName: 'Nhập tên của tổ chức',
  createOrganizationBtn: 'Tạo tổ chức',
  createFirstOrganizationSuccessfully: 'Tạo tổ chức đầu tiên thành công!',
}

const notification = {
  noUnreadNotification: 'Chưa có thông báo chưa đọc!',
  noNotificationsMessage: 'Bạn hiện không có thông báo nào. Hãy quay lại sau.',
}

const error = {
  backToHome: 'Quay Về Trang Chủ',

  // 403 Screen
  title_403: 'Cấm Truy Cập',
  desc_403: 'Bạn không có quyền truy cập',

  // 404 Screen
  title_404: 'Không Tồn Tại',
  desc_404: 'Trang truy cập không tồn tại',

  // login error:
  deactivatedUser: 'Tài khoản bị vô hiệu hóa',
  deletedUser: 'Tài khoản đã bị xóa',
  notFoundUsername: 'Tài khoản không tồn tại',
  passwordNotMatch: 'Sai mật khẩu',
  eSignInTitle: 'Không Thể Đăng Nhập',
  wrongLoginOtp: 'Sai mã OTP',
  errorLoginPleaseReload: 'Lỗi đăng nhập. Vui lòng tải lại trang',
}

export const vi = {
  ...common,
  ...notification,
  ...error,
  ...signInScreen,
  ...startUpScreen,
}
