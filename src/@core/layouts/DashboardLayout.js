// ** React Imports
import { useContext, useEffect, useLayoutEffect, useState } from 'react'

// ** MUI Imports
import Fab from '@mui/material/Fab'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'

// ** Icons Imports
import ArrowUp from 'mdi-material-ui/ArrowUp'

// ** Theme Config Import
import themeConfig from 'src/configs/themeConfig'

// ** Components
import AppBar from './components/vertical/dashboardAppBar'
import Navigation from './components/vertical/navigation'
import Footer from './components/shared-components/footer'
import ScrollToTop from 'src/@core/components/scroll-to-top'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { RoleContext } from 'src/layouts/Decentralization'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'
import { getUserInfo, getUserSubrole } from 'src/utils/info'

const VerticalLayoutWrapper = styled('div')({
	height: '100%',
	display: 'flex'
})

const MainContentWrapper = styled(Box)({
	flexGrow: 1,
	minWidth: 0,
	display: 'flex',
	minHeight: '100vh',
	flexDirection: 'column'
})

const ContentWrapper = styled('main')(({ theme }) => ({
	marginTop: 64,
	flexGrow: 1,
	width: '100%',
	padding: theme.spacing(6),
	transition: 'padding .25s ease-in-out',
	[theme.breakpoints.down('sm')]: {
		paddingLeft: theme.spacing(4),
		paddingRight: theme.spacing(4)
	}
}))

const managerRoute = [
	'/treasurer',
	'/attendances',
	'/member-approval',
	'/member-management',
	'/proposal-approval',
	'/notification-creator',
	'/event-creator',
	'/activity-creator',
	'/infrastructures',
	'/plans',
	'/reports'
]

const DashboardLayout = props => {
	// ** Props
	const { settings, children, scrollToTop } = props

	// ** Vars
	const { contentWidth } = settings
	const navWidth = themeConfig.navigationSize

	// ** States
	const [navVisible, setNavVisible] = useState(false)

	// ** Toggle Functions
	const toggleNavVisibility = () => {
		// setNavVisible(!navVisible)
	}

	const router = useRouter()

	const [cookies] = useCookies(['userData', 'clubData'])

	const [userData, setUserData] = useState('?')

	const [userSubrole, setUserSubrole] = useState()
	var contextValue = {}

	useEffect(() => {
		;(async () => {
			const res = await getUserInfo(cookies.userData)
			if (res?.isAdmin == undefined) {
				setUserData('???')
			} else {
				setUserData(res)
			}
		})()
	}, [cookies])

	useEffect(() => {
		if (cookies['clubData'])
			(async () => {
				const res = await getUserSubrole(cookies.userData, cookies.clubData.clubId)
				setUserSubrole(res)
			})()
	}, [cookies, userData])

	useEffect(() => {
		if (userData?.isAdmin == undefined && userData == '?') return
		if (userData?.isAdmin || userData == '???') {
			router.push('/')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userData])

	const roleContext = useContext(RoleContext)

	useEffect(() => {
		if (roleContext?.clubRole == undefined) return
		if (roleContext?.clubRole == 1) {
			if (managerRoute.includes(router.pathname.slice(10))) {
				router.push('/dashboard')
			}
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [roleContext])

	return (
		<>
			<VerticalLayoutWrapper className='layout-wrapper'>
				<Navigation
					navWidth={navWidth}
					navVisible={navVisible}
					setNavVisible={setNavVisible}
					toggleNavVisibility={toggleNavVisibility}
					{...props}
				/>
				<MainContentWrapper className='layout-content-wrapper'>
					<AppBar toggleNavVisibility={toggleNavVisibility} {...props} />

					<ContentWrapper
						className='layout-page-content'
						sx={{
							...(contentWidth === 'boxed' && {
								mx: 'auto',
								'@media (min-width:1440px)': { maxWidth: 1440 },
								'@media (min-width:1200px)': { maxWidth: '100%' }
							})
						}}
					>
						{children}
					</ContentWrapper>

					<Footer {...props} />

					<DatePickerWrapper sx={{ zIndex: 11 }}>
						<Box id='react-datepicker-portal'></Box>
					</DatePickerWrapper>
				</MainContentWrapper>
			</VerticalLayoutWrapper>

			{scrollToTop ? (
				scrollToTop(props)
			) : (
				<ScrollToTop className='mui-fixed'>
					<Fab color='primary' size='small' aria-label='scroll back to top'>
						<ArrowUp />
					</Fab>
				</ScrollToTop>
			)}
		</>
	)
}

export default DashboardLayout
