const notDisplayRouter = ['adminUser', 'user', 'role']

export const permissionsFromRoutes = (routes: any | undefined) => {
  const permissionsTree: Record<string, string[]> = {}

  //  run each groupEndpoint
  Object.keys(routes).forEach((groupEndpoint) => {
    // Check if the groupEndpoint is not in the notDisplayRouter list
    if (!notDisplayRouter.includes(groupEndpoint)) {
      //  get all actions in a group endpoint
      const actions = routes[groupEndpoint]
      if (typeof actions === 'object') {
        permissionsTree[groupEndpoint] = Object.keys(actions)
      }
    }
  })

  return permissionsTree
}
