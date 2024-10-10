import { useMemo } from 'react'

// material-ui
import { Theme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import Box from '@mui/material/Box'

// project-imports
import Search from './Search'
import Profile from './Profile'
import Notification from './Notification'

import useConfig from '@/hooks/useConfig'
import Localization from '@/components/Dashboard/Header/HeaderContent/Localization'

// ==============================|| HEADER - CONTENT ||============================== //

export default function HeaderContent() {
  const { i18n } = useConfig()

  const downLG = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'))

  const localization = useMemo(() => <Localization />, [i18n])

  return (
    <>
      {!downLG && <Search />}
      {!downLG && localization}
      {downLG && <Box sx={{ width: '100%', ml: 1 }} />}

      <Notification />
      {!downLG && <Profile />}
    </>
  )
}
