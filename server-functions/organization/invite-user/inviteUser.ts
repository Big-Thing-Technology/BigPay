import { InviteUserReq, InviteUserValidator } from './inviteUserReq'
import { generateToken, logger, PipelineResult, sendEmail, validate } from '@bigthing/backend-utils'
import { decodedFirebaseToken } from '../../shared/decodedFirebaseToken'
import prisma from '../../../prisma/instance'

/**
 * Invite registered or non-registered user into the organization.
 * Only owner of organization can invite.
 * return if request user is member already
 * Send email with invite link into fellow email.
 * @param token
 * @param req
 */
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

  // Check user is existed
  const { uid } = await decodedFirebaseToken(token)
  const foundUser = await prisma.user.findUnique({ where: { username: uid as string } })
  if (!foundUser) {
    return {
      status: 404,
      message: 'userNotFound',
      data: null,
    }
  }

  const foundOrganization = await prisma.organization.findUnique({
    where: { id: req.organizationId },
  })

  // Only owner can invite new user
  const foundOrgMembers = await prisma.orgMember.findMany({
    where: { organizationId: foundOrganization?.id, userId: foundUser.id },
  })
  if (!foundOrgMembers[0].isOwner) {
    return {
      status: 400,
      message: 'onlyOwnerCanInvite',
      data: null,
    }
  }

  const existOrgMember = await prisma.orgMember.findMany({
    where: { organizationId: foundOrganization?.id, user: { email: req.email } },
  })
  if (existOrgMember) {
    return {
      status: 200,
      message: 'userAlreadyMember',
      data: null,
    }
  }

  // Resent email invite
  const findPendingUser = await prisma.pendingOrgMember.findMany({
    where: { email: req.email, organizationId: req.organizationId },
  })
  const invitationToken = generateToken(req.email, process.env.SECRET_TOKEN_KEY || '')
  const expiredDate = new Date()
  if (findPendingUser.length > 0) {
    await prisma.pendingOrgMember.update({
      where: { id: findPendingUser[0].id },
      data: { invitationToken, expiredDate },
    })
    const sendEmailResult = await sendEmail({
      content: `Test From BigPay. Token: ${invitationToken}`,
      from: process.env.EMAIL_SYSTEM || '',
      to: [req.email],
      RESEND_API_KEY: process.env.EMAIL_API_KEY || '',
      subject: `[BigPay] Invitation to Organization - ${foundOrganization?.name}`,
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
      message: 'resendInvitationEmailSuccessfully',
      data: null,
    }
  }
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
    subject: `[BigPay] Invitation to Organization - ${foundOrganization?.name}`,
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
