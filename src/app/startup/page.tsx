import React from 'react'
import { StartUpForm } from '@/module/startup/start-up-form'
import { AuthWrapper } from '@/module/auth/auth-wrapper'

export default function StartupPage() {
  return (
    <AuthWrapper>
      <StartUpForm />
    </AuthWrapper>
  )
}
