// next
import Link from 'next/link'
import { usePathname } from 'next/navigation'

// material-ui
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import Avatar from '@mui/material/Avatar'
import Chip from '@mui/material/Chip'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

// project-imports
import Dot from '@/components/@extended/Dot'
import IconButton from '@/components/@extended/IconButton'
import useConfig from '@/hooks/useConfig'
import { NavActionType, ThemeMode } from '@/config'

// types
import { NavItemType } from '@/types/menu'
import { useEffect } from 'react'
import { useMenu } from '@/atom/useMenu'

// ==============================|| NAVIGATION - ITEM ||============================== //

interface Props {
  item: NavItemType
  level: number
  isParents?: boolean
  setSelectedID?: () => void
}

export default function NavItem({ item, level, isParents = false, setSelectedID }: Props) {
  const theme = useTheme()
  const downLG = useMediaQuery(theme.breakpoints.down('lg'))
  const { menuMaster, setMenuMasterState } = useMenu()
  const drawerOpen = menuMaster.isDashboardDrawerOpened
  const openItem = menuMaster.openedItem

  const { mode } = useConfig()
  // let itemTarget: LinkTarget = '_self'
  // if (item.target) {
  //   itemTarget = '_blank'
  // }

  const isSelected = openItem === item.id

  const Icon = item.icon!
  const itemIcon = item.icon ? <Icon variant="Bulk" size={drawerOpen ? 20 : 22} /> : false

  const pathname = usePathname()

  // active menu item on page load
  useEffect(() => {
    if (pathname === item.url) {
      setMenuMasterState((prev) => ({
        ...prev,
        menuMaster: { ...prev.menuMaster, openedHorizontalItem: item.id! },
      }))
    }
  }, [pathname])

  const textColor = theme.palette.mode === ThemeMode.DARK ? 'secondary.400' : 'secondary.main'
  const iconSelectedColor = 'primary.main'

  const itemHandler = () => {
    if (downLG) {
      setMenuMasterState((prev) => ({
        ...prev,
        menuMaster: { ...prev.menuMaster, isDashboardDrawerOpened: false },
      }))
    }

    if (isParents && setSelectedID) {
      setSelectedID()
    }
  }

  const listItemButtonPl = () => {
    if (level === 2) return 3.25
    if (!drawerOpen) return 1.5
    if (level <= 3) return (level * 20) / 8
    return (level * 20 + (level - 3) * 10) / 8
  }

  return (
    <Box sx={{ position: 'relative' }}>
      <ListItemButton
        component={Link}
        href={item.url!}
        // target={itemTarget}
        disabled={item.disabled}
        selected={isSelected}
        sx={{
          zIndex: 1201,
          pl: listItemButtonPl,
          py: !drawerOpen && level === 1 ? 1.25 : 1,
          ...(drawerOpen && {
            '&:hover': { bgcolor: 'transparent' },
            '&.Mui-selected': { '&:hover': { bgcolor: 'transparent' }, bgcolor: 'transparent' },
          }),
          ...(drawerOpen &&
            level === 1 && {
              mx: 1.25,
              my: 0.5,
              borderRadius: 1,
              '&:hover': { bgcolor: mode === ThemeMode.DARK ? 'divider' : 'secondary.200' },
              '&.Mui-selected': {
                color: iconSelectedColor,
                '&:hover': { color: iconSelectedColor },
              },
            }),
          ...(!drawerOpen && {
            px: 2.75,
            justifyContent: 'center',
            '&:hover': { bgcolor: 'transparent' },
            '&.Mui-selected': { '&:hover': { bgcolor: 'transparent' }, bgcolor: 'transparent' },
          }),
        }}
        onClick={() => itemHandler()}
      >
        {itemIcon && (
          <ListItemIcon
            sx={{
              minWidth: 38,
              color: isSelected ? iconSelectedColor : textColor,
              ...(!drawerOpen &&
                level === 1 && {
                  borderRadius: 1,
                  width: 46,
                  height: 46,
                  alignItems: 'center',
                  justifyContent: 'center',
                  '&:hover': {
                    bgcolor: mode === ThemeMode.DARK ? 'secondary.light' : 'secondary.200',
                  },
                }),
              ...(!drawerOpen &&
                isSelected && {
                  bgcolor: mode === ThemeMode.DARK ? 'secondary.100' : 'primary.lighter',
                  '&:hover': {
                    bgcolor: mode === ThemeMode.DARK ? 'secondary.200' : 'primary.lighter',
                  },
                }),
            }}
          >
            {itemIcon}
          </ListItemIcon>
        )}

        {!itemIcon && drawerOpen && (
          <ListItemIcon
            sx={{
              minWidth: 30,
            }}
          >
            <Dot size={isSelected ? 6 : 5} color={isSelected ? 'primary' : 'secondary'} />
          </ListItemIcon>
        )}

        {(drawerOpen || (!drawerOpen && level !== 1)) && (
          <ListItemText
            primary={
              <Typography
                variant="h6"
                sx={{
                  color: isSelected ? iconSelectedColor : textColor,
                  fontWeight: isSelected ? 500 : 400,
                }}
              >
                {item.title}
              </Typography>
            }
          />
        )}
        {(drawerOpen || (!drawerOpen && level !== 1)) && item.chip && (
          <Chip
            color={item.chip.color}
            variant={item.chip.variant}
            size={item.chip.size}
            label={item.chip.label}
            avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
          />
        )}
      </ListItemButton>
      {(drawerOpen || (!drawerOpen && level !== 1)) &&
        item?.actions &&
        item?.actions.map((action, index) => {
          const ActionIcon = action?.icon!
          const callAction = action?.function
          return (
            <IconButton
              key={index}
              {...(action.type === NavActionType.FUNCTION && {
                onClick: (event) => {
                  event.stopPropagation()
                  callAction()
                },
              })}
              {...(action.type === NavActionType.LINK && {
                component: Link,
                href: action.url,
                target: action.target ? '_blank' : '_self',
              })}
              color="secondary"
              variant="outlined"
              sx={{
                position: 'absolute',
                top: 12,
                right: 20,
                zIndex: 1202,
                width: 20,
                height: 20,
                p: 0.25,
                color: 'secondary.dark',
                borderColor: isSelected ? 'primary.light' : 'secondary.light',
                '&:hover': { borderColor: isSelected ? 'primary.main' : 'secondary.main' },
              }}
            >
              <ActionIcon
                size={12}
                color={
                  mode === ThemeMode.DARK
                    ? theme.palette.secondary[400]
                    : theme.palette.secondary.main
                }
                style={{ marginLeft: 1 }}
              />
            </IconButton>
          )
        })}
    </Box>
  )
}
