import { useState, useEffect, Fragment } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import classes from './styles.module.scss'
import { useCookies } from 'react-cookie'
import { TextareaAutosize } from '@mui/base'
import SplitButton from './SplitButton'
import AccessTimeIcon from '@mui/icons-material/AccessTime'

import {
	Card,
	Box,
	CardContent,
	Container,
	Stack,
	Modal,
	Typography,
	Button,
	Divider,
	SwipeableDrawer,
	Drawer,
	Chip,
	Pagination,
	TablePagination,
	Backdrop,
	CircularProgress
} from '@mui/material'

import InfoIcon from '@mui/icons-material/Info'
import Groups2Icon from '@mui/icons-material/Groups2'
import CakeIcon from '@mui/icons-material/Cake'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import CloseIcon from '@mui/icons-material/Close'

import { getAllEvents, updateEventStatus } from 'src/api-utils/apiUtils'
import { toast } from 'react-toastify'
import moment from 'moment'

require('moment/locale/vi')

import ReviewButton from './ReviewButton'
import { translateDayOfWeek } from 'src/ultis/dateTime'

export default function EventDashboard() {
	const [events, setEvents] = useState([])
	const [selectedEvent, setSelectedEvent] = useState(null)
	const [feedback, setFeedback] = useState('')
	const [reviewLoading, setReviewLoading] = useState(false)
	const [pageLoading, setPageLoading] = useState(false)
	const [page, setPage] = useState(0)
	const [rowsPerPage, setRowsPerPage] = useState(10)
	const [rows, setRows] = useState([])

	const handleChangePage = (event, newPage) => {
		setPage(newPage)
	}

	const handleChangeRowsPerPage = event => {
		setRowsPerPage(+event.target.value)
		setPage(0)
	}

	useEffect(() => {
		setPageLoading(true)
		getAllEvents().then(response => {
			setPageLoading(false)
			console.log('response', response)
			setEvents(response)
			setRows(response)
		})
	}, [])

	const [state, setState] = useState({
		top: false,
		left: false,
		bottom: false,
		right: false
	})

	const toggleDrawer = (anchor, open) => event => {
		if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
			return
		}

		setState({ ...state, [anchor]: open })
	}

	const list = anchor => (
		<Box sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 500, padding: 4 }} role='presentation'>
			<Stack direction={'row'} marginBottom={2}>
				<Button variant='text'>
					<CloseIcon onClick={toggleDrawer(anchor, false)}></CloseIcon>
				</Button>
			</Stack>
			{/* <Divider /> */}
			<Card sx={{ padding: 2 }}>
				<img
					src={selectedEvent?.bannerUrl}
					alt=''
					style={{
						height: '300px',
						width: '100%',
						objectFit: 'cover',
						borderRadius: 8,
						display: 'block'
					}}
				></img>
				<CardContent sx={{ padding: 4 }}>
					<Typography variant='h6' fontWeight={700} marginBottom={4}>
						{selectedEvent?.name}
					</Typography>
					<Box sx={{ display: 'flex', gap: 4, alignItems: 'center', marginBottom: 2 }}>
						<Box sx={{ padding: '6px 8px 2px', border: '1px solid #ddd', borderRadius: 1 }}>
							<AccessTimeIcon></AccessTimeIcon>
						</Box>
						<Box>
							<Typography variant='body2' fontWeight={500}>
								{`${moment(selectedEvent?.startTime).format('dddd')} ${moment(
									selectedEvent?.startTime
								).format('L')}`}
							</Typography>
							<Typography variant='body1' fontWeight={600}>
								{`${moment(selectedEvent?.startTime).format('LT')} - ${moment(
									selectedEvent?.endTime
								).format('LT')}`}
							</Typography>
						</Box>
					</Box>
					<Box sx={{ display: 'flex', gap: 4, alignItems: 'center' }}>
						<Box sx={{ padding: '6px 8px 2px', border: '1px solid #ddd', borderRadius: 1 }}>
							<LocationOnIcon></LocationOnIcon>
						</Box>
						<Box>
							<Typography variant='body2' fontWeight={500}>
								Tại
							</Typography>
							<Typography variant='body1' fontWeight={600}>
								{selectedEvent?.locationName}
							</Typography>
						</Box>
					</Box>
				</CardContent>
			</Card>
			<Card sx={{ marginTop: 4 }}>
				<Stack direction={'row'} alignItems={'flex-end'} gap={2} padding={2}>
					<InfoIcon sx={{ marginBottom: 1 }}></InfoIcon>
					<Typography variant='h6' fontWeight={700}>
						Mô tả sự kiện
					</Typography>
				</Stack>
				<Divider sx={{ margin: 0 }}></Divider>
				<CardContent sx={{ padding: 6 }}>
					<Typography sx={'body1'}>{selectedEvent?.description}</Typography>
				</CardContent>
			</Card>
			{/* <Button variant='contained' fullWidth sx={{ marginTop: 4 }}>
				Đăng ký
			</Button> */}
		</Box>
	)

	const handleUpdateStatus = async (uevent, status, feedback) => {
		setReviewLoading(true)
		console.log(feedback);
		updateEventStatus(uevent?.id, status, feedback).then(response => {
			setReviewLoading(false)

			if (response?.status == 'success') {
				const updateEvents = events?.map(event => {
					if (event?.id != uevent?.id) return event
					else return { ...event, isApproved: status }
				})
				toast.success('Đã cập nhật')
				setEvents(updateEvents)
				setFeedback(null)
			} else {
				toast.error('Vui lòng thử lại sau')
			}
		})
	}

	useEffect(() => {
		setRows(events)
	}, [events])

	const handleAction = async (selectedConfirmEvent, status) => {
		await handleUpdateStatus(selectedConfirmEvent, status, feedback?.content)
	}

	return (
		<Fragment>
			<Backdrop
				sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
				open={reviewLoading || pageLoading}
			>
				<CircularProgress color='inherit' />
			</Backdrop>
			<Card>
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }} aria-label='simple table'>
						<TableHead>
							<TableRow>
								<TableCell align='center' width={100}>
									Câu lạc bộ
								</TableCell>
								<TableCell align='center' width={340}>
									Sự kiện
								</TableCell>
								<TableCell align='center' width={150}>
									Trạng thái
								</TableCell>
								<TableCell align='center'>Ngày tạo</TableCell>
								<TableCell align='center'>Kế hoạch</TableCell>
								<TableCell align='center' width={200}></TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(event => (
								<TableRow key={event.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
									<TableCell
										component='th'
										scope='row'
										sx={{
											width: '120px',
											display: 'flex',
											flexDirection: 'column',
											alignItems: 'center'
										}}
									>
										<img
											src={
												event.clubAvatarUrl ??
												'https://res.cloudinary.com/de41uvd76/image/upload/v1699091537/fpt_tqucac.jpg'
											}
											alt=''
											style={{ width: 40, height: 40, display: 'block' }}
										></img>
										<Typography align='center' fontWeight={500}>
											{event.clubSubname ?? 'FPT University'}
										</Typography>
									</TableCell>
									<TableCell align='left'>
										<Typography
											style={{
												overflow: 'hidden',
												display: '-webkit-box',
												WebkitBoxOrient: 'vertical',
												WebkitLineClamp: 2,
												textOverflow: 'ellipsis',
												cursor: 'pointer'
											}}
											onClick={e => {
												setSelectedEvent(event)
												toggleDrawer('right', true)(e)
											}}
										>
											{event.name}
										</Typography>
									</TableCell>
									<TableCell align='left'>
										{event?.isApproved == 'rejected' ? (
											<Chip label='Từ chối' sx={{ fontSize: 16, width: '100%' }} color='error' />
										) : event?.isApproved == 'pending' ? (
											<Chip
												label='Đang chờ'
												sx={{ fontSize: 16, width: '100%' }}
												color='warning'
											/>
										) : (
											<Chip
												label='Đã duyệt'
												sx={{ fontSize: 16, width: '100%' }}
												color='success'
											/>
										)}
									</TableCell>
									<TableCell align='center'>{`${moment(event?.createdAt).format('L')}`}</TableCell>
									<TableCell align='center'>
										<a href={event?.planUrl} download target='_blank' rel='noreferrer'>
											Tải kế hoạch
										</a>
									</TableCell>
									<TableCell align='center'>
										<ReviewButton
											event={event}
											setFeedback={setFeedback}
											feedback={feedback}
											handleAction={handleAction}
											reviewLoading={reviewLoading}
										></ReviewButton>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[10, 25, 100]}
					component='div'
					count={20}
					rowsPerPage={10}
					page={0}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Card>

			{['left', 'right', 'top', 'bottom'].map(anchor => (
				<Fragment key={anchor}>
					<Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
						{list(anchor)}
					</Drawer>
				</Fragment>
			))}
		</Fragment>
	)
}
