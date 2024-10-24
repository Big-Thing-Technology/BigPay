import Image from 'next/image'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { firebaseAuth } from '@/lib/firebase/config'
import { useCookies } from 'react-cookie'
import { USER_TOKEN } from '@/utils/cookies-key'
import AuthSocButton from '@/module/auth/auth-soc-button'
import { useTranslation } from '@/translation'
import { enqueueSnackbar } from 'notistack'
import { useRouter } from 'next/navigation'

const imgFacebook = 'logo/facebook.svg'
const imgTwitter = 'logo/twitter.svg'
const imgGoogle = 'logo/google.svg'

export default function LoginForm() {
  const { t } = useTranslation()
  const router = useRouter()
  const [, setCookies] = useCookies([USER_TOKEN])

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider()

    try {
      const result = await signInWithPopup(firebaseAuth, provider)
      const userGoogleToken = await result.user.getIdToken(true)

      setCookies(USER_TOKEN, userGoogleToken)
      enqueueSnackbar(t('loginSuccessfully'), { variant: 'success' })
    } catch (e: any) {
      enqueueSnackbar(t('errorLoginPleaseReload'), { variant: 'error' })
      if (e.message === 'Firebase: Error (auth/popup-closed-by-user).') {
        router.push('/')
      }
    }
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sx={{ textAlign: 'center' }}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="h4">{t('welcomeToTheBigpay')}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>{t('signInWithYourAccount')}</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <AuthSocButton onClick={handleGoogleSignIn}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Image src={imgGoogle} alt="Google" width={16} height={16} />
                <Typography>{t('signInWithGoogle')}</Typography>
              </Stack>
            </AuthSocButton>
          </Grid>
          <Grid item xs={12}>
            <AuthSocButton>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Image src={imgFacebook} alt="Facebook" width={16} height={16} />
                <Typography>{t('signInWithFacebook')}</Typography>
              </Stack>
            </AuthSocButton>
          </Grid>
          <Grid item xs={12}>
            <AuthSocButton>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Image src={imgTwitter} alt="Twitter" width={16} height={16} />
                <Typography>{t('signInWithTwitter')}</Typography>
              </Stack>
            </AuthSocButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
