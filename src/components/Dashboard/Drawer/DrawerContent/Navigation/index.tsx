import { Fragment, useState } from 'react'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import NavItem from './NavItem'
import NavGroup from './NavGroup'
import { NavItemType } from '@/types/menu'
import { useMenu } from '@/atom/useMenu'

// ==============================|| DRAWER CONTENT - NAVIGATION ||============================== //

export default function Navigation() {
  const { menuMaster, menu } = useMenu()
  const drawerOpen = menuMaster.isDashboardDrawerOpened

  const [, setSelectedID] = useState<string | null>(menuMaster.openedHorizontalItem)
  const [selectedItems, setSelectedItems] = useState<string | undefined>('')
  const [selectedLevel, setSelectedLevel] = useState<number>(0)

  const menuItems = menu
  const lastItem = null
  const lastItemIndex = (menuItems?.menu || ['']).length - 1
  const remItems: NavItemType[] = []
  let lastItemId: string

  const navGroups = (menuItems?.menu || []).slice(0, lastItemIndex + 1).map((item) => {
    switch (item.type) {
      case 'group':
        if (item.url && item.id !== lastItemId) {
          return (
            <Fragment key={item.id}>
              <Divider sx={{ my: 0.5 }} />
              <NavItem item={item} level={1} isParents setSelectedID={() => setSelectedID('')} />
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
        pt: drawerOpen ? 2 : 0,
        '& > ul:first-of-type': { mt: 0 },
        display: 'block',
        alignItems: 'center',
      }}
    >
      {navGroups}
    </Box>
  )
}
