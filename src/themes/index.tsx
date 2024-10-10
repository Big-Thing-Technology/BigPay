import { ReactNode, useEffect, useMemo, useState } from 'react'

// material-ui
import {
  createTheme,
  Theme,
  ThemeOptions,
  ThemeProvider,
  TypographyVariantsOptions,
} from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import StyledEngineProvider from '@mui/material/StyledEngineProvider'

// project-imports
import Palette from './palette'
import Typography from './typography'
import CustomShadows from './shadows'
import componentsOverride from './overrides'
import { NextAppDirEmotionCacheProvider } from './emotionCache'

import { HEADER_HEIGHT, ThemeMode } from '@/config'

// types
import { CustomShadowProps } from '@/types/theme'
import { useIsMounted } from '@/hooks/useIsMounted'
import useConfig from '@/hooks/useConfig'
import { useCatchDarkScheme } from '@/hooks/useCatchDarkScheme'
import getWindowScheme from '@/utils/get-window-scheme'

type ThemeCustomizationProps = {
  children: ReactNode
}

// ==============================|| DEFAULT THEME - MAIN  ||============================== //

export default function ThemeCustomization({ children }: ThemeCustomizationProps) {
  const { mode, presetColor, fontFamily, themeContrast } = useConfig()
  const mounted = useIsMounted()

  const { setPrefersDarkMode, prefersDarkMode: currentIsDark } = useCatchDarkScheme()

  const [themeMode, setThemeMode] = useState<ThemeMode>(ThemeMode.LIGHT)

  useEffect(() => {
    if (mounted) {
      const isDarkMode = getWindowScheme()
      setPrefersDarkMode(isDarkMode)
    }
  }, [mounted])

  useEffect(() => {
    if (mode === ThemeMode.AUTO) {
      setThemeMode(currentIsDark ? ThemeMode.DARK : ThemeMode.LIGHT)
    } else {
      setThemeMode(mode)
    }
  }, [mode, currentIsDark])

  const theme: Theme = useMemo<Theme>(
    () => Palette(themeMode, presetColor, themeContrast),
    [themeMode, presetColor, themeContrast]
  )

  const themeTypography: TypographyVariantsOptions = useMemo<TypographyVariantsOptions>(
    () => Typography(fontFamily),
    [fontFamily]
  )
  const themeCustomShadows: CustomShadowProps = useMemo<CustomShadowProps>(
    () => CustomShadows(theme),
    [theme]
  )

  const themeOptions: ThemeOptions = useMemo(
    () => ({
      breakpoints: {
        values: {
          xs: 0,
          sm: 768,
          md: 1024,
          lg: 1266,
          xl: 1440,
        },
      },
      mixins: {
        toolbar: {
          minHeight: HEADER_HEIGHT,
          paddingTop: 8,
          paddingBottom: 8,
        },
      },
      palette: theme.palette,
      shape: {
        borderRadius: 8,
      },
      customShadows: themeCustomShadows,
      typography: themeTypography,
    }),
    [theme, themeTypography, themeCustomShadows]
  )

  const themes: Theme = createTheme(themeOptions)
  themes.components = componentsOverride(themes)

  return (
    <StyledEngineProvider injectFirst>
      <NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
        <ThemeProvider theme={themes}>
          <CssBaseline enableColorScheme />
          {children}
        </ThemeProvider>
      </NextAppDirEmotionCacheProvider>
    </StyledEngineProvider>
  )
}
