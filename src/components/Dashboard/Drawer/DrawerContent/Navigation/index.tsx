import { Fragment, useState } from 'react'

// material-ui
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'

// project-imports
import NavItem from './NavItem'
import NavGroup from './NavGroup'

// types
import { NavItemType } from '@/types/menu'

// ==============================|| DRAWER CONTENT - NAVIGATION ||============================== //

export default function Navigation() {
  const [, setSelectedID] = useState<string | undefined>('')
  const [selectedItems, setSelectedItems] = useState<string | undefined>('')
  const [selectedLevel, setSelectedLevel] = useState<number>(0)
  const [menuItems] = useState<{ items: NavItemType[] }>({ items: [] })

  const lastItem = null
  let lastItemIndex = menuItems.items.length - 1
  let remItems: NavItemType[] = []
  let lastItemId: string

  if (lastItem && lastItem < menuItems.items.length) {
    lastItemId = menuItems.items[lastItem - 1].id!
    lastItemIndex = lastItem - 1
    remItems = menuItems.items.slice(lastItem - 1, menuItems.items.length).map((item) => ({
      title: item.title,
      elements: item.children,
      icon: item.icon,
      ...(item.url && {
        url: item.url,
      }),
    }))
  }

  const navGroups = menuItems.items.slice(0, lastItemIndex + 1).map((item) => {
    switch (item.type) {
      case 'group':
        if (item.url && item.id !== lastItemId) {
          return (
            <Fragment key={item.id}>
              <Divider sx={{ my: 0.5 }} />
              <NavItem item={item} level={1} isParents />
            </Fragment>
          )
        }
        return (
          <NavGroup
            key={item.id}
            setSelectedID={setSelectedID}
            setSelectedItems={setSelectedItems}
            setSelectedLevel={setSelectedLevel}
            selectedLevel={selectedLevel}
            selectedItems={selectedItems}
            lastItem={lastItem!}
            remItems={remItems}
            lastItemId={lastItemId}
            item={item}
          />
        )
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Fix - Navigation Group
          </Typography>
        )
    }
  })

  return (
    <Box
      sx={{
        pt: 2,
        '& > ul:first-of-type': { mt: 0 },
        display: 'block',
      }}
    >
      {navGroups}
    </Box>
  )
}
