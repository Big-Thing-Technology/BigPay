import { UpdateOrganizationReq } from './updateOrganizationReq'
import { PipelineResult } from '@bigthing/backend-utils'
import { decodedFirebaseToken } from '../../shared/decodedFirebaseToken'
import prisma from '../../../prisma/instance'

export const updateOrganization = async ({
  req,
  token,
}: {
  req: UpdateOrganizationReq
  token: string
}): Promise<PipelineResult<any>> => {
  const { uid } = await decodedFirebaseToken(token)
  const foundUser = await prisma.user.findUnique({ where: { username: uid as string } })
  if (!foundUser) {
    return {
      status: 400,
      message: 'userNotFound',
      data: null,
    }
  }

  // Find organization which foundUser is member
  const foundOrganization = await prisma.organization.findUnique({
    where: {
      id: req.id,
      AND: {
        members: { some: { userId: foundUser.id } },
      },
    },
  })
  if (!foundOrganization) {
    return {
      status: 400,
      message: 'organizationNotFound',
      data: null,
    }
  }

  const updatedOrganization = await prisma.organization.update({
    where: { id: req.id },
    data: {
      name: req.name,
      // if req.active is null or blank, then not update this field
      active: req.active !== null || '' ? req.active : undefined,
    },
  })

  return {
    status: 200,
    message: 'updateOrganizationSuccessfully',
    data: updatedOrganization,
  }
}
