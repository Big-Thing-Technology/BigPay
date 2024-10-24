import { Dialog, DialogContent, DialogTitle, ListItem } from '@mui/material'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import React from 'react'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@/components/@extended/Avatar'
import ListItemText from '@mui/material/ListItemText'
import List from '@mui/material/List'

interface Props {
  open: boolean
  modalToggler: (state: boolean) => void
  member?: any | null
}

export default function EditMemberModal({ open, modalToggler, member }: Props) {
  const closeModal = () => modalToggler(false)

  return (
    <>
      {open && (
        <Dialog
          open={open}
          onClose={closeModal}
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
                <ListItemAvatar>
                  <Avatar alt={member.email} size="sm" src={member.avatar} />
                </ListItemAvatar>
                <ListItemText primary={member.fullName} />
                <Button variant="outlined" color="inherit" size="small">
                  Transfer Owner
                </Button>
              </ListItem>
            </List>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
