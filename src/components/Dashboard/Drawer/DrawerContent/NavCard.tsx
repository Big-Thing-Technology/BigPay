// material-ui
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// project-imports
import MainCard from '@/components/MainCard'
import AnimateButton from '@/components/@extended/AnimateButton'
import Box from '@mui/material/Box'

// assets

// ==============================|| DRAWER CONTENT - NAV CARD ||============================== //

export default function NavCard() {
  return (
    <MainCard sx={{ bgcolor: 'secondary.lighter', m: 3 }}>
      <Stack alignItems="center" spacing={2.5}>
        {/* <CardMedia component="img" image={avatar} /> */}
        <Box
          sx={{
            height: '100px',
            position: 'relative',
          }}
        >
          <picture>
            <source media="(prefers-color-scheme: dark)" srcSet="/logo/8-resized.svg" />
            <img
              src="/user/customer-support-1.png"
              alt="logo"
              style={{ cursor: 'pointer', width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </picture>
        </Box>
        <Stack alignItems="center">
          <Typography variant="h5">Need Support?</Typography>
          <Typography variant="h6" color="secondary">
            1 Day Response Time
          </Typography>
        </Stack>
        <AnimateButton>
          <Button
            variant="shadow"
            size="small"
            component={Link}
            href="https://phoenixcoded.authordesk.app/"
            target="_blank"
          >
            Get Support
          </Button>
        </AnimateButton>
      </Stack>
    </MainCard>
  )
}
