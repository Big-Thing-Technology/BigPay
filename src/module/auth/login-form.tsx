import Image from 'next/image'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { firebaseAuth } from '@/lib/firebase/config'
import { useCookies } from 'react-cookie'
import { USER_TOKEN } from '@/utils/cookies-key'
import AuthSocButton from '@/module/auth/auth-soc-button'

const imgFacebook = 'logo/facebook.svg'
const imgTwitter = 'logo/twitter.svg'
const imgGoogle = 'logo/google.svg'

export default function LoginForm() {
  const [, setCookies] = useCookies([USER_TOKEN])

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider()

    try {
      const result = await signInWithPopup(firebaseAuth, provider)
      const userGoogleToken = await result.user.getIdToken(true)

      setCookies(USER_TOKEN, userGoogleToken)
    } catch (e) {
      throw new Error('Google sign in failed', e || '')
    }
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sx={{ textAlign: 'center' }}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="h4">Welcome to the BigPay</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>Sign in with your account.</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <AuthSocButton onClick={handleGoogleSignIn}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Image src={imgGoogle} alt="Google" width={16} height={16} />
                <Typography>Sign In with Google</Typography>
              </Stack>
            </AuthSocButton>
          </Grid>
          <Grid item xs={12}>
            <AuthSocButton>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Image src={imgFacebook} alt="Facebook" width={16} height={16} />
                <Typography>Sign In with Facebook</Typography>
              </Stack>
            </AuthSocButton>
          </Grid>
          <Grid item xs={12}>
            <AuthSocButton>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Image src={imgTwitter} alt="Twitter" width={16} height={16} />
                <Typography>Sign In with Twitter</Typography>
              </Stack>
            </AuthSocButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
