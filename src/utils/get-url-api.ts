export const getUrlApi = (path: string): string => {
  if (process.env.NEXT_PUBLIC_URL_API_URL) return `${process.env.NEXT_PUBLIC_URL_API_URL}${path}`
  return `/api/${path}`
}

export const apiUrl = {
  user: {
    get_info_role: '/users/get-info',
  },
  admin: {},
  client: {},
}
