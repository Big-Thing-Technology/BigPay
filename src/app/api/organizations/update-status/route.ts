import { pipeline } from '@bigthing/backend-utils'
import { updateOrganizationStatus } from '../../../../../server-functions/organization/update-organization-status'

export async function PUT(req: Request) {
  const reqBody = await req.json()
  const token = req.headers.get('token')
  const result = await pipeline({
    execFunc: () => updateOrganizationStatus({ req: reqBody, token: token! }),
  })
  return Response.json(result)
}
