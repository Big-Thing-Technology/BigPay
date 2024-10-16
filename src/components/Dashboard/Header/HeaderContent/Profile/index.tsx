import { ReactNode, SyntheticEvent, useRef, useState } from 'react'
import { useTheme } from '@mui/material/styles'
import ButtonBase from '@mui/material/ButtonBase'
import CardContent from '@mui/material/CardContent'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Popper from '@mui/material/Popper'
import Stack from '@mui/material/Stack'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import ProfileTab from './ProfileTab'
import SettingTab from './SettingTab'
import Avatar from '@/components/@extended/Avatar'
import MainCard from '@/components/MainCard'
import Transitions from '@/components/@extended/Transitions'
import { ThemeMode } from '@/config'
import { Profile, Setting2 } from 'iconsax-react'
import { useCookies } from 'react-cookie'
import { USER_TOKEN } from '@/utils/cookies-key'
import { useInfoUser } from '@/atom/useInfoUser'
import { firebaseAuth } from '@/lib/firebase/config'

interface TabPanelProps {
  children?: ReactNode
  dir?: string
  index: number
  value: number
}

// tab panel wrapper
function TabPanel({ children, value, index, ...other }: TabPanelProps) {
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
      sx={{ p: 1 }}
    >
      {value === index && children}
    </Box>
  )
}

function a11yProps(index: number) {
  return {
    id: `profile-tab-${index}`,
    'aria-controls': `profile-tabpanel-${index}`,
  }
}

// ==============================|| HEADER CONTENT - PROFILE ||============================== //

export default function ProfilePage() {
  const theme = useTheme()
  const { userInfo, clearValue } = useInfoUser()

  const [, , removeCookies] = useCookies([USER_TOKEN])
  const handleLogout = async () => {
    clearValue()
    removeCookies(USER_TOKEN)
    try {
      await firebaseAuth.signOut()
    } catch (e) {
      throw new Error('Google sign in failed', e || '')
    }
  }

  const anchorRef = useRef<any>(null)
  const [open, setOpen] = useState(false)
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleClose = (event: MouseEvent | TouchEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }
    setOpen(false)
  }

  const [value, setValue] = useState(0)

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <ButtonBase
        sx={{
          p: 0.25,
          borderRadius: 1,
          '&:hover': {
            bgcolor:
              theme.palette.mode === ThemeMode.DARK ? 'secondary.light' : 'secondary.lighter',
          },
          '&:focus-visible': {
            outline: `2px solid ${theme.palette.secondary.dark}`,
            outlineOffset: 2,
          },
        }}
        aria-label="open profile"
        ref={anchorRef}
        aria-controls={open ? 'profile-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <Avatar alt={userInfo?.fullName || 'Avatar'} src={userInfo?.avatar} />
      </ButtonBase>
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 9],
              },
            },
          ],
        }}
      >
        {({ TransitionProps }) => (
          <Transitions type="grow" position="top-right" in={open} {...TransitionProps}>
            <Paper
              sx={{
                boxShadow: theme.customShadows.z1,
                width: 290,
                minWidth: 240,
                maxWidth: 290,
                [theme.breakpoints.down('md')]: {
                  maxWidth: 250,
                },
                borderRadius: 1.5,
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard border={false} content={false}>
                  <CardContent sx={{ px: 2.5, pt: 3 }}>
                    <Grid container justifyContent="space-between" alignItems="center">
                      <Grid item>
                        <Stack direction="row" spacing={1.25} alignItems="center">
                          <Avatar alt={userInfo?.fullName || 'Avatar'} src={userInfo?.avatar} />
                          <Stack>
                            <Typography variant="subtitle1">
                              {userInfo ? userInfo.fullName : ''}
                            </Typography>
                            <Typography variant="body2" color="secondary">
                              {userInfo ? userInfo.email : ''}
                            </Typography>
                          </Stack>
                        </Stack>
                      </Grid>
                    </Grid>
                  </CardContent>

                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs
                      variant="fullWidth"
                      value={value}
                      onChange={handleChange}
                      aria-label="profile tabs"
                    >
                      <Tab
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                          textTransform: 'capitalize',
                        }}
                        icon={
                          <Profile size={18} style={{ marginBottom: 0, marginRight: '10px' }} />
                        }
                        label="Profile"
                        {...a11yProps(0)}
                      />
                      <Tab
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                          textTransform: 'capitalize',
                        }}
                        icon={
                          <Setting2 size={18} style={{ marginBottom: 0, marginRight: '10px' }} />
                        }
                        label="Setting"
                        {...a11yProps(1)}
                      />
                    </Tabs>
                  </Box>
                  <TabPanel value={value} index={0} dir={theme.direction}>
                    <ProfileTab handleLogout={handleLogout} />
                  </TabPanel>
                  <TabPanel value={value} index={1} dir={theme.direction}>
                    <SettingTab />
                  </TabPanel>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </Box>
  )
}
