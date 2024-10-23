import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import Transitions from '@/components/@extended/Transitions'
import Grid from '@mui/material/Grid'
import MainCard from '@/components/MainCard'
import Stack from '@mui/material/Stack'
import Avatar from '@/components/@extended/Avatar'
import React from 'react'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import { ListItem } from '@mui/material'
import ListItemIcon from '@mui/material/ListItemIcon'
import { CallCalling, Link2, Location, Sms } from 'iconsax-react'
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'
import Link from '@mui/material/Link'
import { PatternFormat } from 'react-number-format'

export default function MemberView({ data }: any) {
  const theme = useTheme()
  const matchDownMD = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Transitions type="slide" direction="down" in>
      <Grid container spacing={2.5} sx={{ pl: { xs: 0, sm: 5, md: 6, lg: 10, xl: 12 } }}>
        <Grid item xs={12} sm={5} md={4} lg={4} xl={4}>
          <MainCard>
            {/* <Chip */}
            {/*  label={data.status} */}
            {/*  size="small" */}
            {/*  color="primary" */}
            {/*  sx={{ position: 'absolute', right: 10, top: 10, fontSize: '0.675rem' }} */}
            {/* /> */}
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={2.5} alignItems="center">
                  <Avatar alt={data.fullName as string} size="xl" src={data.avatar} />
                  <Stack spacing={0.5} alignItems="center">
                    <Typography variant="h5">{data.fullName}</Typography>
                    <Typography color="secondary">{data.isOwner ? 'Owner' : 'Employee'}</Typography>
                  </Stack>
                </Stack>
              </Grid>
              {/* <Grid item xs={12}> */}
              {/*  <Divider /> */}
              {/* </Grid> */}
              {/* <Grid item xs={12}> */}
              {/*  <Stack direction="row" justifyContent="space-around" alignItems="center"> */}
              {/*    <Stack spacing={0.5} alignItems="center"> */}
              {/*      <Typography variant="h5">{data.age}</Typography> */}
              {/*      <Typography color="secondary">Age</Typography> */}
              {/*    </Stack> */}
              {/*    <Divider orientation="vertical" flexItem /> */}
              {/*    <Stack spacing={0.5} alignItems="center"> */}
              {/*      <Typography variant="h5">{data.progress}%</Typography> */}
              {/*      <Typography color="secondary">Progress</Typography> */}
              {/*    </Stack> */}
              {/*    <Divider orientation="vertical" flexItem /> */}
              {/*    <Stack spacing={0.5} alignItems="center"> */}
              {/*      <Typography variant="h5">{data.orders}</Typography> */}
              {/*      <Typography color="secondary">Visits</Typography> */}
              {/*    </Stack> */}
              {/*  </Stack> */}
              {/* </Grid> */}
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <List
                  aria-label="main mailbox folders"
                  sx={{ py: 0, '& .MuiListItemIcon-root': { minWidth: 32 } }}
                >
                  <ListItem>
                    <ListItemIcon>
                      <Sms size={18} />
                    </ListItemIcon>
                    <ListItemSecondaryAction>
                      <Typography align="right">{data.email}</Typography>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CallCalling size={18} />
                    </ListItemIcon>
                    <ListItemSecondaryAction>
                      <Typography align="right">
                        <PatternFormat
                          displayType="text"
                          format="####.###.###"
                          mask="_"
                          defaultValue={data.phoneNumber}
                        />
                      </Typography>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Location size={18} />
                    </ListItemIcon>
                    <ListItemSecondaryAction>
                      <Typography align="right">Viet Nam</Typography>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Link2 size={18} />
                    </ListItemIcon>
                    <ListItemSecondaryAction>
                      <Link align="right" href="https://google.com" target="_blank">
                        https://anshan.dh.url
                      </Link>
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </MainCard>
        </Grid>
        <Grid item xs={12} sm={7} md={8} lg={8} xl={8}>
          <Stack spacing={2.5}>
            <MainCard title="Personal Details">
              <List sx={{ py: 0 }}>
                <ListItem divider={!matchDownMD}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Full Name</Typography>
                        <Typography>{data.fullName}</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Nick Name</Typography>
                        <Typography>
                          Mr. {data.firstName} {data.lastName}
                        </Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem divider={!matchDownMD}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Country</Typography>
                        <Typography>Viet Nam</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Zip Code</Typography>
                        <Typography>
                          <PatternFormat
                            displayType="text"
                            format="### ###"
                            mask="_"
                            defaultValue="100000"
                          />
                        </Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Stack spacing={0.5}>
                    <Typography color="secondary">Address</Typography>
                    <Typography>Cau Giay District., Ha Noi City</Typography>
                  </Stack>
                </ListItem>
              </List>
            </MainCard>
            <MainCard title="About me">
              <Typography color="secondary">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                Ipsum has been the industry standard dummy text ever since the 1500s, when an
                unknown printer took a galley of type and scrambled it to make a type specimen book.
              </Typography>
            </MainCard>
          </Stack>
        </Grid>
      </Grid>
    </Transitions>
  )
}
