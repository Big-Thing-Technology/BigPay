import { PipelineResult, validate } from '@bigthing/backend-utils'
import { AcceptInvitationReq, AcceptInvitationValidator } from './acceptInvitationReq'
import { decodedFirebaseToken } from '../../shared/decodedFirebaseToken'
import prisma from '../../../prisma/instance'

/**
 * Accept organization invitation
 * Return fail if invitation is expired
 */
export const acceptInvitation = async ({
  token,
  req,
}: {
  token: string
  req: AcceptInvitationReq
}): Promise<PipelineResult<{} | null>> => {
  const validateRes = await validate(req, AcceptInvitationValidator)
  if (validateRes.isError) {
    return {
      data: {
        ...validateRes.error,
      },
      message: 'invalidRequest',
      status: 400,
    }
  }

  const { uid } = await decodedFirebaseToken(token)
  const foundUser = await prisma.user.findUnique({ where: { username: uid as string } })
  if (!foundUser) {
    return {
      status: 404,
      message: 'userNotFound',
      data: null,
    }
  }

  const { invitationToken } = req
  const foundOrgPending = await prisma.pendingOrgMember.findUnique({ where: { invitationToken } })
  if (!foundOrgPending) {
    return {
      status: 404,
      message: 'invitationNotFound',
      data: null,
    }
  }
  // Return if invitation is expired
  if (new Date() < foundOrgPending.expiredDate) {
    return {
      status: 400,
      message: 'invitationExpired',
      data: null,
    }
  }

  // Concurrently, delete pending invitation and add new member into organization
  await prisma.$transaction(async (prisma) => {
    await prisma.pendingOrgMember.delete({ where: { invitationToken } })
    return prisma.orgMember.create({
      data: {
        isOwner: false,
        organization: { connect: { id: foundOrgPending.organizationId } },
        user: { connect: { email: foundOrgPending.email } },
      },
    })
  })

  return {
    status: 200,
    message: 'acceptInvitationSuccessfully',
    data: null,
  }
}
