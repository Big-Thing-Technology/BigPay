'use client'

import { CookiesProvider } from 'react-cookie'
import 'react-toastify/dist/ReactToastify.css'
import { ConfigProvider } from '@/config-context'
import ThemeCustomization from '@/themes'
import { ToastContainer } from 'react-toastify'
import { AuthProvider } from '@/module/provider/AuthProvider'
import Locales from '@/components/Locales'
import { SnackbarProvider } from 'notistack'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CookiesProvider defaultSetOptions={{ path: '/' }}>
      <ConfigProvider>
        <ThemeCustomization>
          <SnackbarProvider
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            maxSnack={3}
            dense
          >
            <Locales>
              <ToastContainer />
              <AuthProvider>{children}</AuthProvider>
            </Locales>
          </SnackbarProvider>
        </ThemeCustomization>
      </ConfigProvider>
    </CookiesProvider>
  )
}
