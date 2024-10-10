import { NavItemType } from '@/types/menu'
import { organization } from '@/components/menu-items/organization'
import { finance } from '@/components/menu-items/finance'
import { other } from '@/components/menu-items/other'

// ==============================|| MENU ITEMS ||============================== //

const menuItem: { items: NavItemType[] } = {
  items: [organization, finance, other],
}

export default menuItem
