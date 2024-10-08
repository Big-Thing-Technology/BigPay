import { pipeline } from '@bigthing/backend-utils'
import { getOrganizationById } from '../../../../../server-functions/organization/get-organization-by-id'
import { authenFilter } from '../../../../../server-functions/auth/filter/authenFilter'

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const token = req.headers.get('token')
  const result = await pipeline({
    authenFunc: () => authenFilter(req),
    execFunc: () => getOrganizationById({ id: params.id, token: token! }),
  })
  return Response.json(result)
}
