// next
import { Roboto } from 'next/font/google'

// types
import { DefaultConfigProps } from '@/types/config'

// ==============================|| THEME CONSTANT ||============================== //

export const APP_CLIENT_PATH = '/client'
export const APP_ADMIN_PATH = '/admin'
export const APP_LOGIN_PATH = '/login'
export const APP_STARTUP_PATH = '/startup'
export const APP_LANDING_PATH = '/'
export const APP_ACCEPT_INVITATION_PATH = '/accept-invitation'
export const DRAWER_WIDTH = 280
export const MINI_DRAWER_WIDTH = 90
export const HEADER_HEIGHT = 74
const roboto = Roboto({
  subsets: ['latin'],
  fallback: ['sans-serif'],
  weight: ['300', '400', '500', '700'],
  adjustFontFallback: false,
})

export enum ThemeMode {
  LIGHT = 'light',
  DARK = 'dark',
  AUTO = 'auto',
}

export enum NavActionType {
  FUNCTION = 'function',
  LINK = 'link',
}

// ==============================|| THEME CONFIG ||============================== //

const config: DefaultConfigProps = {
  fontFamily: roboto.style.fontFamily,
  i18n: 'en',
  menuCaption: true,
  miniDrawer: false,
  container: false,
  mode: ThemeMode.LIGHT,
  presetColor: 'default',
  themeContrast: false,
}

export default config
