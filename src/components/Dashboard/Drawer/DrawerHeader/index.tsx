// material-ui
import { useTheme } from '@mui/material/styles'

// project-imports
import DrawerHeaderStyled from './DrawerHeaderStyled'

import Logo from '@/components/logo'
import { HEADER_HEIGHT } from '@/config'

interface Props {
  open: boolean
}

// ==============================|| DRAWER HEADER ||============================== //

export default function DrawerHeader({ open }: Props) {
  const theme = useTheme()

  return (
    <DrawerHeaderStyled
      theme={theme}
      open={open}
      sx={{
        minHeight: HEADER_HEIGHT,
        width: 'inherit',
        paddingTop: '8px',
        paddingBottom: '8px',
        paddingLeft: open ? '24px' : 0,
      }}
    >
      <Logo sx={{ width: open ? 'auto' : 52, height: 'auto' }} />
    </DrawerHeaderStyled>
  )
}
