import { logger, PipelineResult } from '@bigthing/backend-utils'
import prisma from '../../../prisma/instance'
import { decodedFirebaseToken } from '../../shared/decodedFirebaseToken'
import { getUserAndRole } from '../../user/get-user-and-role/getUserAndRole'

export const authenFilter = async (req: Request): Promise<PipelineResult<null>> => {
  const token = req.headers.get('token')

  if (token === null || typeof token === 'undefined') {
    return {
      status: 401,
      message: 'unauthorized',
      data: null,
    }
  }

  try {
    // Check user is existed
    const { uid } = await decodedFirebaseToken(token)

    const findUser = await prisma.user.findUnique({
      where: { username: uid },
    })

    if (!findUser) {
      await getUserAndRole({ token })
      return {
        status: 200,
        message: 'ok',
        data: null,
      }
    }

    if (!findUser?.isDeleted && !findUser?.active) {
      return {
        status: 401,
        message: 'deactivatedUser',
        data: null,
      }
    }
  } catch (e) {
    logger.error('error-authen', e)
    return {
      status: 401,
      message: 'unauthorized',
      data: null,
    }
  }

  return {
    status: 200,
    message: 'ok',
    data: null,
  }
}
