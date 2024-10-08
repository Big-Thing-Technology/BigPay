import Link from 'next/link'
import Image from 'next/image'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import LogoSection from '@/components/logo'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { firebaseAuth } from '@/lib/firebase/config'
import { useCookies } from 'react-cookie'
import { USER_TOKEN } from '@/utils/cookies-key'
import AuthCard from '@/module/auth/AuthCard'
import AuthWrapper from '@/module/auth/AuthWrapper'
import AuthSocButton from '@/module/auth/AuthSocButton'

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
    <AuthWrapper>
      <Grid container spacing={3} sx={{ minHeight: '100%', alignContent: 'space-between' }}>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <LogoSection />
          </Stack>
        </Grid>
        <Grid item xs={12} sx={{ '& > div': { margin: '24px auto' } }}>
          <AuthCard border>
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
          </AuthCard>
        </Grid>
        <Grid item xs={12}>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="baseline"
            sx={{ mb: { xs: -0.5, sm: 0.5 } }}
          >
            <Typography align="center">
              By signing up, you confirm to have read BigPay
              <Typography
                component={Link}
                href="#"
                sx={{ textDecoration: 'none', px: 0.5 }}
                color="primary"
              >
                Privacy Policy
              </Typography>
              and agree to the
              <Typography
                component={Link}
                href="#"
                sx={{ textDecoration: 'none', pl: 0.5 }}
                color="primary"
              >
                Terms of Service
              </Typography>
              .
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </AuthWrapper>
  )
}
