import { IS_REQUIRED, ObjectValidator } from '@bigthing/backend-utils'

export interface AcceptInvitationReq {
  invitationToken: string
}

export type AcceptInvitationError = Partial<Record<keyof AcceptInvitationReq, string>>

export const AcceptInvitationValidator: ObjectValidator<AcceptInvitationError> = {
  invitationToken: IS_REQUIRED,
}
