// ** React Imports
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import MuiTab from '@mui/material/Tab'

// ** Icons Imports
import AccountOutline from 'mdi-material-ui/AccountOutline'
import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'
import InformationOutline from 'mdi-material-ui/InformationOutline'

// ** Demo Tabs Imports
import TabInfo from 'src/views/account-settings/TabInfo'
import TabAccount from 'src/views/account-settings/TabAccount'
import TabSecurity from 'src/views/account-settings/TabSecurity'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'

const Tab = styled(MuiTab)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    minWidth: 100
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: 67
  }
}))

const TabName = styled('span')(({ theme }) => ({
  lineHeight: 1.71,
  fontSize: '0.875rem',
  marginLeft: theme.spacing(2.4),
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}))

const AccountSettings = () => {
  // ** State
  const [value, setValue] = useState('account')

  const [userInfo, setUserInfo] = useState(null)
  const [userInfoCopy, setUserInfoCopy] = useState(null)

  const router = useRouter()

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/NextTeam/api/user?id=' + router.query.id, { method: 'GET' })

        const jsonData = await response.json()
        setUserInfo({ ...jsonData })
        setUserInfoCopy({ ...jsonData })
        console.log('data: ', jsonData)
      } catch (error) {
        console.log('Error fetching data:', error)
      }
    }
    fetchData()
  }, [router.query.id])

  return (
    <Card>
      <TabContext value={value}>
        <TabList
          onChange={handleChange}
          aria-label='account-settings tabs'
          sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
        >
          <Tab
            value='account'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccountOutline />
                <TabName>Account</TabName>
              </Box>
            }
          />
          <Tab
            value='security'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LockOpenOutline />
                <TabName>Security</TabName>
              </Box>
            }
          />
          <Tab
            value='info'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <InformationOutline />
                <TabName>Info</TabName>
              </Box>
            }
          />
        </TabList>

        <TabPanel sx={{ p: 0 }} value='account'>
          <TabAccount
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            userInfoCopy={userInfoCopy}
            setUserInfoCopy={setUserInfoCopy}
          />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='security'>
          <TabSecurity userInfo={userInfo} userInfoCopy={userInfoCopy} setUserInfoCopy={setUserInfoCopy} />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='info'>
          <TabInfo
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            userInfoCopy={userInfoCopy}
            setUserInfoCopy={setUserInfoCopy}
          />
        </TabPanel>
      </TabContext>
    </Card>
  )
}

export default AccountSettings
