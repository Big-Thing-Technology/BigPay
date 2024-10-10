import { MenuProps, NavItemType } from '@/types/menu'
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai/index'
import menuItems from '@/components/menu-items'

const initialState: MenuProps = {
  openedItem: 'dashboard',
  openedComponent: 'buttons',
  openedHorizontalItem: null,
  isDashboardDrawerOpened: true,
  isComponentDrawerOpened: true,
}

const menuMasterAtom = atom<{ menuMaster: MenuProps }>({ menuMaster: initialState })
const menuAtom = atom<{ menu: NavItemType[] | null }>({ menu: menuItems.items })

export const useMenu = () => {
  const [menu, setMenu] = useAtom(menuAtom)

  const { menuMaster } = useAtomValue(menuMasterAtom)
  const setMenuMasterState = useSetAtom(menuMasterAtom)

  return {
    menu,
    setMenu,
    menuMaster,
    setMenuMasterState,
  }
}
