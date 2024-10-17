const common = {
  login: 'Login',
  manage: 'Manage',
  signIn: 'Sign in',
  password: 'Password',
  enterPassword: 'Enter your password',
  forgotPassword: 'Forgot password',
  menu: 'Menu',
  rename: 'Rename',
  typedescription: 'Type description',
  title: 'Title',
  description: 'Description',
  submit: 'Submit',
  star: 'Star',
  watch: 'Watch',
  tracking: 'Tracking',
  mute: 'Mute',
  close: 'Close',
  add: 'Add',
  name: 'Name',
  test: 'Test',
  developing: 'Developing',
  email: 'Email',
  action: 'Action',
  active: 'Active',
  inactive: 'Inactive',
  available: 'Available',
  deleted: 'Deleted',
  notifications: 'Notifications',
  viewAll: 'View all',
  logout: 'Log out',
  username: 'Username',
  selectLanguage: 'Select language',
  home: 'Home',
  users: 'Users',
  roleAPermisstion: 'Roles and Permission',
  role: 'Role',
  detail: 'Detail',
  accountsetting: 'Account Setting',
  create: 'Create',
  update: 'Update',
  list: 'List',
  language: 'Language',
  profile: 'Profile',
  typeFullName: 'Enter full name',
  userName: 'User name',
  haveAccount: "Don't have an account?",
  emailPH: 'Enter username or email address',
  passwordPH: 'Enter password',
  textPrivacy:
    'By signing in, you confirm to have read Kanban.vn{replace}and agree to the{replace}.',
  privacyPolicy: 'Privacy Policy',
  termService: 'Terms of Service',
  resetPassword: 'Reset password',
  backLogin: 'Back to login',
  comfirm: 'Comfirm',
}

const signInScreen = {
  welcomeToTheBigpay: 'Welcome to the BigPay',
  signInWithYourAccount: 'Sign in with your account.',
  signInWithGoogle: 'Sign In with Google',
  signInWithFacebook: 'Sign In with Facebook',
  signInWithTwitter: 'Sign In with Twitter',
}

const startUpScreen = {
  createOrganization: 'Create First Organization',
  organizationName: 'Organization name',
  enterOrganizationName: 'Enter organization name',
  createOrganizationBtn: 'Create Organization',
  createFirstOrganizationSuccessfully: 'Create first organization successfully!',
}

const notification = {
  noUnreadNotification: 'No Unread Notification Yet!',
  noNotificationsMessage: 'You have no notifications right now. Come back later.',
}

const error = {
  backToHome: 'Back to Home',

  // 403 Screen
  title_403: 'Forbidden',
  desc_403: 'You do not have authority to access this resource',

  // 404 Screen
  title_404: 'Not Found',
  desc_404: 'This page not available',

  // login error:
  deactivatedUser: 'Your account have been deactivated',
  deletedUser: 'Your account have been deleted',
  notFoundUsername: 'Username not found',
  passwordNotMatch: 'Wrong password',
  eSignInTitle: 'Sign In Error',
  wrongLoginOtp: 'Wrong OTP',
}

export const en = {
  ...common,
  ...notification,
  ...error,
  ...signInScreen,
  ...startUpScreen,
}
