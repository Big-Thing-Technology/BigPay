import { TValidateFunction } from '@bigthing/backend-utils'
import { UpdateOrganizationReq } from '../update-organization/updateOrganizationReq'
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

export const IS_ORGANIZATION_ID: TValidateFunction<UpdateOrganizationReq, string> = async (
  error: Record<keyof UpdateOrganizationReq, string>,
  value: string,
  key: keyof UpdateOrganizationReq
) => {
  if (typeof value === 'undefined' || value === null) {
    return { ...error, [key]: 'idRequired' }
  }
  const foundOrganization = await prisma.organization.findUnique({ where: { id: value } })
  if (!foundOrganization) {
    return { ...error, [key]: 'idNotFound' }
  }

  return { ...error, [key]: '' }
}
