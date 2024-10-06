import { GetOrganizationByIdRes } from './getOrganizationByIdRes'
import { PipelineResult } from '@bigthing/backend-utils'
import { decodedFirebaseToken } from '../../shared/decodedFirebaseToken'
import prisma from '../../../prisma/instance'

export const getOrganizationById = async ({
  id,
  token,
}: {
  id: string
  token: string
}): Promise<PipelineResult<GetOrganizationByIdRes | null>> => {
  const { uid } = await decodedFirebaseToken(token)
  const foundUser = await prisma.user.findUnique({ where: { username: uid as string } })
  if (!foundUser) {
    return {
      status: 404,
      message: 'notFoundUser',
      data: null,
    }
  }

  if (foundUser.isAdmin) {
    const foundOrganization = await prisma.organization.findUnique({ where: { id } })
    return {
      status: 200,
      message: 'getOrganizationByIdSuccessfully',
      data: foundOrganization,
    }
  }

  // Find organization which foundUser is member
  const foundOrganization = await prisma.organization.findUnique({
    where: {
      id,
      isDeleted: false,
      members: {
        some: {
          userId: foundUser.id,
        },
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

  return {
    status: 200,
    message: 'getOrganizationByIdSuccessfully',
    data: foundOrganization,
  }
}
