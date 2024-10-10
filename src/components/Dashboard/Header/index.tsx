import { ReactNode, useMemo } from 'react'
import { alpha, useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import AppBar, { AppBarProps } from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import AppBarStyled from './AppBarStyled'
import HeaderContent from './HeaderContent'
import IconButton from '@/components/@extended/IconButton'
import { DRAWER_WIDTH, MINI_DRAWER_WIDTH, ThemeMode } from '@/config'
import { HambergerMenu } from 'iconsax-react'
import { useMenu } from '@/atom/useMenu'

// ==============================|| MAIN LAYOUT - HEADER ||============================== //

export default function Header() {
  const theme = useTheme()
  const downLG = useMediaQuery(theme.breakpoints.down('lg'))

  const { menuMaster, setMenuMaster } = useMenu()
  const drawerOpen = menuMaster.menuMaster.isDashboardDrawerOpened

  const isHorizontal = false

  // header content
  const headerContent = useMemo(() => <HeaderContent />, [])

  const iconBackColorOpen =
    theme.palette.mode === ThemeMode.DARK ? 'background.paper' : 'secondary.200'
  const iconBackColor =
    theme.palette.mode === ThemeMode.DARK ? 'background.default' : 'secondary.100'

  const handlerDrawerOpen = () => {
    setMenuMaster((prev) => ({ ...prev, isDashboardDrawerOpened: !drawerOpen }))
  }

  // common header
  const mainHeader: ReactNode = (
    <Toolbar sx={{ px: { xs: 2, sm: 4.5, lg: 8 } }}>
      <IconButton
        aria-label="open drawer"
        onClick={() => handlerDrawerOpen()}
        edge="start"
        color="secondary"
        variant="light"
        size="large"
        sx={{
          color: 'secondary.main',
          bgcolor: drawerOpen ? iconBackColorOpen : iconBackColor,
          ml: { xs: 0, lg: -2 },
          p: 1,
        }}
      >
        <HambergerMenu />
      </IconButton>
      {headerContent}
    </Toolbar>
  )

  // app-bar params
  const appBar: AppBarProps = {
    position: 'fixed',
    elevation: 0,
    sx: {
      bgcolor: alpha(theme.palette.background.default, 0.8),
      backdropFilter: 'blur(8px)',
      zIndex: 1200,
      width: isHorizontal
        ? '100%'
        : {
            xs: '100%',
            lg: drawerOpen
              ? `calc(100% - ${DRAWER_WIDTH}px)`
              : `calc(100% - ${MINI_DRAWER_WIDTH}px)`,
          },
    },
  }

  return (
    <>
      {!downLG ? (
        <AppBarStyled open={drawerOpen} {...appBar}>
          {mainHeader}
        </AppBarStyled>
      ) : (
        <AppBar {...appBar}>{mainHeader}</AppBar>
      )}
    </>
  )
}
