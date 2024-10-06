import { pipeline } from '@bigthing/backend-utils'
import { createOrganization } from '../../../../../server-functions/organization/create-organization'
import { authenFilter } from '../../../../../server-functions/auth/filter/authenFilter'

export async function POST(req: Request) {
  const reqBody = await req.json()
  const token = req.headers.get('token')
  const result = await pipeline({
    authenFunc: () => authenFilter(req),
    execFunc: () => createOrganization(token!, reqBody),
  })
  return Response.json(result)
}
