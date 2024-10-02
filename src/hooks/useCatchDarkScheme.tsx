import { useEffect, useState } from 'react'
import { useIsMounted } from '@/hooks/useIsMounted'

export const useCatchDarkScheme = () => {
  const [prefersDarkMode, setPrefersDarkMode] = useState(false)

  const mounted = useIsMounted()

  useEffect(() => {
    function handleDarkModePrefferedChange() {
      const doesMatch = window.matchMedia('(prefers-color-scheme: dark)').matches
      setPrefersDarkMode(doesMatch)
    }

    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', handleDarkModePrefferedChange)

    return () => {
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .removeEventListener('change', handleDarkModePrefferedChange)
    }
  }, [mounted])

  return {
    prefersDarkMode,
    setPrefersDarkMode,
  }
}
