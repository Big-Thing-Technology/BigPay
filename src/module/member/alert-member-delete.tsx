import { useTheme } from '@mui/material/styles'
import { Dialog, DialogContent } from '@mui/material'
import { PopupTransition } from '@/components/@extended/Transitions'
import Stack from '@mui/material/Stack'
import { ThemeMode } from '@/config'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Avatar from '@/components/@extended/Avatar'
import { Trash } from 'iconsax-react'
import { enqueueSnackbar } from 'notistack'

interface Props {
  open: boolean
  modalToggler: (state: boolean) => void
  member?: any | null
}

export default function AlertMemberDelete({ open, modalToggler, member }: Props) {
  const theme = useTheme()
  const closeModal = () => modalToggler(false)

  const deleteMember = async () => {
    closeModal()
    enqueueSnackbar('Delete member successfully', { variant: 'success' })
  }

  return (
    <Dialog
      open={open}
      onClose={closeModal}
      keepMounted
      TransitionComponent={PopupTransition}
      maxWidth="xs"
      aria-labelledby="column-delete-title"
      aria-describedby="column-delete-description"
    >
      <DialogContent sx={{ mt: 2, my: 1 }}>
        <Stack alignItems="center" spacing={3.5}>
          <Avatar
            color="error"
            sx={{
              width: 72,
              height: 72,
              fontSize: '1.75rem',
              color:
                theme.palette.mode === ThemeMode.DARK
                  ? theme.palette.common.white
                  : theme.palette.error[100],
            }}
            src={member?.avatar ?? ''}
            alt={member?.fullName ?? ''}
          >
            <Trash />
          </Avatar>
          <Stack spacing={2}>
            <Typography variant="h4" align="center">
              Are you sure you want to delete?
            </Typography>
            <Typography align="center">
              By deleting
              <Typography variant="subtitle1" component="span">
                {' '}
                {member?.fullName ?? ''}{' '}
              </Typography>
              , all task assigned to that member will also be deleted.
            </Typography>
          </Stack>

          <Stack direction="row" spacing={2} sx={{ width: 1 }}>
            <Button fullWidth onClick={closeModal} color="secondary" variant="outlined">
              Cancel
            </Button>
            <Button fullWidth color="error" variant="contained" onClick={deleteMember} autoFocus>
              Delete
            </Button>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  )
}
