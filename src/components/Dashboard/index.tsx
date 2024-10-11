'use client'

import { ReactNode, useEffect } from 'react'

// material-ui
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import Container from '@mui/material/Container'
import Toolbar from '@mui/material/Toolbar'
import Box from '@mui/material/Box'

// project-imports
import Drawer from './Drawer'
import Header from './Header'
import Footer from './Footer'
import Breadcrumbs from '@/components/@extended/Breadcrumbs'
import useConfig from '@/hooks/useConfig'
import { DRAWER_WIDTH } from '@/config'
import { useMenu } from '@/atom/useMenu'

// assets

// ==============================|| MAIN LAYOUT ||============================== //

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const theme = useTheme()
  const downXL = useMediaQuery(theme.breakpoints.down('xl'))
  const { setMenuMasterState } = useMenu()

  const { container, miniDrawer } = useConfig()

  // set media wise responsive drawer
  useEffect(() => {
    if (!miniDrawer) {
      setMenuMasterState((prev) => ({
        ...prev,
        menuMaster: { ...prev.menuMaster, isDashboardDrawerOpened: !downXL },
      }))
    }
  }, [downXL])

  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <Header />
      <Drawer />

      <Box
        component="main"
        sx={{ width: `calc(100% - ${DRAWER_WIDTH}px)`, flexGrow: 1, p: { xs: 1, sm: 3 } }}
      >
        <Toolbar sx={{ mt: 'inherit', mb: 'inherit' }} />
        <Container
          maxWidth={container ? 'xl' : false}
          sx={{
            ...(container && { px: { xs: 0, sm: 2 } }),
            position: 'relative',
            minHeight: 'calc(100vh - 124px)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Breadcrumbs />
          {children}
          <Footer />
        </Container>
      </Box>
    </Box>
  )
}
