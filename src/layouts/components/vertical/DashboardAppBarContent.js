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
import { Typography } from '@mui/material'
import Link from 'next/link'

import { useSettings } from 'src/@core/hooks/useSettings'
import { useCookies } from 'react-cookie'

const AppBarContent = props => {
	const [cookies, setCookies] = useCookies(['clubData'])

	// ** Props
	const { hidden, settings, saveSettings, toggleNavVisibility } = props

	// ** Hook
	const hiddenSm = useMediaQuery(theme => theme.breakpoints.down('sm'))
	const [clubData, setclubData, removeclubData] = useCookies(['clubData'])

	return (
		<Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
			<Box className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
				{hidden ? (
					<IconButton
						color='inherit'
						onClick={toggleNavVisibility}
						sx={{ ml: -2.75, ...(hiddenSm ? {} : { mr: 3.5 }) }}
					>
						<Menu />
					</IconButton>
				) : null}
			</Box>
			<Typography variant='h5'>Câu lạc bộ: {clubData['clubData']?.subname}</Typography>
			{/* <TextField
				placeholder='Tìm kiếm...'
				size='small'
				sx={{ '& .MuiOutlinedInput-root': { borderRadius: 4 }, width: '50%' }}
				InputProps={{
					startAdornment: (
						<InputAdornment position='start'>
							<Magnify fontSize='small' />
						</InputAdornment>
					)
				}}
			/> */}
			{/* <Typography variant='h4' sx={{ color: '#F27123' }}>
        FU-DEVER
      </Typography> */}
			<Box className='actions-right' sx={{ display: 'flex', alignItems: 'center' }}>
				<ModeToggler settings={settings} saveSettings={saveSettings} />
				<NotificationDropdown />
				<UserDropdown settings={settings} saveSettings={saveSettings} />
			</Box>
		</Box>
	)
}

export default AppBarContent
