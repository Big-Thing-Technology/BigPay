import { IS_REQUIRED, ObjectValidator } from '@bigthing/backend-utils'

export interface CreateOrganizationReq {
  name: string
}

export type CreateOrganizationError = Partial<Record<keyof CreateOrganizationReq, string>>

export const CreateOrganizationValidator: ObjectValidator<CreateOrganizationError> = {
  name: IS_REQUIRED,
}
