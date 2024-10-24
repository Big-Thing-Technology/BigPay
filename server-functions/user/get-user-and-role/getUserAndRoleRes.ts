import { Prisma } from '@prisma/client'

export type GetUserAndRoleRes = Prisma.UserGetPayload<{
  include: { orgMember: true }
}>
