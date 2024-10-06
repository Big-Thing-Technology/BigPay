import { PipelineResult } from '@bigthing/backend-utils'
import { decodedFirebaseToken } from '../../shared/decodedFirebaseToken'
import prisma from '../../../prisma/instance'
import { GetOrganizationByUserRes } from './getOrganizationByUserRes'

export const getOrganizationByUser = async (
  token: string
): Promise<PipelineResult<GetOrganizationByUserRes | null>> => {
  const { uid } = await decodedFirebaseToken(token)
  const foundUser = await prisma.user.findUnique({ where: { username: uid as string } })
  if (!foundUser) {
    return {
      status: 400,
      message: 'notFoundUser',
      data: null,
    }
  }

  // Find list of every Organization have relation with user with uid
  const userOrganizations = await prisma.organization.findMany({
    where: {
      isDeleted: false,
      members: {
        every: {
          userId: foundUser.id,
        },
      },
    },
  })

  return {
    status: 200,
    message: 'getOrganizationByUserSuccessfully',
    data: userOrganizations,
  }
}
