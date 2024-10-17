import { GetUserAndRoleRes } from './getUserAndRoleRes'
import prisma from '../../../prisma/instance'
import { hashPassword, PipelineResult } from '@bigthing/backend-utils'
import { decodedFirebaseToken } from '../../shared/decodedFirebaseToken'

const DEFAULT_CREDENTIAL = hashPassword('Bigthing@168')

export const getUserAndRole = async ({
  token,
}: {
  token: string
}): Promise<PipelineResult<GetUserAndRoleRes | null>> => {
  try {
    const decodedUser = await decodedFirebaseToken(token)
    const result = await prisma.user.upsert({
      where: {
        username: decodedUser.uid,
      },
      create: {
        username: decodedUser.uid,
        fullName: decodedUser.name,
        email: decodedUser.email || '',
        emailVerified: decodedUser.email_verified,
        phoneNumber: decodedUser.phone_number || '',
        provider: decodedUser.firebase.sign_in_provider,
        avatar: decodedUser.picture,
        password: await DEFAULT_CREDENTIAL,
      },
      update: {
        phoneNumber: decodedUser.phone_number,
        emailVerified: decodedUser.email_verified,
        avatar: decodedUser.picture,
        lastLoginDate: new Date(),
      },
      include: {
        orgMember: true,
      },
    })

    return {
      status: 200,
      message: 'success',
      data: result,
    }
  } catch (e) {
    return {
      status: 401,
      message: 'unauthorized',
      data: null,
    }
  }
}
