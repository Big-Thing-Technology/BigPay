import { pipeline } from '@bigthing/backend-utils'
import { getUserAndRole } from '../../../../../server-functions/user/get-user-and-role/getUserAndRole'

export async function GET(request: Request) {
  const token = request.headers.get('token')
  const result = await pipeline({
    execFunc: () => getUserAndRole({ token: token! }),
  })
  return Response.json(result)
}
