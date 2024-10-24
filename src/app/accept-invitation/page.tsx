import { AuthLayout } from '@/module/auth/auth-layout'
import AcceptInvitationForm from '@/module/organization/accept-invitation'
import { AuthWrapper } from '@/module/auth/auth-wrapper'

export default function AcceptInvitationPage() {
  return (
    <AuthLayout slider={false}>
      <AuthWrapper>
        <AcceptInvitationForm />
      </AuthWrapper>
    </AuthLayout>
  )
}
