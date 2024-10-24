import { AuthLayout } from '@/module/auth/auth-layout'

export default function ForgotPasswordLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <AuthLayout slider={false}>{children}</AuthLayout>
}
