// next
import Link from 'next/link'

// material-ui
import ButtonBase from '@mui/material/ButtonBase'
import { SxProps } from '@mui/system'

// third-party
import { To } from 'history'

// project-imports
import Logo from './LogoMain'
import LogoIcon from './LogoIcon'
import { APP_CLIENT_PATH } from '@/config'

// ==============================|| MAIN LOGO ||============================== //

interface Props {
  isIcon?: boolean
  sx?: SxProps
  to?: To
}

export default function LogoSection({ isIcon, sx, to }: Props) {
  return (
    <ButtonBase disableRipple component={Link} href={!to ? APP_CLIENT_PATH : to} sx={sx}>
      {isIcon ? <LogoIcon /> : <Logo />}
    </ButtonBase>
  )
}
