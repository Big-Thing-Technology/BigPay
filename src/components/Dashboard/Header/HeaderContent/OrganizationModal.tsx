import { Dispatch, SetStateAction } from 'react'
import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Add } from 'iconsax-react'
import Box from '@mui/material/Box'
import MainCard from '@/components/MainCard'
import { useRouter } from 'next/navigation'
import Divider from '@mui/material/Divider'

interface OrganizationProps {
  handlerOrganization: (orgId: string) => void
}

function Organization({ handlerOrganization }: OrganizationProps) {
  const OrganizationData = [
    {
      id: 'bigpay',
      name: 'bigpay',
      active: true,
      isDeleted: false,
      transactionsAmount: 10,
      balance: 0,
      createdDate: '2024-10-19T05:29:35.366Z',
      updatedDate: null,
    },
    {
      id: 'bigdev',
      name: 'bigdev',
      active: true,
      isDeleted: false,
      transactionsAmount: 34,
      balance: 0,
      createdDate: '2024-10-19T05:29:35.366Z',
      updatedDate: null,
    },
    {
      id: 'bigstore',
      name: 'bigstore',
      active: true,
      isDeleted: false,
      transactionsAmount: 67,
      balance: 0,
      createdDate: '2024-10-19T05:29:35.366Z',
      updatedDate: null,
    },
  ]

  return (
    <>
      {OrganizationData.map((organization: any) => (
        <MainCard
          content={false}
          sx={{
            bgcolor: 'primary.main',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Box
            onClick={() => handlerOrganization(organization.id)}
            key={organization.id}
            sx={{
              width: '100%',
              px: 5,
              py: 3,
              '&:hover': {
                bgcolor: 'primary.lighter',
                borderColor: 'primary.lighter',
                cursor: 'pointer',
              },
            }}
          >
            <Typography variant="h4" color="common.white" sx={{ fontWeight: 700 }}>
              {organization.name}
            </Typography>
          </Box>
        </MainCard>
      ))}
    </>
  )
}

type OrganizationModalType = {
  isOpen: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export default function OrganizationModal({ isOpen, setOpen }: OrganizationModalType) {
  const closeModal = () => {
    setOpen(false)
  }
  const router = useRouter()
  const handlerSwitchOrganization = (orgId: string) => {
    router.push(`/client/${orgId}`)
    setOpen(false)
  }
  return (
    <Dialog
      open={isOpen}
      fullWidth
      maxWidth="xs"
      onClose={closeModal}
      scroll="paper"
      sx={{ '& .MuiDialog-paper': { p: 0 }, '& .MuiBackdrop-root': { opacity: '0.5 !important' } }}
    >
      <DialogTitle>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h4">Select Organization</Typography>
          <Button startIcon={<Add />} onClick={closeModal} color="primary">
            Add New
          </Button>
        </Stack>
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ p: 2.5 }}>
        <Stack spacing={2}>
          <Organization handlerOrganization={handlerSwitchOrganization} />
        </Stack>
      </DialogContent>
    </Dialog>
  )
}
