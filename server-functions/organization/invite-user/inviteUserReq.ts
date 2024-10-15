import { IS_REQUIRED, ObjectValidator } from '@bigthing/backend-utils'
import { IS_EXIST_ORGANIZATION_ID } from '../shared/organization.validation'

export interface InviteUserReq {
  email: string
  organizationId: string
}

export type InviteUserError = Partial<Record<keyof InviteUserReq, string>>

export const InviteUserValidator: ObjectValidator<InviteUserError> = {
  email: IS_REQUIRED,
  organizationId: IS_EXIST_ORGANIZATION_ID,
}
