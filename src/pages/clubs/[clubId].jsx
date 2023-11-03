import {
	Card,
	Box,
	CardContent,
	Container,
	Stack,
	Typography,
	Button,
	Divider,
	SwipeableDrawer,
	FormControl,
	InputLabel,
	MenuItem,
	Select
} from '@mui/material'
import AutoStoriesIcon from '@mui/icons-material/AutoStories'
import Groups2Icon from '@mui/icons-material/Groups2'
import CakeIcon from '@mui/icons-material/Cake'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import CloseIcon from '@mui/icons-material/Close'
import InfoIcon from '@mui/icons-material/Info'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import ClubCategory from 'src/components/ClubCategory'
import moment from 'moment'
import { useRouter } from 'next/router'
import { getUserInfo } from 'src/utils/info'
import RegisterClub from './RegisterClub'


function EventItem() {
	const [state, setState] = useState({
		top: false,
		left: false,
		bottom: false,
		right: false
	})

	const toggleDrawer = (anchor, open) => event => {
		if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
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
					src='http://res.cloudinary.com/de41uvd76/image/upload/v1694451011/z6jcsotpsznwdwavuklm.png'
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
						Zoom | FES-TECHSpeak #03 | CHANGE TO CHANCE - Công nghệ AI & Ứng dụng trong đồ họa sáng tạo
					</Typography>
					<Box sx={{ display: 'flex', gap: 4, alignItems: 'center', marginBottom: 2 }}>
						<Box sx={{ padding: '6px 8px 2px', border: '1px solid #ddd', borderRadius: 1 }}>
							<Groups2Icon></Groups2Icon>
						</Box>
						<Box>
							<Typography variant='body2' fontWeight={500}>
								Tổ chức
							</Typography>
							<Typography variant='body1' fontWeight={600}>
								FU-DEVER
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
								Phòng 210
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
					<Typography sx={'body1'}>
						🎤 Host: Anh Lê Ngọc Tuấn - Giám đốc Trải nghiệm Công Nghệ, Ban Công tác học đường, Tổ chức giáo
						dục FPT ​🗣️ Diễn giả: ​Anh Vũ Hồng Chiên - Giám đốc Trung tâm Nghiên cứu và Ứng dụng Trí tuệ
						nhân tạo Quy Nhơn (QAI - FPT Software) ​Anh Đặng Việt Hùng - Design Manager tại Gianty chi nhánh
						Đà Nẵng ​Topic: ​• Giải mã công nghệ “Generative AI" và xu hướng ứng dụng trong các nghề nghiệp
						tương lai • Nghề thiết kế đồ họa và ứng dụng công cụ AI trong thiết kế • Thảo luận chủ đề AI có
						thay thế được chuyên gia đồ họa và thiết kế trong sáng tạo, xây dựng ứng dụng?
					</Typography>
				</CardContent>
			</Card>
			<Button variant='contained' fullWidth sx={{ marginTop: 4 }}>
				Đăng ký
			</Button>
		</Box>
	)

	return (
		<>
			{['left', 'right', 'top', 'bottom'].map(anchor => (
				<>
					<SwipeableDrawer
						anchor={anchor}
						open={state[anchor]}
						onClose={toggleDrawer(anchor, false)}
						onOpen={toggleDrawer(anchor, true)}
					>
						{list(anchor)}
					</SwipeableDrawer>
				</>
			))}
			<Stack direction={'row'} justifyContent={'space-between'} marginBottom={10}>
				<Stack direction={'column'} width={'15%'}>
					<Typography variant='h5'>Aug 24</Typography>
					<Typography variant='h7'>Thursday</Typography>
				</Stack>
				<Card
					sx={{ width: '75%', display: 'flex', justifyContent: 'space-between', cursor: 'pointer' }}
					marginBottom={10}
					onClick={toggleDrawer('right', true)}
				>
					<CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
						<Typography variant='h7' sx={{ opacity: 0.7 }}>
							6:00 PM
						</Typography>
						<Typography variant='h6' fontWeight={700} sx={{ flex: 1 }}>
							Zoom | FES-TECHSpeak #03 | CHANGE TO CHANCE - Công nghệ AI & Ứng dụng trong đồ họa sáng tạo
						</Typography>
						<Box sx={{ display: 'flex', gap: 4 }}>
							<Groups2Icon></Groups2Icon>
							<Typography variant='body1'>Phòng 210</Typography>
						</Box>
						<Box sx={{ display: 'flex', gap: 4 }}>
							<LocationOnIcon></LocationOnIcon>
							<Typography variant='body1'>FU-DEVER</Typography>
						</Box>
						{/* <Button variant='contained' sx={{ marginTop: 4, width: '50%' }}>
              Đăng ký
            </Button> */}
					</CardContent>
					<img
						src='http://res.cloudinary.com/de41uvd76/image/upload/v1694451011/z6jcsotpsznwdwavuklm.png'
						alt=''
						style={{
							width: '300px',
							objectFit: 'cover'
						}}
					/>
				</Card>
			</Stack>
		</>
	)
}

