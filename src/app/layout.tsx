import type { Metadata } from 'next'
import './globals.css'
import { Providers } from '@/app/providers'

export const metadata: Metadata = {
  title: 'BigPay.vn',
  description: 'BigPay E-Wallet SaaS',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="logo/3.svg" sizes="any" />
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
