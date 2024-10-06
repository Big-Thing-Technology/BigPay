import { PipelineResult } from '@bigthing/backend-utils'
import { CreateOrganizationReq } from './createOrganizationReq'
import prisma from '../../../prisma/instance'
import { decodedFirebaseToken } from '../../shared/decodedFirebaseToken'

export const createOrganization = async (
  token: string,
  req: CreateOrganizationReq
): Promise<PipelineResult<any>> => {
  const { uid } = await decodedFirebaseToken(token)
  const foundUser = await prisma.user.findUnique({ where: { username: uid as string } })
  if (!foundUser) {
    return {
      status: 400,
      message: 'notFoundUser',
      data: null,
    }
  }

  const createdBoard = await prisma.organization.create({
    data: {
      name: req.name,
      members: {
        create: {
          userId: foundUser.id,
          isOwner: true,
        },
      },
    },
  })

  return {
    status: 200,
    message: 'createOrganizationSuccessfully',
    data: createdBoard,
  }
}
