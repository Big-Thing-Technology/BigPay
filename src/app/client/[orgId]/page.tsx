'use client'

export default function ClientPage({ params }: { params: { orgId: string } }) {
  return <>This is client page: {params.orgId}</>
}
