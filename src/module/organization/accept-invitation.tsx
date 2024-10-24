'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import AnimateButton from '@/components/@extended/AnimateButton'
import { useCookies } from 'react-cookie'
import { APP_LOGIN_PATH } from '@/config'
import { USER_TOKEN } from '@/utils/cookies-key'

export default function AcceptInvitation() {
  const query = useSearchParams()
  const inviteToken = query.get('invite-token')
  const router = useRouter()

  const [cookies] = useCookies([USER_TOKEN])
  if (!cookies.token) {
    router.push(`${APP_LOGIN_PATH}?invite-token=${inviteToken}`)
  }

  const acceptInvitation = async () => {
    router.push(APP_LOGIN_PATH)
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Box sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
          <Typography variant="h3" align="center">
            Hi, You&#39;ve been invited to join: BigStore on BigPay E-Wallet.
          </Typography>
          <Typography color="secondary" sx={{ mb: 0.5, mt: 1.25 }} align="center">
            To accept, click the button below.
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <AnimateButton>
          <Button
            disableElevation
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            color="primary"
            onClick={acceptInvitation}
          >
            Accept
          </Button>
        </AnimateButton>
      </Grid>
    </Grid>
  )
}
