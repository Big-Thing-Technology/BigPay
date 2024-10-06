import { pipeline } from '@bigthing/backend-utils'
import { getOrganizationByUser } from '../../../../../server-functions/organization/get-organization-by-user'

export async function GET(req: Request) {
  const token = req.headers.get('token')
  const result = await pipeline({
    execFunc: () => getOrganizationByUser(token!),
  })
  return Response.json(result)
}
