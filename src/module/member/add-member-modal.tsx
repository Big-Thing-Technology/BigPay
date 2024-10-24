import { Dialog, DialogContent, DialogTitle, ListItem } from '@mui/material'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import List from '@mui/material/List'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@/components/@extended/Avatar'
import React from 'react'
import { PopupTransition } from '@/components/@extended/Transitions'

interface Props {
  open: boolean
  modalToggler: (state: boolean) => void
}

export default function AddMemberModal({ open, modalToggler }: Props) {
  const closeModal = () => modalToggler(false)

  const invitations = [
    {
      id: '6708c1982ae01c77e6f595fb',
      avatar:
        'https://lh3.googleusercontent.com/a/ACg8ocJn5K8n3BXLvJnQvvRn6O5GlzG2ecRj3TVZ4HgQjU4f129a2jk=s96-c',
      email: 'toakira123@gmail.com',
    },
    {
      id: '6708c1982ae01c77e6f595fc',
      avatar:
        'https://lh3.googleusercontent.com/a/ACg8ocJb3-5OftzbiT_WH0zPZ2unecHQY9ePOUMb2y_XNR37RgdjiE3u=s96-c',
      email: 'devquocky@gmail.com',
    },
  ]

  return (
    <>
      {open && (
        <Dialog
          open={open}
          onClose={closeModal}
          TransitionComponent={PopupTransition}
          aria-labelledby="dialog-member-add-label"
          aria-describedby="dialog-member-add-description"
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
              <Typography variant="h3">Add Member</Typography>
              <Button onClick={closeModal} color="inherit" variant="outlined">
                Close
              </Button>
            </Stack>
          </DialogTitle>
          <Divider />
          <DialogContent>
            <Stack direction="row" justifyContent="space-between" spacing={2}>
              <TextField
                id="email"
                name="email"
                fullWidth
                placeholder="Enter email"
                // value={formik.values.code}
                // onChange={formik.handleChange}
                // error={Boolean(formik.errors.code)}
              />

              <Button type="submit" color="primary" variant="contained" aria-label="directions">
                Invite
              </Button>
            </Stack>
            <List sx={{ mt: 2 }}>
              {invitations.map((invitation) => (
                <ListItem
                  key={invitation.id}
                  sx={{
                    py: 2,
                    '&:hover': {
                      bgcolor: 'primary.lighter',
                      borderColor: 'primary.lighter',
                      cursor: 'pointer',
                    },
                  }}
                >
                  <ListItemAvatar>
                    <Avatar alt={invitation.email} size="sm" src={invitation.avatar} />
                  </ListItemAvatar>
                  <ListItemText primary={invitation.email} />
                  <Button variant="outlined" color="inherit" size="small">
                    Cancel
                  </Button>
                </ListItem>
              ))}
            </List>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
