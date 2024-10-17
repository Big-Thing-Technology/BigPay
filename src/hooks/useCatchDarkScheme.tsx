import { useEffect, useState } from 'react'
import { useIsMounted } from '@/hooks/useIsMounted'
import getWindowScheme from '@/utils/get-window-scheme'

export const useCatchDarkScheme = () => {
  const [prefersDarkMode, setPrefersDarkMode] = useState(false)

  const mounted = useIsMounted()

  useEffect(() => {
    if (mounted) {
      const isDarkMode = getWindowScheme()
      setPrefersDarkMode(isDarkMode)
    }
  }, [mounted])

  return {
    prefersDarkMode,
    setPrefersDarkMode,
  }
}
