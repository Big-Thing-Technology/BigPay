// third-party
import { FormattedMessage } from 'react-intl'

// assets
import { Box1, Profile2User, ShoppingCart, Story } from 'iconsax-react'

// type
import { NavItemType } from '@/types/menu'

// icons
const icons = {
  organization: Story,
  order: ShoppingCart,
  member: Profile2User,
  product: Box1,
}

// ==============================|| MENU ITEMS - WIDGETS ||============================== //

export const organization: NavItemType = {
  id: 'group-organization',
  title: <FormattedMessage id="Organization" />,
  icon: icons.organization,
  type: 'group',
  children: [
    {
      id: 'order',
      title: <FormattedMessage id="Order" />,
      type: 'item',
      url: '/client/order',
      icon: icons.order,
    },
    {
      id: 'member',
      title: <FormattedMessage id="Member" />,
      type: 'item',
      url: '/client/member',
      icon: icons.member,
    },
    {
      id: 'product',
      title: <FormattedMessage id="Product" />,
      type: 'item',
      url: '/client/product',
      icon: icons.product,
    },
  ],
}
