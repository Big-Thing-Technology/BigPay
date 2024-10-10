import { useMemo } from 'react'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import Drawer from '@mui/material/Drawer'
import Box from '@mui/material/Box'
import DrawerHeader from './DrawerHeader'
import DrawerContent from './DrawerContent'
import { DRAWER_WIDTH } from '@/config'
import { useMenu } from '@/atom/useMenu'
import { MiniDrawerStyled } from './MiniDrawerStyled'

// ==============================|| MAIN LAYOUT - DRAWER ||============================== //

interface Props {
  window?: () => Window
}

export default function MainDrawer({ window }: Props) {
  const theme = useTheme()
  const downLG = useMediaQuery(theme.breakpoints.down('lg'))

  const { menuMaster, setMenuMaster } = useMenu()
  const drawerOpen = menuMaster.menuMaster.isDashboardDrawerOpened

  // responsive drawer container
  const container = window !== undefined ? () => window().document.body : undefined

  // header content
  const drawerContent = useMemo(() => <DrawerContent />, [])
  const drawerHeader = useMemo(() => <DrawerHeader open={drawerOpen} />, [drawerOpen])

  const handlerDrawerOpen = () => {
    setMenuMaster((prev) => ({ ...prev, isDashboardDrawerOpened: !drawerOpen }))
  }

  return (
    <Box component="nav" sx={{ flexShrink: { md: 0 }, zIndex: 1200 }} aria-label="mailbox folders">
      {!downLG ? (
        <MiniDrawerStyled variant="permanent" open={drawerOpen}>
          {drawerHeader}
          {drawerContent}
        </MiniDrawerStyled>
      ) : (
        <Drawer
          container={container}
          variant="temporary"
          open={drawerOpen}
          onClose={() => handlerDrawerOpen()}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: drawerOpen ? 'block' : 'none', lg: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: DRAWER_WIDTH,
              borderRight: `1px solid ${theme.palette.divider}`,
              backgroundImage: 'none',
              boxShadow: 'inherit',
            },
          }}
        >
          {drawerHeader}
          {drawerContent}
        </Drawer>
      )}
    </Box>
  )
}
