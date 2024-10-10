// material-ui
import { styled } from '@mui/material/styles'
import AppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'

// project-imports
import { DRAWER_WIDTH, MINI_DRAWER_WIDTH } from '@/config'

// ==============================|| HEADER - APP BAR STYLED ||============================== //

interface Props extends MuiAppBarProps {
  open?: boolean
}

const AppBarStyled = styled(AppBar, { shouldForwardProp: (prop) => prop !== 'open' })<Props>(
  ({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(!open && {
      width: `calc(100% - ${MINI_DRAWER_WIDTH})`,
    }),
    ...(open && {
      marginLeft: DRAWER_WIDTH,
      width: `calc(100% - ${DRAWER_WIDTH}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  })
)

export default AppBarStyled
