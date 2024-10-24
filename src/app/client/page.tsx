'use client'

import { useSearchParams } from 'next/navigation'
import ComingSoonPage from '@/components/ComingSoon'

export default function ClientPage() {
  const searchParams = useSearchParams()

  const orgId = searchParams.get('orgId')
  return (
    <>
      This is client page: {orgId}
      <ComingSoonPage />
    </>
  )
}
