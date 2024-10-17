'use client'

import { useTheme } from '@mui/material/styles'
import { useRouter } from 'next/navigation'
import { useCatchDarkScheme } from '@/hooks/useCatchDarkScheme'
import { useTranslation } from '@/translation'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import { MenuItem, Select } from '@mui/material'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import AuthCard from '@/module/auth/auth-card'

export const AuthWrapper = ({ children }: { children: any }) => {
  const theme = useTheme()
  const { t, setLocal, locale } = useTranslation()
  const router = useRouter()
  const { prefersDarkMode } = useCatchDarkScheme()
  const languageSelect = [
    { key: 'vi', label: 'Vietnamese', img: 'VN-flag.svg' },
    { key: 'en', label: 'English', img: 'US-flag.svg' },
  ]
  const privacyText = t('textPrivacy').split('{replace}')
  return (
    <Grid container spacing={3} sx={{ minHeight: '100%', alignContent: 'space-between' }}>
      <Grid item xs={12}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          sx={{ maxWidth: '100vw' }}
        >
          <Box
            sx={{
              width: { xs: '150px', sm: '150px', md: '200px' },
              height: '40px',
              position: 'relative',
            }}
          >
            <picture>
              <source media="(prefers-color-scheme: dark)" srcSet="/logo/8.svg" />
              <img
                onClick={() => router.push('/')}
                src="/logo/4-resized.svg"
                alt="logo"
                style={{ cursor: 'pointer', width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </picture>
          </Box>
          <Select
            inputProps={{
              'aria-label': 'Without label',
              sx: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: { xs: 'flex-end', sm: 'flex-start' },
                marginRight: '4px',
              },
            }}
            displayEmpty
            value={locale}
            onChange={(e) => {
              const selectedLocale = e.target.value
              setLocal({ locale: selectedLocale })
            }}
            sx={{
              width: { xs: 70, sm: 70, md: 70 },
              height: { xs: 40, sm: 40, md: 40 },
            }}
            renderValue={(selected) => {
              const language = languageSelect.find((lang) => lang.key === selected)
              return (
                <Box
                  sx={{
                    display: 'flex',
                    fontSize: { xs: '0.67rem', sm: '1rem' },
                  }}
                >
                  <img src={language?.img} alt={`${language?.label} flag`} style={{ width: 20 }} />
                  {/* <Box
                    component="span"
                    sx={{
                      display: { xs: 'none', sm: 'inline' },
                      marginLeft: '8px',
                    }}
                  >
                    {language?.label}
                  </Box> */}
                </Box>
              )
            }}
          >
            {languageSelect.map((language) => (
              <MenuItem
                value={language.key}
                key={language.key}
                sx={{
                  padding: { xs: '6px 8px', sm: '8px 12px' },
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: { xs: '0.67rem', sm: '0.67rem', md: '1rem' },
                  }}
                >
                  <img
                    src={language.img}
                    alt={`${language.label} flag`}
                    style={{ width: 20, marginRight: 4 }}
                  />
                  <Box
                    component="span"
                    sx={{
                      fontSize: { xs: '0.67rem', sm: '0.67rem', md: '1rem' },
                    }}
                  >
                    {language.label}
                  </Box>
                </Box>
              </MenuItem>
            ))}
          </Select>
        </Stack>
      </Grid>
      <Grid item xs={12} sx={{ '& > div': { margin: '24px auto' } }}>
        <AuthCard border>{children}</AuthCard>
      </Grid>
      <Grid item xs={12}>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="baseline"
          sx={{ mb: { xs: -0.5, sm: 0.5 } }}
        >
          <Typography align="center" sx={{ fontWeight: '400', fontSize: '12px' }}>
            {privacyText[0]}
            <Typography
              component={Link}
              href="#"
              sx={{
                color: !prefersDarkMode ? 'inherit' : theme.palette.primary.main,
                textDecoration: 'none',
                px: 0.5,
                fontWeight: '500',
                fontSize: '12px',
              }}
            >
              {t('privacyPolicy')}
            </Typography>
            {privacyText[1]}
            <Typography
              component={Link}
              href="#"
              sx={{
                color: !prefersDarkMode ? 'inherit' : theme.palette.primary.main,
                textDecoration: 'none',
                px: 0.5,
                fontWeight: '500',
                fontSize: '12px',
              }}
            >
              {t('termService')}
            </Typography>
            {privacyText[2]}
          </Typography>
        </Stack>
      </Grid>
    </Grid>
  )
}
