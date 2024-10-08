import { createContext, ReactElement, useMemo } from 'react'

// project-imports
import config, { ThemeMode } from './config'

// types
import { CustomizationProps, FontFamily, I18n, PresetColor } from '@/types/config'
import useLocalStorage from '@/hooks/useLocalStorage'

// initial state
const initialState: CustomizationProps = {
  ...config,
  onChangeContainer: () => {},
  onChangeLocalization: () => {},
  onChangeMode: () => {},
  onChangePresetColor: () => {},
  onChangeMiniDrawer: () => {},
  onChangeMenuCaption: () => {},
  onChangeFontFamily: () => {},
  onChangeContrast: () => {},
}

// ==============================|| CONFIG CONTEXT & PROVIDER ||============================== //

const ConfigContext = createContext(initialState)

type ConfigProviderProps = {
  children: ReactElement
}

function ConfigProvider({ children }: ConfigProviderProps) {
  const [config, setConfig] = useLocalStorage('able-pro-material-next-ts-config', initialState)

  const onChangeContainer = (container: string) => {
    const containerValue: boolean = container !== 'fluid'
    setConfig({
      ...config,
      container: containerValue,
    })
  }

  const onChangeLocalization = (lang: I18n) => {
    setConfig({
      ...config,
      i18n: lang,
    })
  }

  const onChangeMode = (mode: ThemeMode) => {
    setConfig({
      ...config,
      mode,
    })
  }

  const onChangePresetColor = (theme: PresetColor) => {
    setConfig({
      ...config,
      presetColor: theme,
    })
  }

  const onChangeMiniDrawer = (miniDrawer: boolean) => {
    setConfig({
      ...config,
      miniDrawer,
    })
  }

  const onChangeContrast = (themeContrast: string) => {
    const contrastValue: boolean = themeContrast === 'contrast'
    setConfig({
      ...config,
      themeContrast: contrastValue,
    })
  }

  const onChangeMenuCaption = (menuCaption: string) => {
    const captionValue: boolean = menuCaption === 'caption'
    setConfig({
      ...config,
      menuCaption: captionValue,
    })
  }

  const onChangeFontFamily = (fontFamily: FontFamily) => {
    setConfig({
      ...config,
      fontFamily,
    })
  }

  return useMemo(() => {
    return (
      <ConfigContext.Provider
        value={{
          ...config,
          onChangeContainer,
          onChangeLocalization,
          onChangeMode,
          onChangePresetColor,
          onChangeMiniDrawer,
          onChangeMenuCaption,
          onChangeFontFamily,
          onChangeContrast,
        }}
      >
        {children}
      </ConfigContext.Provider>
    )
  }, [config])
}

export { ConfigProvider, ConfigContext }
