import type { DialogProps } from '@mui/material'
import { Dialog, DialogContent, DialogTitle, ListItem } from '@mui/material'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import React, { useState } from 'react'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@/components/@extended/Avatar'
import ListItemText from '@mui/material/ListItemText'
import { PopupTransition } from '@/components/@extended/Transitions'
import List from '@mui/material/List'
import TextField from '@mui/material/TextField'

interface Props {
  open: boolean
  modalToggler: (state: boolean) => void
  member?: any | null
}

export default function EditMemberModal({ open, modalToggler, member }: Props) {
  const [transferOpen, setTransferOpen] = useState(false)

  const closeModal = () => {
    modalToggler(false)
    setTransferOpen(false)
  }

  const handleCloseModal: DialogProps['onClose'] = (_event, reason) => {
    // Handle backdrop click can close modal
    if (reason && reason === 'backdropClick') return

    closeModal()
  }

  return (
    <>
      {open && (
        <Dialog
          open={open}
          onClose={handleCloseModal}
          TransitionComponent={PopupTransition}
          aria-labelledby="dialog-member-edit-label"
          aria-describedby="dialog-member-edit-description"
          scroll="paper"
          sx={{
            '& .MuiDialog-paper': { p: 0 },
            '& .MuiBackdrop-root': { opacity: '0.5 !important' },
          }}
          maxWidth="xs"
          fullWidth
        >
          <DialogTitle>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="h3">Edit Member</Typography>
              <Button onClick={closeModal} color="inherit" variant="outlined">
                Close
              </Button>
            </Stack>
          </DialogTitle>
          <DialogContent>
            {transferOpen ? (
              <Stack alignItems="center" spacing={2}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar size="lg" src={member?.avatar ?? ''} alt={member?.fullName ?? ''} />
                  <Typography variant="h5" color="inherit" align="center">
                    {member.fullName}
                  </Typography>
                </Stack>
                <TextField id="email" name="email" fullWidth placeholder="Enter email" />
                <Button type="submit" color="primary" fullWidth variant="contained">
                  Type user email and click this button to start transfer
                </Button>
              </Stack>
            ) : (
              <List sx={{ mt: 0 }}>
                <ListItem
                  key={member.id}
                  sx={{
                    '&:hover': {
                      bgcolor: 'primary.lighter',
                      borderColor: 'primary.lighter',
                    },
                  }}
                >
                  <ListItemAvatar sx={{ pr: 2 }}>
                    <Avatar alt={member.email} size="lg" src={member.avatar} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={member.fullName}
                    primaryTypographyProps={{ variant: 'h5' }}
                  />
                  <Button
                    variant="outlined"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setTransferOpen(true)
                    }}
                  >
                    Transfer Owner
                  </Button>
                </ListItem>
              </List>
            )}
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
