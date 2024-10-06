import { ObjectValidator } from '@bigthing/backend-utils'
import { IS_ORGANIZATION_NAME } from '../shared/organization.validation'

export interface CreateOrganizationReq {
  name: string
}

export type CreateOrganizationError = Partial<Record<keyof CreateOrganizationReq, string>>

export const CreateOrganizationValidator: ObjectValidator<CreateOrganizationError> = {
  name: IS_ORGANIZATION_NAME,
}
