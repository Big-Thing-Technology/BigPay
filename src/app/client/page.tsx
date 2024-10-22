'use client'

import { useSearchParams } from 'next/navigation'

export default function ClientPage() {
  const searchParams = useSearchParams()

  const orgId = searchParams.get('orgId')
  return <>This is client page: {orgId}</>
}
