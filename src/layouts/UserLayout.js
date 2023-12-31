// ** MUI Imports
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'

// ** Layout Imports
// !Do not remove this Layout import
import DashboardLayout from 'src/@core/layouts/DashboardLayout'
import AdminLayout from 'src/@core/layouts/AdminLayout'

// ** Navigation Imports
import { adminLayoutVavigation, landingLayoutVavigation, dashboardLayoutVavigation, memberLayoutNavigation } from 'src/navigation'

// ** Component Import
import VerticalLandingBarContent from './components/vertical/LandingAppContent'
import VerticalDashboardAppBarContent from './components/vertical/DashboardAppBarContent'
import VerticalAdminAppBarContent from './components/vertical/AdminAppBarContent'

// ** Hook Import
import { useSettings } from 'src/@core/hooks/useSettings'
import BlankLayout from 'src/@core/layouts/LandingLayout'
import { useRouter } from 'next/router'
import Decentralization, { RoleContext } from './Decentralization'
import { useCookies } from 'react-cookie'
import { getUserInfo, getUserSubrole } from 'src/utils/info'
import { useContext, useEffect, useState } from 'react'

const UserLayout = ({ children }) => {
	// ** Hooks
	const { settings, saveSettings } = useSettings()

	/**
	 *  The below variable will hide the current layout menu at given screen size.
	 *  The menu will be accessible from the Hamburger icon only (Vertical Overlay Menu).
	 *  You can change the screen size from which you want to hide the current layout menu.
	 *  Please refer useMediaQuery() hook: https://mui.com/components/use-media-query/,
	 *  to know more about what values can be passed to this hook.
	 *  ! Do not change this value unless you know what you are doing. It can break the template.
	 */
	const hidden = useMediaQuery(theme => theme.breakpoints.down('md'))

	const UpgradeToProImg = () => {
		return (
			<Box sx={{ mx: 'auto' }}>
				<a
					target='_blank'
					rel='noreferrer'
					href='https://themeselection.com/products/materio-mui-react-nextjs-admin-template/'
				>
					<img
						width={230}
						alt='upgrade to premium'
						src={`/images/misc/upgrade-banner-${settings.mode}.png`}
					/>
				</a>
			</Box>
		)
	}

	var contextValue = {}

	const router = useRouter()
	
	const [cookies] = useCookies(['userData', 'clubData'])
	const [userData, setUserData] = useState('?')
	const [userSubrole, setUserSubrole] = useState()

	const roleContext = useContext(RoleContext)

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


	return (
		<>
			{router.pathname.startsWith('/dashboard') ? (
				<DashboardLayout
					hidden={hidden}
					settings={settings}
					saveSettings={saveSettings}
					verticalNavItems={roleContext.clubRole == '1' ? memberLayoutNavigation(): dashboardLayoutVavigation()} // Navigation Items
					afterVerticalNavMenuContent={UpgradeToProImg}
					verticalAppBarContent={(
						props // AppBar Content
					) => (
						<VerticalDashboardAppBarContent
							hidden={hidden}
							settings={settings}
							saveSettings={saveSettings}
							toggleNavVisibility={props.toggleNavVisibility}
						/>
					)}
				>
					{children}
					{/* <UpgradeToProButton /> */}
				</DashboardLayout>
			) : router.pathname.startsWith('/admin') ? (
				<AdminLayout
					hidden={hidden}
					settings={settings}
					saveSettings={saveSettings}
					verticalNavItems={adminLayoutVavigation()} // Navigation Items
					afterVerticalNavMenuContent={UpgradeToProImg}
					verticalAppBarContent={(
						props // AppBar Content
					) => (
						<VerticalAdminAppBarContent
							hidden={hidden}
							settings={settings}
							saveSettings={saveSettings}
							toggleNavVisibility={props.toggleNavVisibility}
						/>
					)}
				>
					{children}
					{/* <UpgradeToProButton /> */}
				</AdminLayout>
			) : (
				<BlankLayout
					hidden={hidden}
					settings={settings}
					saveSettings={saveSettings}
					verticalNavItems={landingLayoutVavigation()} // Navigation Items
					afterVerticalNavMenuContent={UpgradeToProImg}
					verticalAppBarContent={(
						props // AppBar Content
					) => (
						<VerticalLandingBarContent
							hidden={hidden}
							settings={settings}
							saveSettings={saveSettings}
							toggleNavVisibility={props.toggleNavVisibility}
						/>
					)}
				>
					{children}
					{/* <UpgradeToProButton /> */}
				</BlankLayout>
			)}
		</>
	)
}

export default UserLayout
