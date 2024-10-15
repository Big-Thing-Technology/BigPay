import { pipeline } from '@bigthing/backend-utils'
import { authenFilter } from '../../../../../server-functions/auth/filter/authenFilter'
import { inviteUser } from '../../../../../server-functions/organization/invite-user/inviteUser'

export async function POST(req: Request) {
  const reqBody = await req.json()
  const token = req.headers.get('token')
  const result = await pipeline({
    authenFunc: () => authenFilter(req),
    execFunc: () => inviteUser({ token: token!, req: reqBody }),
  })
  return Response.json(result)
}
