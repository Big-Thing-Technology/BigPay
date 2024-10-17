'use client'

import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { Backdrop, CircularProgress, FormHelperText, InputLabel } from '@mui/material'
import { useRef, useState } from 'react'
import { useCallApi } from '@/hooks/useCallApi'
import {
  CreateOrganizationError,
  CreateOrganizationReq,
  CreateOrganizationRes,
} from '../../../server-functions/organization/create-organization'
import { useRouter } from 'next/navigation'
import { apiUrl, getUrlApi } from '@/utils/get-url-api'
import { useTranslation } from '@/translation'
import { useCookies } from 'react-cookie'
import { USER_TOKEN } from '@/utils/cookies-key'
import OutlinedInput from '@mui/material/OutlinedInput'
import AnimateButton from '@/components/@extended/AnimateButton'
import Button from '@mui/material/Button'
import { enqueueSnackbar } from 'notistack'
import { firebaseAuth } from '@/lib/firebase/config'

export const StartUpForm = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const orgRef = useRef<HTMLInputElement | null>(null)
  const [errorMess, setErrorMess] = useState('')
  const [, , removeCookies] = useCookies([USER_TOKEN])

  const { promiseFunc: newOrg, loading } = useCallApi<
    CreateOrganizationRes,
    CreateOrganizationError,
    CreateOrganizationReq
  >({
    url: getUrlApi(apiUrl.organization.create),
    options: {
      method: 'POST',
    },
    handleSuccess() {
      enqueueSnackbar(t('createFirstOrganizationSuccessfully'), { variant: 'success' })
      router.push('/')
    },
    handleError(status, message) {
      setErrorMess(message)
    },
    nonCallInit: true,
  })

  const handleLogout = async () => {
    removeCookies(USER_TOKEN)
    try {
      await firebaseAuth.signOut()
    } catch (e) {
      throw new Error('Google sign in failed', e || '')
    }
  }

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
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
            <Typography
              variant="h6"
              sx={{
                fontWeight: '600',
                fontSize: '20px',
                marginBottom: '24px',
              }}
            >
              {t('createOrganization')}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                textDecoration: 'none',
                cursor: 'pointer',
                color: 'primary.main',
                fontWeight: '500',
                fontSize: '14px',
              }}
              onClick={handleLogout}
            >
              {t('backLogin')}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <InputLabel
              htmlFor="startup"
              sx={{ fontWeight: '400', fontSize: '14px', marginBottom: '8px' }}
            >
              {t('organizationName')}
            </InputLabel>
            <OutlinedInput
              fullWidth
              error={errorMess.length > 0}
              id="startup"
              type="text"
              name="startup"
              placeholder={t('enterOrganizationName')}
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
            {t(errorMess)}
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
              {t('createOrganizationBtn')}
            </Button>
          </AnimateButton>
        </Grid>
      </Grid>
    </form>
  )
}
