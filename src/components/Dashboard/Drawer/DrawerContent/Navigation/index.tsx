import { Fragment, useState } from 'react'

// material-ui
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'

// project-imports
import NavItem from './NavItem'
import NavGroup from './NavGroup'

import useConfig from '@/hooks/useConfig'
import { HORIZONTAL_MAX_ITEM, MenuOrientation } from '@/config'

// types
import { NavItemType } from '@/types/menu'

// ==============================|| DRAWER CONTENT - NAVIGATION ||============================== //

export default function Navigation() {
  const theme = useTheme()

  const downLG = useMediaQuery(theme.breakpoints.down('lg'))

  const { menuOrientation } = useConfig()

  const [selectedID, setSelectedID] = useState<string | undefined>('')
  const [selectedItems, setSelectedItems] = useState<string | undefined>('')
  const [selectedLevel, setSelectedLevel] = useState<number>(0)
  const [menuItems] = useState<{ items: NavItemType[] }>({ items: [] })

  const isHorizontal = menuOrientation === MenuOrientation.HORIZONTAL && !downLG

  const lastItem = isHorizontal ? HORIZONTAL_MAX_ITEM : null
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
              {menuOrientation !== MenuOrientation.HORIZONTAL && <Divider sx={{ my: 0.5 }} />}
              <NavItem item={item} level={1} isParents />
            </Fragment>
          )
        }
        return (
          <NavGroup
            key={item.id}
            selectedID={selectedID}
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
        pt: isHorizontal ? 0 : 2,
        '& > ul:first-of-type': { mt: 0 },
        display: isHorizontal ? { xs: 'block', lg: 'flex' } : 'block',
      }}
    >
      {navGroups}
    </Box>
  )
}
