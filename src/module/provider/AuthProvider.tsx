import React, { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { USER_TOKEN } from '@/utils/cookies-key'
import { useIsMounted } from '@/hooks/use-is-mounted'
import { useCallApi } from '@/hooks/useCallApi'
import { GetUserAndRoleRes } from '../../../server-functions/user/get-user-and-role/getUserAndRoleRes'
import { apiUrl, getUrlApi } from '@/utils/get-url-api'
import { useInfoUser } from '@/atom/useInfoUser'
import { redirect, usePathname, useSearchParams } from 'next/navigation'
import { APP_ADMIN_PATH, APP_CLIENT_PATH, APP_LOGIN_PATH, APP_STARTUP_PATH } from '@/config'

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // Get token from cookies
  const [cookies] = useCookies([USER_TOKEN])
  const pathName = usePathname()
  const query = useSearchParams()

  // Get status component (isMounted)
  const mounted = useIsMounted()

  const { userInfo, setUserInfo } = useInfoUser()

  // Call api get info nonCallInit true
  const { setLetCall } = useCallApi<GetUserAndRoleRes, null, null>({
    url: getUrlApi(apiUrl.user.get_info_role),
    nonCallInit: true,
    handleSuccess(mess, data) {
      setUserInfo(data)
    },
  })

  // logic: useEffect catch state of component and cookies, all available then call api
  useEffect(() => {
    if (mounted && cookies.token) {
      setLetCall(true)
    }
  }, [mounted, cookies])

  if (!mounted) return null

  if (mounted && !cookies.token && !pathName.includes(APP_LOGIN_PATH)) {
    redirect(APP_LOGIN_PATH)
  }

  if (mounted && !userInfo?.isAdmin && cookies.token) {
    // Always redirect user to start-up page if they don't have any org
    if (!pathName.includes(APP_STARTUP_PATH) && userInfo && userInfo.orgMember.length === 0) {
      redirect(APP_STARTUP_PATH)
    }
    if (!pathName.includes(APP_CLIENT_PATH) && userInfo && userInfo.orgMember.length > 0) {
      const orgId = query.get('orgId') ?? 'start'
      redirect(`${APP_CLIENT_PATH}?orgId=${orgId}`)
    }
  }

  if (mounted && userInfo?.isAdmin && cookies.token && !pathName.includes(APP_ADMIN_PATH)) {
    redirect(APP_ADMIN_PATH)
  }

  return children
}
