import { UpdateOrganizationStatusRes } from './updateOrganizationStatusRes'
import { PipelineResult, validate } from '@bigthing/backend-utils'
import {
  UpdateOrganizationStatusError,
  UpdateOrganizationStatusReq,
  UpdateOrganizationStatusValidator,
} from './updateOrganizationStatusReq'
import { decodedFirebaseToken } from '../../shared/decodedFirebaseToken'
import prisma from '../../../prisma/instance'

export const updateOrganizationStatus = async ({
  req,
  token,
}: {
  req: UpdateOrganizationStatusReq
  token: string
}): Promise<PipelineResult<UpdateOrganizationStatusRes | UpdateOrganizationStatusError | null>> => {
  const validateRes = await validate(req, UpdateOrganizationStatusValidator)
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

  // Only system admin can recover deleted organization
  if (foundUser.isAdmin) {
    const updatedOrganization = await prisma.organization.update({
      where: {
        id: req.id,
      },
      data: {
        active: req.active,
        isDeleted: req.isDeleted,
      },
    })
    return {
      status: 200,
      message: 'updateOrganizationStatusSuccessfully',
      data: updatedOrganization,
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

  // If user delete org, deactivate org as well
  const updatedOrganization = await prisma.organization.update({
    where: {
      id: req.id,
    },
    data: {
      active: req.isDeleted ? false : req.active,
      isDeleted: req.isDeleted,
    },
  })

  return {
    status: 200,
    message: 'updateOrganizationStatusSuccessfully',
    data: updatedOrganization,
  }
}
