import { TValidateFunction } from '@bigthing/backend-utils'
import prisma from '../../../prisma/instance'

/**
 * Check length of name
 */
export const IS_ORGANIZATION_NAME: TValidateFunction<{}, string> = async (
  error: Record<keyof {}, string>,
  value: string,
  key: keyof {}
) => {
  if (typeof value === 'undefined' || value === null) {
    return { ...error, [key]: 'nameRequired' }
  }

  if (value.length > 100) {
    return { ...error, [key]: 'nameTooLong' }
  }

  return { ...error, [key]: '' }
}

export const IS_EXIST_ORGANIZATION_ID: TValidateFunction<{}, string> = async (
  error: Record<keyof {}, string>,
  value: string,
  key: keyof {}
) => {
  if (typeof value === 'undefined' || value === null) {
    return { ...error, [key]: 'idRequired' }
  }
  try {
    const foundOrganization = await prisma.organization.findUnique({
      where: { id: value, isDeleted: false },
    })
    if (!foundOrganization) {
      return { ...error, [key]: 'organizationNotFound' }
    }
  } catch (e) {
    return { ...error, [key]: 'invalidId' }
  }

  return { ...error, [key]: '' }
}
