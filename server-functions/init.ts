import { hashPassword, logger } from '@bigthing/backend-utils'
import * as process from 'process'
import prisma from '../prisma/instance'
import { labelColors } from '@/constant/label-color'

export const initData = async () => {
  const { INIT_ADMIN_USERNAME, INIT_ADMIN_PASSWORD, INIT_ADMIN_EMAIL } = process.env
  const password = await hashPassword(INIT_ADMIN_PASSWORD || '')

  if (INIT_ADMIN_USERNAME && INIT_ADMIN_PASSWORD && INIT_ADMIN_EMAIL) {
    const findAdmin = await prisma.user.findUnique({
      where: { username: INIT_ADMIN_USERNAME || '' },
    })
    if (findAdmin === null) {
      await prisma.user.create({
        data: {
          fullName: 'Super Admin',
          username: INIT_ADMIN_USERNAME || '',
          email: INIT_ADMIN_EMAIL || '',
          password,
          isAdmin: true,
          transactionsAmount: 0,
          initAvatarColor: labelColors[Math.floor(Math.random() * labelColors.length)],
        },
      })
      logger.info('init-data', 'createInitAdminSuccessfully')
    }
  }
}

initData()