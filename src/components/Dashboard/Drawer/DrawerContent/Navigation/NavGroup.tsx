import { Dispatch, Fragment, SetStateAction, useEffect, useState } from 'react'
import { matchPath, useLocation } from 'react-router'

// material-ui
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'

// third-party
// project-imports
import NavCollapse from './NavCollapse'

import { ThemeMode } from '@/config'
import useConfig from '@/hooks/useConfig'
import { useGetMenuMaster } from '@/api/menu'

// assets
// types
import { NavItemType } from '@/types/menu'
import NavItem from '@/components/Dashboard/Drawer/DrawerContent/Navigation/NavItem'

interface Props {
  item: NavItemType
  lastItem: number
  remItems: NavItemType[]
  lastItemId: string
  setSelectedID: React.Dispatch<React.SetStateAction<string | undefined>>
  setSelectedItems: Dispatch<SetStateAction<string | undefined>>
  selectedItems: string | undefined
  setSelectedLevel: Dispatch<SetStateAction<number>>
  selectedLevel: number
}

type VirtualElement = {
  getBoundingClientRect: () => DOMRect
  contextElement?: Element
}

// ==============================|| NAVIGATION - GROUP ||============================== //

export default function NavGroup({
  item,
  lastItem,
  remItems,
  lastItemId,
  setSelectedID,
  setSelectedItems,
  selectedItems,
  setSelectedLevel,
  selectedLevel,
}: Props) {
  const theme = useTheme()
  const { pathname } = useLocation()

  const { menuCaption } = useConfig()
  const { menuMaster } = useGetMenuMaster()
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item, lastItem, downLG])

  const checkOpenForParent = (child: NavItemType[], id: string) => {
    child.forEach((ele: NavItemType) => {
      if (ele.children?.length) {
        checkOpenForParent(ele.children, currentItem.id!)
      }

      if (ele.url && !!matchPath({ path: ele?.link ? ele.link : ele.url, end: true }, pathname)) {
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

      if (
        itemCheck.url &&
        !!matchPath(
          {
            path: itemCheck?.link ? itemCheck.link : itemCheck.url,
            end: true,
          },
          pathname
        )
      ) {
        setSelectedID(currentItem.id!)
      }
    })
  }

  useEffect(() => {
    checkSelectedOnload(currentItem)
    if (openMini) setAnchorEl(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, currentItem])

  const navCollapse = item.children?.map((menuItem, index) => {
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
          <Typography key={index} variant="h6" color="error" align="center">
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
            drawerOpen && (
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
