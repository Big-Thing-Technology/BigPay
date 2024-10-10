import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import NavCard from './NavCard'
import Navigation from './Navigation'
import SimpleBar from '@/components/third-party/SimpleBar'
import { useMenu } from '@/atom/useMenu'

// ==============================|| DRAWER CONTENT ||============================== //

export default function DrawerContent() {
  const theme = useTheme()
  const { menuMaster } = useMenu()
  const drawerOpen = menuMaster.menuMaster.isDashboardDrawerOpened

  const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'))

  return (
    <SimpleBar sx={{ '& .simplebar-content': { display: 'flex', flexDirection: 'column' } }}>
      <>
        {drawerOpen && !matchDownMD && <NavCard />}
        <Navigation />
      </>
    </SimpleBar>
  )
}
