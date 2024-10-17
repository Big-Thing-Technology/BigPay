export const apiRoutes = {
  organization: {
    create: '/api/organizations/create-organization',
    get: '/api/organizations/get-organization',
    updateInfo: '/api/organizations/update-organization',
    updateStatus: '/api/organizations/update-status',
    invite: 'api/organizations/invite-user',
    accept: 'api/organizations/accept-invitation',
    getById: (id: string) => `api/organizations/${id}`,
  },
}
