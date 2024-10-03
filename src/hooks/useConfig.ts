import { useContext } from 'react'
import { ConfigContext } from '@/config-context'

// ==============================|| HOOKS - CONFIG  ||============================== //

export default function useConfig() {
  return useContext(ConfigContext)
}
