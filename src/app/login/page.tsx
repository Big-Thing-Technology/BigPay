'use client'

import { AuthWrapper } from '@/module/auth/auth-wrapper'
import { AuthLayout } from '@/module/auth/auth-layout'
import LoginForm from '@/module/auth/login-form'

export default function LoginPage() {
  return (
    <AuthLayout>
      <AuthWrapper>
        <LoginForm />
      </AuthWrapper>
    </AuthLayout>
  )
}
