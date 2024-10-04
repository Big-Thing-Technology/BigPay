'use client'

// ==============================|| ERROR 404 ||============================== //

import { useTheme } from '@mui/material/styles'
import { useMediaQuery } from '@mui/material'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Link from 'next/link'
import { APP_CLIENT_PATH } from '@/config'
import Image from 'next/image'

const errorImage = '/maintenance/403img.svg'

export default function Error403Page() {
  const theme = useTheme()
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Grid
      container
      spacing={10}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '100vh', pt: 2, pb: 1, overflow: 'hidden' }}
    >
      <Grid item xs={12}>
        <Stack direction="row">
          <Grid item>
            <Box sx={{ width: 300 }}>
              <Image
                src={errorImage}
                alt="mantis"
                width={matchDownSM ? 350 : 396}
                height={matchDownSM ? 325 : 370}
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                }}
              />
            </Box>
          </Grid>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Stack spacing={2} justifyContent="center" alignItems="center">
          <Typography variant="h1">Forbidden</Typography>
          <Typography
            color="text.secondary"
            align="center"
            sx={{ width: { xs: '73%', sm: '61%' } }}
          >
            You are not allowed to access this resource!!!
          </Typography>
          <Button component={Link} href={APP_CLIENT_PATH} variant="contained">
            Back To Home
          </Button>
        </Stack>
      </Grid>
    </Grid>
  )
}
