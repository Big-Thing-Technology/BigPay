import { Category2, Moneys, Setting3 } from 'iconsax-react'
import { NavItemType } from '@/types/menu'
import { FormattedMessage } from 'react-intl'

const icons = {
  pricing: Moneys,
  setting: Setting3,
  group: Category2,
}

export const other: NavItemType = {
  id: 'group-other',
  title: <FormattedMessage id="Others" />,
  icon: icons.group,
  type: 'group',
  children: [
    {
      id: 'pricing',
      title: <FormattedMessage id="Pricing" />,
      type: 'item',
      url: '/client',
      icon: icons.pricing,
    },
    {
      id: 'setting',
      title: <FormattedMessage id="Settings" />,
      type: 'item',
      url: '/client',
      icon: icons.setting,
    },
  ],
}