function ClubPage() {
	const [club, setClub] = useState({})
	const [cookies, setCookie, removeCookie] = useCookies(['userData'])
	const [userData, setUserData] = useState()
	const [open, setOpen] = useState(false)
	const [clubId, setClubId] = useState()
	const [loading, setLoading] = useState(false)
	const dateString = club.createdAt

	// Create Date object from the string
	const date = new Date(dateString)

	// Define options for toLocaleDateString
	const options = { year: 'numeric', month: 'short', day: 'numeric' }

	// Format the date
	const formattedDate = date.toLocaleDateString('en-US', options)

	const handleClose = () => {
		setOpen(false)
	}

	const callAPIDepartment = async clubId => {
		try {
			setLoading(true)
			const res = await getAPI('/department?action=list-dept&clubId=' + clubId)
			setDepartment(res)
		} catch (error) {
			console.log(error)
		} finally {
			setLoading(false)
		}
	}

	const [userId, setUserId] = useState()

	useEffect(() => {
		;(async () => setUserId((await getUserInfo(cookies['userData'])).id))()
	}, [cookies])

	useEffect(() => {
		;(async () => setUserData(await getUserInfo(cookies['userData'])))()
	}, [cookies])

	const router = useRouter()

	const handleClickOpen = clubId => {
		if (userId) {
			setClubId(clubId)
			callAPIDepartment(clubId)
			setOpen(true)
		} else {
			router.push('/auth/login')
		}
	}

	useEffect(() => {
		let url_query = ''
		if (userData?.id == undefined) {
			url_query = `http://localhost:8080/club-detail?subname=${router.query.clubId}`
		} else {
			url_query = `http://localhost:8080/club-detail?subname=${router.query.clubId}&userId=${userData?.id}`
		}
		fetch(url_query, {
			method: 'GET',
			headers: {
				'Content-type': 'application/json; charset=UTF-8'
			}
		})
			.then(function (response) {
				return response.json()
			})
			.then(function (data) {
				
				setClub(data)
			})
			.catch(error => console.error('Error:', error))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userData])

	return (
		<Container maxWidth='lg' sx={{ marginTop: 20 }}>
			<RegisterClub clubId={club.id} userId={userId} isOpen={open} handleClose={handleClose} />

			<Card>
				<img
					src={club?.bannerUrl}
					alt=''
					style={{
						width: '100%',
						objectFit: 'cover',
						display: 'block'
					}}
				/>
				<CardContent sx={{ display: 'flex', flexDirection: 'row', gap: 4 }}>
					<Card sx={{ height: '140px', width: '140px' }}>
						<img
							src={club?.avatarUrl}
							alt=''
							width={'100%'}
							height={'100%'}
							style={{ objectFit: 'cover' }}
						/>
					</Card>
					<Stack direction={'column'} flex={1}>
						<Typography variant='h7' sx={{ opacity: 0.7 }}>
							{club?.subname}
						</Typography>
						<Typography variant='h5' fontWeight={700} sx={{}}>
							{club?.name}
						</Typography>
						<ClubCategory categoryId={club?.categoryId}></ClubCategory>
						<Stack direction={'row'} justifyContent={'space-between'} alignItems={'flex-end'}>
							<Stack direction={'row'} gap={12}>
								<Box sx={{ display: 'flex', gap: 4 }}>
									<Groups2Icon></Groups2Icon>
									<Typography variant='body1'>{club?.numberOfMembers} thành viên</Typography>
								</Box>
								<Box sx={{ display: 'flex', gap: 4 }}>
									<CakeIcon></CakeIcon>
									<Typography variant='body1'>{formattedDate}</Typography>
								</Box>
							</Stack>
							{club?.isJoined ? (
								<Button
									variant='outlined'
									color='secondary'
									sx={{ marginTop: 4, width: '50%' }}
									onClick={() => handleClickOpen(club.id)}
									disabled
								>
									Đã tham gia
								</Button>
							) : (
								<Button
									variant='outlined'
									sx={{ marginTop: 4, width: '50%' }}
									onClick={() => handleClickOpen(club.id)}
								>
									Đăng ký tham gia
								</Button>
							)}
						</Stack>
					</Stack>
				</CardContent>
			</Card>
			{/* <Container maxWidth='lg' sx={{ marginTop: 20 }}>
				<Stack direction={'row'} justifyContent={'space-between'} alignItems={'flex-end'} marginBottom={10}>
					<Typography fontSize={32} fontWeight={600}>
						CÁC SỰ KIỆN
					</Typography>
					<FormControl variant='outlined' size='small'>
						<InputLabel>Bộ lọc</InputLabel>
						<Select label='Status' defaultValue='active'>
							<MenuItem value='active'>Sự kiện trong tháng</MenuItem>
							<MenuItem value='inactive'>Đã Đăng ký</MenuItem>
							<MenuItem value='pending'>Sự kiện đã qua</MenuItem>
						</Select>
					</FormControl>
				</Stack>
				<Container maxWidth={'lg'} sx={{ padding: '0 80px !important' }}>
					{[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]?.map((event, index) => (
						<EventItem key={index}></EventItem>
					))}
				</Container>
			</Container> */}
		</Container>
	)
}

export default ClubPage
