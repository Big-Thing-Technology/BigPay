'use client'

import { Outlet } from 'react-router-dom'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Toolbar from '@mui/material/Toolbar'
import Drawer from './Drawer'
import Breadcrumbs from '@/components/@extended/Breadcrumbs'
import { DRAWER_WIDTH } from '@/config'
import useConfig from '@/hooks/useConfig'
import Header from '@/components/Dashboard/Header'

export default function MainLayout() {
  const { container } = useConfig()

  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <Header />
      <Drawer />

      <Box
        component="main"
        sx={{ width: `calc(100% - ${DRAWER_WIDTH}px)`, flexGrow: 1, p: { xs: 2, md: 3 } }}
      >
        <Toolbar sx={{ mt: 'inherit', mb: 'inherit' }} />
        <Container
          maxWidth={container ? 'xl' : false}
          sx={{
            xs: 0,
            ...(container && { px: { xs: 0, md: 2 } }),
            position: 'relative',
            minHeight: 'calc(100vh - 110px)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Breadcrumbs />
          <Outlet />
        </Container>
      </Box>
    </Box>
  )
}
