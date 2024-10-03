'use client'

import { CookiesProvider } from 'react-cookie'
import 'react-toastify/dist/ReactToastify.css'
import { ConfigProvider } from '@/config-context'
import ThemeCustomization from '@/themes'
import { ToastContainer } from 'react-toastify'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CookiesProvider defaultSetOptions={{ path: '/' }}>
      <ConfigProvider>
        <ThemeCustomization>
          <ToastContainer />
          {children}
        </ThemeCustomization>
      </ConfigProvider>
    </CookiesProvider>
  )
}
