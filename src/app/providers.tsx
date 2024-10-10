'use client'

import { CookiesProvider } from 'react-cookie'
import 'react-toastify/dist/ReactToastify.css'
import { ConfigProvider } from '@/config-context'
import ThemeCustomization from '@/themes'
import { ToastContainer } from 'react-toastify'
import { AuthProvider } from '@/module/provider/AuthProvider'
import Locales from '@/components/Locales'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CookiesProvider defaultSetOptions={{ path: '/' }}>
      <ConfigProvider>
        <ThemeCustomization>
          <Locales>
            <ToastContainer />
            <AuthProvider>{children}</AuthProvider>
          </Locales>
        </ThemeCustomization>
      </ConfigProvider>
    </CookiesProvider>
  )
}
