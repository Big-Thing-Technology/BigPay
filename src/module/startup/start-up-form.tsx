'use client'

import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import LogoSection from '@/components/logo'
import { APP_LANDING_PATH } from '@/config'
import AuthCard from '@/module/auth/AuthCard'
import Typography from '@mui/material/Typography'
import { Backdrop, CircularProgress, FormHelperText, InputLabel } from '@mui/material'
import OutlinedInput from '@mui/material/OutlinedInput'
import { useRef, useState } from 'react'
import { useCallApi } from '@/hooks/useCallApi'
import {
  CreateOrganizationError,
  CreateOrganizationReq,
  CreateOrganizationRes,
} from '../../../server-functions/organization/create-organization'
import { apiRoutes } from '@/constant/api-routes'
import Button from '@mui/material/Button'
import AnimateButton from '@/components/@extended/AnimateButton'
import { useRouter } from 'next/navigation'

export const StartUpForm = () => {
  const router = useRouter()
  const orgRef = useRef<HTMLInputElement | null>(null)
  const [errorMess, setErrorMess] = useState('')

  const { promiseFunc: newOrg, loading } = useCallApi<
    CreateOrganizationRes,
    CreateOrganizationError,
    CreateOrganizationReq
  >({
    url: apiRoutes.organization.create,
    options: {
      method: 'POST',
    },
    handleSuccess() {
      router.push('/')
      // enqueueSnackbar('Sent forgot password email!', { variant: 'success' })
    },
    handleError(status, message) {
      setErrorMess(message)
    },
    nonCallInit: true,
  })

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault()
        newOrg({
          name: String(orgRef?.current?.value),
        })
      }}
    >
      <Backdrop sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Grid container>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <LogoSection to={APP_LANDING_PATH} />
          </Stack>
        </Grid>
        <Grid item xs={12} sx={{ '& > div': { margin: '24px auto' } }}>
          <AuthCard border>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Grid container spacing={1}>
                  <Grid item xs={12} sx={{ textAlign: 'center' }}>
                    <Typography variant="h4">Create Your First Organization</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={1}>
                      <InputLabel
                        htmlFor="startup"
                        sx={{
                          fontWeight: '400',
                          fontSize: '14px',
                          marginBottom: '8px',
                        }}
                      >
                        Organization Name
                      </InputLabel>
                      <OutlinedInput
                        fullWidth
                        error={errorMess.length > 0}
                        id="startup"
                        type="text"
                        name="startup"
                        placeholder="Enter Organization Name"
                        inputProps={{}}
                        inputRef={orgRef}
                      />
                    </Stack>
                    <FormHelperText
                      error
                      id="helper-text-create-org"
                      sx={{
                        visibility: errorMess.length > 0 ? 'visible' : 'hidden',
                        fontWeight: '400',
                        fontSize: '10px',
                      }}
                    >
                      {errorMess}
                    </FormHelperText>
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
                        sx={{
                          fontWeight: '500',
                          fontSize: '16px',
                          mt: '24px',
                        }}
                      >
                        Create
                      </Button>
                    </AnimateButton>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </AuthCard>
        </Grid>
      </Grid>
    </form>
  )
}
