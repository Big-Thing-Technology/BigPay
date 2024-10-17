'use client'

// material-ui
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'

// project-imports
import AuthSlider from './auth-slider'

// ==============================|| AUTHENTICATION - WRAPPER ||============================== //

export const AuthLayout = ({ children }: { children: any }) => {
  return (
    <Box sx={{ minHeight: '100vh' }}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        sx={{ minHeight: '100vh', bgcolor: 'background.paper' }}
      >
        <Grid item xs={12}>
          <Grid
            item
            xs={12}
            container
            justifyContent="center"
            alignItems="center"
            sx={{
              minHeight: {
                xs: 'calc(100vh - 210px)',
                sm: 'calc(100vh - 134px)',
                md: 'calc(100vh - 112px)',
              },
            }}
          >
            <Grid
              item
              sx={{
                display: 'flex',
                justifyContent: 'center',
                flex: 1,
                padding: 4,
                minHeight: '100vh',
                '& > .MuiPaper-root > .MuiBox-root': { minHeight: '100%', display: 'flex' },
              }}
            >
              {children}
            </Grid>
            <Grid
              item
              sx={{
                display: { xs: 'none', lg: 'flex' },
                width: 580,
                overflow: 'hidden',
                alignSelf: 'stretch',
                position: 'relative',
                bgcolor: 'primary.main',
              }}
            >
              <Box
                component="img"
                src="./auth/ellipse-3.svg"
                alt="ellipse 3"
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: 'auto',
                  height: 'auto',
                }}
              />

              <Box
                component="img"
                src="./auth/ellipse-4.svg"
                alt="ellipse 4"
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  width: 'auto',
                  height: 'auto',
                }}
              />

              <AuthSlider />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}
