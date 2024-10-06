import { pipeline } from '@bigthing/backend-utils'
import { getUserAndRole } from '../../../../../server-functions/user/get-user-and-role/getUserAndRole'
import { authenFilter } from '../../../../../server-functions/auth/filter/authenFilter'

export async function GET(request: Request) {
  const token = request.headers.get('token')
  const result = await pipeline({
    authenFunc: () => authenFilter(request),
    execFunc: () => getUserAndRole({ token: token! }),
  })
  return Response.json(result)
}
