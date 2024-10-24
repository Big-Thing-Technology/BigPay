import { useMemo, useState } from 'react'

// material-ui
import { Theme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import Box from '@mui/material/Box'

// project-imports
import Profile from './Profile'
import Notification from './Notification'

import useConfig from '@/hooks/useConfig'
import Localization from '@/components/Dashboard/Header/HeaderContent/Localization'
import Button from '@mui/material/Button'
import OrganizationModal from '@/components/Dashboard/Header/HeaderContent/OrganizationModal'
import { useSearchParams } from 'next/navigation'

// ==============================|| HEADER - CONTENT ||============================== //

export default function HeaderContent() {
  const [isOpen, setIsOpen] = useState(false)
  const { i18n } = useConfig()
  const query = useSearchParams()

  const downLG = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'))

  const localization = useMemo(() => <Localization />, [i18n])

  return (
    <>
      <OrganizationModal isOpen={isOpen} setOpen={setIsOpen} />
      <Box sx={{ width: '100%', ml: { xs: 0, md: 2 } }}>
        <Button
          variant="outlined"
          size="medium"
          color="primary"
          onClick={() => {
            setIsOpen(true)
          }}
          sx={{
            color: 'primary.main',
            p: 1,
          }}
          title="Switch organization"
        >
          Organization: {query.get('orgId')}
        </Button>
      </Box>
      {!downLG && localization}
      {downLG && <Box sx={{ width: '100%', ml: 1 }} />}

      <Notification />
      {!downLG && <Profile />}
    </>
  )
}
