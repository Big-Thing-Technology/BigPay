// material-ui
import { useTheme } from '@mui/material/styles'

// project-imports
import DrawerHeaderStyled from './DrawerHeaderStyled'

import Logo from '@/components/logo'
import { HEADER_HEIGHT } from '@/config'

// ==============================|| DRAWER HEADER ||============================== //

interface Props {
  open: boolean
}

export default function DrawerHeader({ open }: Props) {
  const theme = useTheme()

  return (
    <DrawerHeaderStyled
      theme={theme}
      open={open}
      sx={{
        minHeight: HEADER_HEIGHT,
        width: 'initial',
        paddingTop: '8px',
        paddingBottom: '8px',
        paddingLeft: open ? '24px' : 0,
      }}
    >
      <Logo isIcon={!open} sx={{ width: open ? 'auto' : 52, height: 'auto' }} />
    </DrawerHeaderStyled>
  )
}
