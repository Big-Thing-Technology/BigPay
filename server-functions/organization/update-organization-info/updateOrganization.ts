import {
  UpdateOrganizationError,
  UpdateOrganizationReq,
  UpdateOrganizationValidator,
} from './updateOrganizationReq'
import { PipelineResult, validate } from '@bigthing/backend-utils'
import { decodedFirebaseToken } from '../../shared/decodedFirebaseToken'
import prisma from '../../../prisma/instance'
import { UpdateOrganizationRes } from './updateOrganizationRes'

export const updateOrganization = async ({
  req,
  token,
}: {
  req: UpdateOrganizationReq
  token: string
}): Promise<PipelineResult<UpdateOrganizationRes | UpdateOrganizationError | null>> => {
  const validateRes = await validate(req, UpdateOrganizationValidator)
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

  // Find organization which foundUser is member
  const foundOrganization = await prisma.organization.findUnique({
    where: {
      id: req.id,
      isDeleted: false,
      members: {
        some: { userId: foundUser.id },
      },
    },
  })
  if (!foundOrganization) {
    return {
      status: 404,
      message: 'organizationNotFound',
      data: null,
    }
  }

  const updatedOrganization = await prisma.organization.update({
    where: { id: req.id },
    data: {
      name: req.name,
    },
  })

  return {
    status: 200,
    message: 'updateOrganizationSuccessfully',
    data: updatedOrganization,
  }
}
