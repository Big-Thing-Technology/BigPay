import { ObjectValidator } from '@bigthing/backend-utils'
import { IS_ORGANIZATION_ID, IS_ORGANIZATION_NAME } from '../shared/organization.validation'

export interface UpdateOrganizationReq {
  id: string
  name: string
  active: boolean
}

export type UpdateOrganizationError = Partial<Record<keyof UpdateOrganizationReq, string>>

export const UpdateOrganizationValidator: ObjectValidator<UpdateOrganizationError> = {
  id: IS_ORGANIZATION_ID,
  name: IS_ORGANIZATION_NAME,
}
