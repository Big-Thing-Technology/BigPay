import { DollarSquare, Fatrows, MoneySend } from 'iconsax-react'
import { NavItemType } from '@/types/menu'
import { FormattedMessage } from 'react-intl'

const icons = {
  payout: MoneySend,
  statistic: Fatrows,
  group: DollarSquare,
}

export const finance: NavItemType = {
  id: 'group-finance',
  title: <FormattedMessage id="Finance" />,
  icon: icons.group,
  type: 'group',
  children: [
    {
      id: 'payout',
      title: <FormattedMessage id="Payout" />,
      type: 'item',
      url: '/client/payout',
      icon: icons.payout,
    },
    {
      id: 'statistic',
      title: <FormattedMessage id="Statistic" />,
      type: 'item',
      url: '/client/statistic',
      icon: icons.statistic,
    },
  ],
}
