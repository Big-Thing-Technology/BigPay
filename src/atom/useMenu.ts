import { MenuProps, NavItemType } from '@/types/menu'
import { atom, useAtom } from 'jotai/index'
import menuItems from '@/components/menu-items'

const initialState: MenuProps = {
  openedItem: 'dashboard',
  openedComponent: 'buttons',
  openedHorizontalItem: null,
  isDashboardDrawerOpened: true,
  isComponentDrawerOpened: true,
}

const menuAtom = atom<{ menu: NavItemType[] | null }>({ menu: menuItems.items })
const menuMasterAtom = atom<{ menuMaster: MenuProps }>({ menuMaster: initialState })

export const useMenu = () => {
  const [menu, setMenu] = useAtom(menuAtom)
  const [menuMaster, setMenuMaster] = useAtom(menuMasterAtom)

  // const useHandlerComponentDrawer = (isComponentDrawerOpened: boolean) => {
  //   const setStateMenuMaster = useSetAtom(menuMasterAtom)
  //   setStateMenuMaster({ menuMaster: { ...menuMaster, isComponentDrawerOpened } })
  // }
  //
  // const useHandlerActiveComponent = (openedComponent: string) => {
  //   const setStateMenuMaster = useSetAtom(menuMasterAtom)
  //   setStateMenuMaster({ menuMaster: { ...menuMaster, openedComponent } })
  // }
  //
  const useHandlerDrawerOpen = (isDashboardDrawerOpened: boolean) => {
    setMenuMaster((prev) => ({ ...prev, isDashboardDrawerOpened }))
  }
  //
  // const useHandlerHorizontalActiveItem = (openedHorizontalItem: string | null) => {
  //   const setStateMenuMaster = useSetAtom(menuMasterAtom)
  //   setStateMenuMaster({ menuMaster: { ...menuMaster, openedHorizontalItem } })
  // }
  //
  // const useHandlerActiveItem = (openedItem: string) => {
  //   const setStateMenuMaster = useSetAtom(menuMasterAtom)
  //   setStateMenuMaster({ menuMaster: { ...menuMaster, openedItem } })
  // }

  return {
    menu,
    setMenu,
    menuLoading: false, // Since menu data is fixed, loading is always false
    menuError: null, // Assuming no errors with fixed data
    menuValidating: false, // Assuming no validation needed for fixed data
    menuEmpty: !menu,

    menuMaster,
    setMenuMaster,
    menuMasterLoading: false, // Since menu data is fixed, loading is always false

    // useHandlerComponentDrawer,
    // useHandlerActiveComponent,
    useHandlerDrawerOpen,
    // useHandlerHorizontalActiveItem,
    // useHandlerActiveItem,
  }
}
