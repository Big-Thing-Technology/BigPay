// import useSWR, { mutate } from 'swr'
import { useMemo } from 'react'

import { MenuProps } from '@/types/menu'

// TODO: fetch state of drawer open
export function useGetMenuMaster() {
  const data = { isDashboardDrawerOpened: true, isComponentDrawerOpened: true }
  const isLoading = false

  return useMemo(
    () => ({
      menuMaster: data as MenuProps,
      menuMasterLoading: isLoading,
    }),
    [data, isLoading]
  )
}
