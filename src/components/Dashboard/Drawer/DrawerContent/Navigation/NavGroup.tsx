import { Dispatch, SetStateAction, useEffect, useState } from 'react'

import { usePathname } from 'next/navigation'
import useMediaQuery from '@mui/material/useMediaQuery'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'
import useConfig from '@/hooks/useConfig'
import { ThemeMode } from '@/config'
import { NavItemType } from '@/types/menu'
import { matchPath } from '@/utils/matchPath'
import NavCollapse from '@/components/Dashboard/Drawer/DrawerContent/Navigation/NavCollapse'
import NavItem from '@/components/Dashboard/Drawer/DrawerContent/Navigation/NavItem'
import { useTheme } from '@mui/material/styles'
import { useMenu } from '@/atom/useMenu'

// ==============================|| NAVIGATION - GROUP ||============================== //

interface Props {
  item: NavItemType
  lastItem: number
  remItems: NavItemType[]
  lastItemId: string
  setSelectedID: React.Dispatch<React.SetStateAction<string | null>>
  setSelectedItems: Dispatch<SetStateAction<string | undefined>>
  selectedItems: string | undefined
  setSelectedLevel: Dispatch<SetStateAction<number>>
  selectedLevel: number
}

type VirtualElement = {
  getBoundingClientRect: () => DOMRect
  contextElement?: Element
}

export default function NavGroup({
  item,
  lastItem,
  remItems,
  setSelectedID,
  lastItemId,
  setSelectedItems,
  selectedItems,
  setSelectedLevel,
  selectedLevel,
}: Props) {
  const theme = useTheme()
  const pathname = usePathname()

  const { menuCaption } = useConfig()
  const { menuMaster } = useMenu()
  const drawerOpen = menuMaster.isDashboardDrawerOpened

  const downLG = useMediaQuery(theme.breakpoints.down('lg'))
  const [anchorEl, setAnchorEl] = useState<
    VirtualElement | (() => VirtualElement) | null | undefined
  >(null)
  const [currentItem, setCurrentItem] = useState(item)

  const openMini = Boolean(anchorEl)

  useEffect(() => {
    if (lastItem) {
      if (item.id === lastItemId) {
        const localItem: any = { ...item }
        const elements = remItems.map((ele: NavItemType) => ele.elements)
        localItem.children = elements.flat(1)
        setCurrentItem(localItem)
      } else {
        setCurrentItem(item)
      }
    }
  }, [item, lastItem, downLG])

  const checkOpenForParent = (child: NavItemType[], id: string) => {
    child.forEach((ele: NavItemType) => {
      if (ele.children?.length) {
        checkOpenForParent(ele.children, currentItem.id!)
      }

      if (ele.url && matchPath(ele.link || ele.url, pathname)) {
        setSelectedID(id)
      }
    })
  }
  const checkSelectedOnload = (data: NavItemType) => {
    const childrens = data.children ? data.children : []
    childrens.forEach((itemCheck: NavItemType) => {
      if (itemCheck?.children?.length) {
        checkOpenForParent(itemCheck.children, currentItem.id!)
      }

      if (itemCheck.url && matchPath(itemCheck.link || itemCheck.url, pathname)) {
        setSelectedID(currentItem.id!)
      }
    })
  }

  useEffect(() => {
    checkSelectedOnload(currentItem)
    if (openMini) setAnchorEl(null)
  }, [pathname, currentItem])

  const navCollapse = item.children?.map((menuItem) => {
    switch (menuItem.type) {
      case 'collapse':
        return (
          <NavCollapse
            key={menuItem.id}
            menu={menuItem}
            setSelectedItems={setSelectedItems}
            setSelectedLevel={setSelectedLevel}
            selectedLevel={selectedLevel}
            selectedItems={selectedItems}
            level={1}
            parentId={currentItem.id!}
          />
        )
      case 'item':
        return <NavItem key={menuItem.id} item={menuItem} level={1} />
      default:
        return (
          <Typography key={menuItem.id} variant="h6" color="error" align="center">
            Fix - Group Collapse or Items
          </Typography>
        )
    }
  })

  return (
    <List
      subheader={
        <>
          {item.title ? (
            drawerOpen &&
            menuCaption && (
              <Box sx={{ pl: 3, mb: 1.5 }}>
                <Typography
                  variant="h5"
                  color={
                    theme.palette.mode === ThemeMode.DARK ? 'text.secondary' : 'secondary.dark'
                  }
                  sx={{ textTransform: 'uppercase', fontSize: '0.688rem' }}
                >
                  {item.title}
                </Typography>
                {item.caption && (
                  <Typography variant="caption" color="secondary">
                    {item.caption}
                  </Typography>
                )}
              </Box>
            )
          ) : (
            <Divider sx={{ my: 0.5 }} />
          )}
        </>
      }
      sx={{ mt: drawerOpen && menuCaption && item.title ? 1.5 : 0, py: 0, zIndex: 0 }}
    >
      {navCollapse}
    </List>
  )
}
