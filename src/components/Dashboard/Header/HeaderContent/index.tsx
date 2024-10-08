// material-ui
import { Theme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import Box from '@mui/material/Box'

// project-imports
import Search from './Search'
import Profile from './Profile'
import Notification from './Notification'

import { MenuOrientation } from '@/config'
import useConfig from '@/hooks/useConfig'
import DrawerHeader from '@/components/Dashboard/Drawer/DrawerHeader'

// ==============================|| HEADER - CONTENT ||============================== //

export default function HeaderContent() {
  const { menuOrientation } = useConfig()

  const downLG = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'))

  return (
    <>
      {menuOrientation === MenuOrientation.HORIZONTAL && !downLG && <DrawerHeader open />}
      {!downLG && <Search />}
      {downLG && <Box sx={{ width: '100%', ml: 1 }} />}

      <Notification />
      {!downLG && <Profile />}
    </>
  )
}
