import { pipeline } from '@bigthing/backend-utils'
import { getOrganizationByUser } from '../../../../../server-functions/organization/get-organizations-by-user'
import { authenFilter } from '../../../../../server-functions/auth/filter/authenFilter'

export async function GET(req: Request) {
  const token = req.headers.get('token')
  const result = await pipeline({
    authenFunc: () => authenFilter(req),
    execFunc: () => getOrganizationByUser(token!),
  })
  return Response.json(result)
}
