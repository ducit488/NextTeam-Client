// ** MUI Imports
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import useMediaQuery from '@mui/material/useMediaQuery'
import InputAdornment from '@mui/material/InputAdornment'

// ** Icons Imports
import Menu from 'mdi-material-ui/Menu'
import Magnify from 'mdi-material-ui/Magnify'

// ** Components
import ModeToggler from 'src/@core/layouts/components/shared-components/ModeToggler'
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'
import NotificationDropdown from 'src/@core/layouts/components/shared-components/NotificationDropdown'
import { Button, Grid, Link, Stack, Typography } from '@mui/material'
import VerticalNavHeader from 'src/@core/layouts/components/vertical/navigation/VerticalNavHeader'

const pages = ['Products', 'Pricing', 'Blog']

const AppBarContent = props => {
  // ** Props
  const { hidden, settings, saveSettings, toggleNavVisibility } = props

  // ** Hook
  const hiddenSm = useMediaQuery(theme => theme.breakpoints.down('sm'))

  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
        {/* {hidden ? (
          <IconButton
            color='inherit'
            onClick={toggleNavVisibility}
            sx={{ ml: -2.75, ...(hiddenSm ? {} : { mr: 3.5 }) }}
          >
            <Menu />
          </IconButton>
        ) : null} */}
        <VerticalNavHeader></VerticalNavHeader>
      </Box>
      <Stack direction='row' gap={12}>
        <Link href='/' underline='hover'>
          <b>Giới thiệu</b>
        </Link>
        <Link href='/events' underline='hover'>
          <b>Sự kiện</b>
        </Link>
        <Link href='/clubs' underline='hover'>
          <b>Câu lạc bộ</b>
        </Link>
        <Link href='/dashboard' underline='hover'>
          <b>Dashboard</b>
        </Link>
      </Stack>
      <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center' }}>
        {/* <ModeToggler settings={settings} saveSettings={saveSettings} />
        <NotificationDropdown />
        <UserDropdown /> */}

        <Grid item xs={12}>
          <Link href='/auth/login'>
            <Button variant='contained' sx={{ marginRight: 3.5 }}>
              Đăng nhập
            </Button>
          </Link>
          <Link href='/auth/register'>
            <Button type='reset' variant='outlined' color='secondary'>
              Đăng ký
            </Button>
          </Link>
          <Link href='/user/info'>
            <Button>My Account</Button>
          </Link>
        </Grid>
      </Box>
    </Box>
  )
}

export default AppBarContent
