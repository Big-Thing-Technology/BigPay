import { atom, useAtomValue, useSetAtom } from 'jotai/index'
import { GetUserAndRoleRes } from '../../server-functions/user/get-user-and-role/getUserAndRoleRes'

const userInfoAtom = atom<{ data: GetUserAndRoleRes | null; headerItems: string[] }>({
  data: null,
  headerItems: [],
})

export const useInfoUser = () => {
  const { data: userInfo, headerItems } = useAtomValue(userInfoAtom)
  const setState = useSetAtom(userInfoAtom)

  const setUserInfo = (dataProps: GetUserAndRoleRes) => {
    setState({ headerItems, data: dataProps })
  }

  const setHeaderItems = (newItems: string[]) => {
    setState({ headerItems: newItems, data: userInfo })
  }

  const setBothValue = (value: { data: GetUserAndRoleRes; headerItems: string[] }) => {
    setState(value)
  }

  const clearValue = () => {
    setState({
      data: null,
      headerItems: [],
    })
  }

  return {
    setUserInfo,
    setHeaderItems,
    headerItems,
    userInfo,
    setBothValue,
    clearValue,
  }
}
