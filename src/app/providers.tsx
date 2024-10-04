'use client'

import { CookiesProvider } from 'react-cookie'
import 'react-toastify/dist/ReactToastify.css'
import { ConfigProvider } from '@/config-context'
import ThemeCustomization from '@/themes'
import { ToastContainer } from 'react-toastify'
import { AuthProvider } from '@/module/provider/AuthProvider'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CookiesProvider defaultSetOptions={{ path: '/' }}>
      <ConfigProvider>
        <ThemeCustomization>
          <ToastContainer />
          <AuthProvider>{children}</AuthProvider>
        </ThemeCustomization>
      </ConfigProvider>
    </CookiesProvider>
  )
}
