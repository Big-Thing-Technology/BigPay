// third-party
import { FormattedMessage } from 'react-intl'

import { NavActionType } from '@/config'

// assets
import {
  Add,
  Bill,
  Calendar1,
  Kanban,
  KyberNetwork,
  Link1,
  Messages2,
  Profile2User,
  ShoppingBag,
  UserSquare,
} from 'iconsax-react'

// type
import { NavItemType } from '@/types/menu'

// icons
const icons = {
  applications: KyberNetwork,
  chat: Messages2,
  calendar: Calendar1,
  kanban: Kanban,
  customer: Profile2User,
  invoice: Bill,
  profile: UserSquare,
  ecommerce: ShoppingBag,
  add: Add,
  link: Link1,
}

// ==============================|| MENU ITEMS - APPLICATIONS ||============================== //

const applications: NavItemType = {
  id: 'group-applications',
  title: <FormattedMessage id="applications" />,
  icon: icons.applications,
  type: 'group',
  children: [
    {
      id: 'chat',
      title: <FormattedMessage id="chat" />,
      type: 'item',
      url: '/apps/chat',
      icon: icons.chat,
      breadcrumbs: false,
    },
    {
      id: 'calendar',
      title: <FormattedMessage id="calendar" />,
      type: 'item',
      url: '/apps/calendar',
      icon: icons.calendar,
      actions: [
        {
          type: NavActionType.LINK,
          label: 'Full Calendar',
          icon: icons.link,
          url: 'https://fullcalendar.io/docs/react',
          target: true,
        },
      ],
    },
    {
      id: 'kanban',
      title: <FormattedMessage id="kanban" />,
      type: 'item',
      icon: icons.kanban,
      url: '/apps/kanban/board',
      link: '/apps/kanban/:tab',
      breadcrumbs: false,
    },
    {
      id: 'customer',
      title: <FormattedMessage id="customer" />,
      type: 'collapse',
      icon: icons.customer,
      children: [
        {
          id: 'customer-card',
          title: <FormattedMessage id="cards" />,
          type: 'item',
          url: '/apps/customer/customer-card',
        },
      ],
    },
    {
      id: 'invoice',
      title: <FormattedMessage id="invoice" />,
      url: '/apps/invoice/dashboard',
      type: 'collapse',
      icon: icons.invoice,
      breadcrumbs: false,
      children: [
        {
          id: 'create',
          title: <FormattedMessage id="create" />,
          type: 'item',
          url: '/apps/invoice/create',
          breadcrumbs: false,
        },
        {
          id: 'details',
          title: <FormattedMessage id="details" />,
          type: 'item',
          url: '/apps/invoice/details/1',
          link: '/apps/invoice/details/:id',
          breadcrumbs: false,
        },
        {
          id: 'list',
          title: <FormattedMessage id="list" />,
          type: 'item',
          url: '/apps/invoice/list',
          breadcrumbs: false,
        },
        {
          id: 'edit',
          title: <FormattedMessage id="edit" />,
          type: 'item',
          url: '/apps/invoice/edit/1',
          link: '/apps/invoice/edit/:id',
          breadcrumbs: false,
        },
      ],
    },
    {
      id: 'profile',
      title: <FormattedMessage id="profile" />,
      type: 'collapse',
      icon: icons.profile,
      children: [
        {
          id: 'user-profile',
          title: <FormattedMessage id="user-profile" />,
          type: 'item',
          link: '/apps/profiles/user/:tab',
          url: '/apps/profiles/user/personal',
          breadcrumbs: false,
        },
        {
          id: 'account-profile',
          title: <FormattedMessage id="account-profile" />,
          type: 'item',
          url: '/apps/profiles/account/basic',
          link: '/apps/profiles/account/:tab',
          breadcrumbs: false,
        },
      ],
    },

    {
      id: 'e-commerce',
      title: <FormattedMessage id="e-commerce" />,
      type: 'collapse',
      icon: icons.ecommerce,
      children: [
        {
          id: 'products',
          title: <FormattedMessage id="products" />,
          type: 'item',
          url: '/apps/e-commerce/products',
        },
        {
          id: 'product-details',
          title: <FormattedMessage id="product-details" />,
          type: 'item',
          link: '/apps/e-commerce/product-details/:id',
          url: '/apps/e-commerce/product-details/1',
          breadcrumbs: false,
        },
        {
          id: 'product-list',
          title: <FormattedMessage id="product-list" />,
          type: 'item',
          url: '/apps/e-commerce/product-list',
          breadcrumbs: false,
        },
        {
          id: 'add-new-product',
          title: <FormattedMessage id="add-new-product" />,
          type: 'item',
          url: '/apps/e-commerce/add-new-product',
        },
        {
          id: 'checkout',
          title: <FormattedMessage id="checkout" />,
          type: 'item',
          url: '/apps/e-commerce/checkout',
        },
      ],
    },
  ],
}

export default applications