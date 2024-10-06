import { pipeline } from '@bigthing/backend-utils'
import { updateOrganization } from '../../../../../server-functions/organization/update-organization/updateOrganization'

export async function PUT(req: Request) {
  const reqBody = await req.json()
  const token = req.headers.get('token')
  const result = await pipeline({
    execFunc: () => updateOrganization({ req: reqBody, token: token! }),
  })
  return Response.json(result)
}
