// ** Icon imports
import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'
import PaymentsIcon from '@mui/icons-material/Payments'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'
import HistoryIcon from '@mui/icons-material/History'
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange'
import NotificationsIcon from '@mui/icons-material/Notifications'
import AssignmentIcon from '@mui/icons-material/Assignment'
import CelebrationIcon from '@mui/icons-material/Celebration'
import AssessmentIcon from '@mui/icons-material/Assessment'
import Groups2Icon from '@mui/icons-material/Groups2'
import AddCommentIcon from '@mui/icons-material/AddComment'
import StorageIcon from '@mui/icons-material/Storage'
import PriceChangeIcon from '@mui/icons-material/PriceChange'
import FactCheckIcon from '@mui/icons-material/FactCheck'
import HowToRegIcon from '@mui/icons-material/HowToReg'
import NotificationAddIcon from '@mui/icons-material/NotificationAdd'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom'
import FilePresentIcon from '@mui/icons-material/FilePresent'
import SummarizeIcon from '@mui/icons-material/Summarize'
import { Account, Logout } from 'mdi-material-ui'
import { DoneOutline, Groups, Password } from '@mui/icons-material'

export const dashboardLayoutVavigation = () => {
	return [
		{
			title: 'Trang chủ',
			icon: HomeOutline,
			path: '/dashboard'
		},
		{
			sectionTitle: 'Thông tin'
		},
		{
			title: 'Thông báo',
			icon: NotificationsIcon,
			path: '/dashboard/notifications'
		},

		// {
		// 	title: 'Hoạt động',
		// 	icon: AssignmentIcon,
		// 	path: '/dashboard/activities'
		// },
		{
			title: 'Sự kiện',
			path: '/dashboard/events',
			icon: CelebrationIcon
		},
		{
			title: 'Điểm hoạt động',
			icon: AssessmentIcon,
			path: '/dashboard/ranking'
		},
		{
			title: 'Thành viên',
			icon: Groups2Icon,
			path: '/dashboard/members'
		},
		{
			sectionTitle: 'Tài chính'
		},
		{
			title: 'Khoản nộp',
			icon: PaymentsIcon,
			path: '/dashboard/payment-form'
		},
		{
			title: 'Quản lý quỹ',
			path: '/dashboard/transaction-history',
			icon: HistoryIcon
		},

		{
			sectionTitle: 'Tài liệu'
		},

		// {
		// 	title: 'Kho lưu trữ',
		// 	icon: StorageIcon,
		// 	path: '/dashboard/document-storage'
		// },
		{
			title: 'Đề xuất hoạt động',
			path: '/dashboard/activity-proposals',
			icon: AddCommentIcon
		},
		{
			sectionTitle: 'Quản lý'
		},
		{
			title: 'Quản lý quỹ',
			icon: PriceChangeIcon,
			path: '/dashboard/treasurer'
		},

		// {
		// 	title: 'Điểm danh',
		// 	icon: FactCheckIcon,
		// 	path: '/dashboard/attendances'
		// },
		{
			title: 'Duyệt thành viên',
			icon: HowToRegIcon,
			path: '/dashboard/member-approval'
		},
		{
			title: 'Quản lý thành viên',
			icon: HowToRegIcon,
			path: '/dashboard/member-management'
		},
		{
			title: 'Duyệt đề xuất',
			icon: HowToRegIcon,
			path: '/dashboard/proposal-approval'
		},
		{
			title: 'Quản lý thông báo',
			icon: NotificationAddIcon,
			path: '/dashboard/notification-creator'
		},
		{
			icon: NoteAddIcon,
			title: 'Quản lý sự kiện',
			path: '/dashboard/event-creator'
		},
		{
			icon: NoteAddIcon,
			title: 'Quản lý hoạt động',
			path: '/dashboard/activity-creator'
		},

		// {
		// 	icon: MeetingRoomIcon,
		// 	title: 'Cơ sở vật chất',
		// 	path: '/dashboard/infrastructures'
		// },
		{
			title: 'Kế hoạch',
			path: '/dashboard/plans',
			icon: FilePresentIcon
		},

		// {
		// 	title: 'Báo cáo',
		// 	path: '/dashboard/reports',
		// 	icon: SummarizeIcon
		// },
		{
			title: 'Điểm danh',
			path: '/dashboard/attendances',
			icon: DoneOutline
		},
		{
			title: 'Quản lí phòng ban',
			path: '/dashboard/department',
			icon: NoteAddIcon
		}
	]
}

