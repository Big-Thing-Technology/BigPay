import { InviteUserReq, InviteUserValidator } from './inviteUserReq'
import { generateToken, logger, PipelineResult, sendEmail, validate } from '@bigthing/backend-utils'
import { decodedFirebaseToken } from '../../shared/decodedFirebaseToken'
import prisma from '../../../prisma/instance'

export const inviteUser = async ({
  token,
  req,
}: {
  token: string
  req: InviteUserReq
}): Promise<PipelineResult<{} | null>> => {
  const validateRes = await validate(req, InviteUserValidator)
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
  if (!foundUser.isAdmin) {
    return {
      status: 403,
      message: 'forbidden',
      data: null,
    }
  }

  // Find user was invited into this organization
  const findPendingUser = await prisma.pendingOrgMember.findMany({
    where: { email: req.email, organizationId: req.organizationId },
  })
  if (findPendingUser.length > 0) {
    return {
      status: 200,
      message: 'invitationSent',
      data: null,
    }
  }
  const invitationToken = generateToken(req.organizationId, process.env.SECRET_USER_KEY || '')
  const expiredDate = new Date()
  expiredDate.setDate(expiredDate.getDate() + 7)
  await prisma.pendingOrgMember.create({
    data: {
      email: req.email,
      organization: { connect: { id: req.organizationId } },
      invitationToken,
      expiredDate,
    },
  })

  const sendEmailResult = await sendEmail({
    content: `Test From BigPay. Token: ${invitationToken}`,
    from: process.env.EMAIL_SYSTEM || '',
    to: [req.email],
    RESEND_API_KEY: process.env.EMAIL_API_KEY || '',
    subject: 'Invitation to BigPay Organization',
  })
  if (!sendEmailResult) {
    logger.error('failed', 'send email failed')
    return {
      status: 400,
      message: 'retryInviteUser',
      data: null,
    }
  }

  return {
    status: 200,
    message: 'sendInvitationEmailSuccessfully',
    data: null,
  }
}
