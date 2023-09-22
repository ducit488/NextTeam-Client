// ** React Imports
import { useState, Fragment, useRef, useEffect } from 'react'
import { useCookies } from 'react-cookie'

// ** Next Import
import { useRouter } from 'next/router'
import {
  Button,
  ButtonGroup,
  ClickAwayListener,
  Grid,
  Grow,
  Link,
  MenuList,
  Modal,
  Paper,
  Popper,
  Stack
} from '@mui/material'

// ** MUI Imports
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

// **Toasify Imports
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// ** Icons Imports
import CogOutline from 'mdi-material-ui/CogOutline'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import EmailOutline from 'mdi-material-ui/EmailOutline'
import LogoutVariant from 'mdi-material-ui/LogoutVariant'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import MessageOutline from 'mdi-material-ui/MessageOutline'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import LockIcon from '@mui/icons-material/Lock'
import Groups3Icon from '@mui/icons-material/Groups3'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'

// ** Styled Components
const BadgeContentSpan = styled('span')(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: theme.palette.success.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
}))

const ClubModal = styled('Modal')(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  background: '#fff',
  boxShadow: 24,
  padding: 20,
  borderRadius: 8
}))

const UserDropdown = () => {
  // ** States
  const [anchorEl, setAnchorEl] = useState(null)
  const [open, setOpen] = useState(false)
  const [cookies, setCookie, removeCookie] = useCookies(['userData'])
  const [clubData, setclubData, removeclubData] = useCookies(['clubData'])
  const [clubOfMeData, setClubOfMeData] = useState([])

  useEffect(() => {
    fetch(`http://localhost:8080/club-user?action=view-my-list&userId=${cookies['userData']?.id}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
      .then(function (response) {
        return response.json()
      })
      .then(function (data) {
        setClubOfMeData(data)
      })
      .catch(error => console.error('Error:', error))
  }, [])

  // ** Hooks
  const router = useRouter()

  const handleDropdownOpen = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = url => {
    if (url) {
      router.push(url)
    }
    setAnchorEl(null)
  }

  const handleLogout = () => {
    removeCookie('userData')
    router.push('/auth/login')
  }

  const handleChange = event => {
    var clubData = {
      clubId: event.target.value
    }
    setSelectedValue(event.target.value)

    setclubData('clubData', JSON.stringify(clubData), { path: '/' })
    toast.success('Bạn đang được chuyển tới trang của câu lạc bộ.')

    router.push('/dashboard')
  }

  const styles = {
    py: 2,
    px: 4,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    color: 'text.primary',
    textDecoration: 'none',
    '& svg': {
      fontSize: '1.375rem',
      color: 'text.secondary'
    }
  }

  const anchorRef = useRef(null)
  const [selectedValue, setSelectedValue] = useState('')

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index)
    setOpenButton(false)
  }

  const handleToggle = () => {
    setOpenButton(prevOpen => !prevOpen)
  }

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }

    setOpen(false)
  }

  return (
    <Fragment>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <ClubModal>
          <Typography id='modal-modal-title' variant='h5' component='h2' textAlign={'center'} marginBottom={4}>
            Truy cập vào câu lạc bộ
          </Typography>
          <Stack direction={'row'} justifyContent={'center'}>
            <FormControl fullWidth>
              <InputLabel htmlFor='gender-select'>Câu lạc bộ</InputLabel>
              <Select
                label='Câu lạc bộ'
                id='club-select'
                name='club'
                onChange={e => handleChange(e)}
                value={selectedValue}
              >
                <MenuItem>Lựa chọn</MenuItem>

                {clubOfMeData.map(option => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.subname} - {option.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </ClubModal>
      </Modal>
      <Badge
        overlap='circular'
        onClick={handleDropdownOpen}
        sx={{ ml: 2, cursor: 'pointer' }}
        badgeContent={<BadgeContentSpan />}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Avatar
          alt={cookies['userData']?.lastname}
          onClick={handleDropdownOpen}
          sx={{ width: 40, height: 40 }}
          src={cookies['userData']?.avatarURL}
        />
      </Badge>
      <ToastContainer></ToastContainer>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleDropdownClose()}
        sx={{ '& .MuiMenu-paper': { width: 230, marginTop: 4 } }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Box sx={{ pt: 2, pb: 3, px: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Badge
              overlap='circular'
              badgeContent={<BadgeContentSpan />}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
              <Avatar
                alt={cookies['userData']?.lastname}
                src={cookies['userData']?.avatarURL}
                sx={{ width: '2.5rem', height: '2.5rem' }}
              />
            </Badge>
            <Box
              sx={{
                display: 'flex',
                marginLeft: 3,
                alignItems: 'flex-start',
                flexDirection: 'column'
              }}
            >
              <Typography sx={{ fontWeight: 600 }}>{cookies['userData']?.lastname}</Typography>
              <Typography
                variant='body2'
                sx={{
                  fontSize: '0.8rem',
                  color: 'text.disabled'
                }}
              >
                {cookies['userData']?.studentCode}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Divider sx={{ mt: 0, mb: 1 }} />
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
          <Box sx={styles}>
            <AccountOutline sx={{ marginRight: 2 }} />
            <Link href={`/profile/${cookies['userData']?.id}`} underline='none'>
              Hồ sơ cá nhân
            </Link>
          </Box>
        </MenuItem>
        <MenuItem
          sx={{ p: 0 }}
          onClick={() => {
            handleDropdownClose()
            setOpen(true)
          }}
        >
          <Box sx={styles}>
            <Groups3Icon sx={{ marginRight: 2 }} />
            <Typography color={'#F27123'}>CLB của bạn</Typography>
            {/* <Link href={`/profile/1`} underline='none'>
              CLB của bạn
            </Link> */}
          </Box>
        </MenuItem>
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
          <Box sx={styles}>
            <LockIcon sx={{ marginRight: 2 }} />
            <Link href='/user/password' underline='none'>
              Đổi mật khẩu
            </Link>
          </Box>
        </MenuItem>
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
          <Box sx={styles} onClick={handleLogout}>
            <LogoutVariant sx={{ marginRight: 2 }} />
            <Link underline='none'>Đăng xuất</Link>
          </Box>
        </MenuItem>
        {/* <Divider />
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
          <Box sx={styles}>
            <CogOutline sx={{ marginRight: 2 }} />
            Settings
          </Box>
        </MenuItem>
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
          <Box sx={styles}>
            <CurrencyUsd sx={{ marginRight: 2 }} />
            Pricing
          </Box>
        </MenuItem>
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
          <Box sx={styles}>
            <HelpCircleOutline sx={{ marginRight: 2 }} />
            FAQ
          </Box>
        </MenuItem>
        <Divider />
        <MenuItem sx={{ py: 2 }} onClick={() => handleDropdownClose('/pages/login')}>
          <LogoutVariant sx={{ marginRight: 2, fontSize: '1.375rem', color: 'text.secondary' }} />
          Logout
        </MenuItem> */}
      </Menu>
    </Fragment>
  )
}

export default UserDropdown
