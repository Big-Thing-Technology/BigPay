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
import { routes } from '@/constant/routes'

// ==============================|| MAIN LOGO ||============================== //

interface Props {
  // reverse?: boolean
  isIcon?: boolean
  sx?: SxProps
  to?: To
}

export default function LogoSection({ isIcon, sx, to }: Props) {
  return (
    <ButtonBase disableRipple component={Link} href={!to ? routes.home : to} sx={sx}>
      {isIcon ? <LogoIcon /> : <Logo />}
    </ButtonBase>
  )
}