export const memberLayoutNavigation = () => {
	return [
		{
			title: 'Trang chủ',
			icon: HomeOutline,
			path: '/dashboard'
		},
		{
			sectionTitle: 'Thông tin'
		},
		{
			title: 'Thông báo',
			icon: NotificationsIcon,
			path: '/dashboard/notifications'
		},

		// {
		// 	title: 'Hoạt động',
		// 	icon: AssignmentIcon,
		// 	path: '/dashboard/activities'
		// },
		{
			title: 'Sự kiện...',
			path: '/dashboard/events',
			icon: CelebrationIcon
		},
		{
			title: 'Điểm hoạt động',
			icon: AssessmentIcon,
			path: '/dashboard/ranking'
		},
		{
			title: 'Thành viên',
			icon: Groups2Icon,
			path: '/dashboard/members'
		},
		{
			sectionTitle: 'Tài chính'
		},
		{
			title: 'Khoản nộp',
			icon: PaymentsIcon,
			path: '/dashboard/payment-form'
		},
		{
			title: 'Quản lý quỹ',
			path: '/dashboard/transaction-history',
			icon: HistoryIcon
		},

		{
			sectionTitle: 'Tài liệu'
		},

		// {
		// 	title: 'Kho lưu trữ',
		// 	icon: StorageIcon,
		// 	path: '/dashboard/document-storage'
		// },
		{
			title: 'Đề xuất hoạt động',
			path: '/dashboard/activity-proposals',
			icon: AddCommentIcon
		}
	]
}

export const adminLayoutVavigation = () => {
	return [
		{
			title: 'Trang chủ',
			icon: HomeOutline,
			path: '/admin'
		},
		{
			title: 'Quản lí câu lạc bộ',
			icon: Groups2Icon,
			path: '/admin/club'
		},
		{
			title: 'Người dùng',
			icon: Account,
			path: '/admin/users'
		},
		{
			title: 'Thông báo',
			icon: NotificationsIcon,
			path: '/admin/notifications'
		},
		{
			title: 'Kế hoạch',
			path: '/admin/plans',
			icon: FilePresentIcon
		},

		// {
		// 	title: 'Báo cáo',
		// 	path: '/admin/reports',
		// 	icon: SummarizeIcon
		// },
		{
			icon: CelebrationIcon,
			title: 'Phê duyệt sự kiện',
			path: '/admin/events'
		},
		{
			icon: CelebrationIcon,
			title: 'Quản lý sự kiện',
			path: '/admin/event-creator'
		},
		{
			icon: Groups,
			title: 'Quản lý sinh viên',
			path: '/admin/students'
		}
	]
}

export const landingLayoutVavigation = () => {
	return [
		{
			title: 'Trang chủ',
			icon: HomeOutline,
			path: '/'
		},
		{
			title: 'Sự kiện',
			icon: HomeOutline,
			path: '/events'
		},
		{
			title: 'Câu lạc bộ',
			icon: HomeOutline,
			path: '/clubs'
		},
		{
			title: 'Đăng ký',
			icon: Login,
			path: '/auth/login',
			openInNewTab: true
		},
		{
			title: 'Đăng nhập',
			icon: Login,
			path: '/auth/register',
			openInNewTab: true
		},
		{
			title: 'Thông tin cá nhân của người dùng',
			icon: Account,
			path: '/user'
		},
		{
			title: 'Thông tin người dùng',
			icon: Account,
			path: '/user/info'
		},
		{
			title: 'Mật khẩu',
			icon: Password,
			path: '/user/password'
		}
	]
}
