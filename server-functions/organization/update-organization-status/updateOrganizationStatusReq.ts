import { IS_REQUIRED, ObjectValidator } from '@bigthing/backend-utils'

export interface UpdateOrganizationStatusReq {
  id: string
  active?: boolean
  isDeleted?: boolean
}

export type UpdateOrganizationStatusError = Partial<
  Record<keyof UpdateOrganizationStatusReq, string>
>

export const UpdateOrganizationStatusValidator: ObjectValidator<UpdateOrganizationStatusError> = {
  id: IS_REQUIRED,
}
