import {
	AppBar,
	Button,
	ButtonGroup,
	Card,
	CardMedia,
	Container,
	Dialog,
	DialogActions,
	Divider,
	FormControl,
	IconButton,
	Input,
	InputLabel,
	List,
	ListItem,
	ListItemText,
	MenuItem,
	Select,
	Stack,
	Tab,
	TextField,
	Toolbar,
	Typography
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import Slide from '@mui/material/Slide'
import { TabContext, TabList, TabPanel } from '@mui/lab'

import React, { useState } from 'react'
import ClubList from 'src/pages/clubs/ClubList'
import Ranking from 'src/pages/clubs/Ranking'
import EventOverView from './EventOverView'
import RegisteredTable from './RegisteredTable'
import { CloudUpload } from 'mdi-material-ui'
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import styled from 'styled-components'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'

const VisuallyHiddenInput = styled('input')({
	clip: 'rect(0 0 0 0)',
	clipPath: 'inset(50%)',
	height: 1,
	overflow: 'hidden',
	position: 'absolute',
	bottom: 0,
	left: 0,
	whiteSpace: 'nowrap',
	width: 1
})

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />
})

function EventCreator({ openEventCreatorModal, setOpenEventCreatorModal }) {
	const [age, setAge] = useState('')

	const handleChange = event => {
		setAge(event.target.value)
	}

	return (
		<Dialog
			fullScreen
			open={openEventCreatorModal}
			onClose={() => setOpenEventCreatorModal(false)}
			TransitionComponent={Transition}
		>
			<AppBar sx={{ position: 'relative' }}>
				<Toolbar>
					<IconButton
						edge='start'
						color='inherit'
						onClick={() => setOpenEventCreatorModal(false)}
						aria-label='close'
					>
						<CloseIcon />
					</IconButton>
					<Typography sx={{ ml: 2, flex: 1 }} variant='h6' component='div' color={'#fff'} textTransform={'uppercase'}>
						Tạo sự kiện mới
					</Typography>
				</Toolbar>
			</AppBar>
			<Container maxWidth={'lg'} sx={{ padding: '0 60px !important' }}>
				<Stack direction={'column'}>
					<Typography marginY={4} variant='h6'>
						Thông tin cơ bản
					</Typography>
					<TextField
						id='outlined-basic'
						label='Tên sự kiện'
						variant='outlined'
						
						// defaultValue={'Zoom | FES-TECHSpeak #02 | BORN 2 BOND - Xây dựng và phát triển Câu lạc bộ'}
						sx={{ mb: 4 }}
					/>
					<TextField
						id='outlined-multiline-static'
						label='Mô tả sự kiện'
						multiline
						rows={10}

						// defaultValue={`🎤 Host: Anh Lê Ngọc Tuấn - Giám đốc Trải nghiệm Công Nghệ, Ban Công tác học đường, Tổ chức giáo dục FPT
                        // ​🗣️ Diễn giả: 
                        // ​Anh Vũ Hồng Chiên - Giám đốc Trung tâm Nghiên cứu và Ứng dụng Trí tuệ nhân tạo Quy Nhơn (QAI - FPT Software)
                        // ​Anh Đặng Việt Hùng - Design Manager tại Gianty chi nhánh Đà Nẵng
                        // ​Topic:
                        // ​• Giải mã công nghệ “Generative AI" và xu hướng ứng dụng trong các nghề nghiệp tương lai 
                        // • Nghề thiết kế đồ họa và ứng dụng công cụ AI trong thiết kế 
                        // • Thảo luận chủ đề AI có thay thế được chuyên gia đồ họa và thiết kế trong sáng tạo, xây dựng ứng dụng?`}
					/>
					<Stack direction={'row'} justifyContent={'space-between'}>
						<Typography marginY={4} variant='h6'>
							Ảnh sự kiện
						</Typography>
						<label htmlFor='image-upload'>
							<Button
								variant='contained'
								component='span'
								startIcon={<CloudUpload />}
								sx={{ margin: '10px 0' }}
							>
								Tải lên hình ảnh
							</Button>
						</label>
					</Stack>
					<Input
						accept='image/*' // Chỉ cho phép tải lên các tệp hình ảnh
						id='image-upload'
						type='file'

						//   onChange={handleBannerImageUpload}
						style={{ display: 'none' }}
					/>
					{/* <Card>
						<CardMedia
							component='img'
							alt='Selected Image'
							height='100%'
							width='100%'
							image={
								'https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,quality=75,width=960,height=480/event-covers/w9/21154ed7-dc92-4c28-b582-9a5adb206fa7'
							}
						/>
					</Card> */}
					<Typography marginY={4} variant='h6'>
						Thời gian sự kiện
					</Typography>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<Stack direction={'row'} gap={4}>
							<DatePicker
								label='Ngày'
								slotProps={{
									textField: {
										helperText: 'MM/DD/YYYY'
									}
								}}

								// defaultValue={dayjs('2022-04-17')}
								sx={{ flex: 1 }}
							/>
							<TimePicker sx={{ flex: 1 }} label='Bắt đầu' 

							// defaultValue={dayjs('2022-04-17T15:30')} 
							/>
							<TimePicker sx={{ flex: 1 }} label='Kết thúc'

							// defaultValue={dayjs('2022-04-17T20:30')} 
							/>
						</Stack>
					</LocalizationProvider>
					<Typography marginY={4} variant='h6'>
						Địa điểm
					</Typography>
					<FormControl fullWidth>
						<InputLabel id='demo-simple-select-label'>Chọn địa điểm</InputLabel>
						<Select
							labelId='demo-simple-select-label'
							id='demo-simple-select'
							value={age}
							label='Age'
							onChange={handleChange}
						>
							<MenuItem value={10}>Phòng 210</MenuItem>
							<MenuItem value={20}>Twenty</MenuItem>
							<MenuItem value={30}>Thirty</MenuItem>
						</Select>
					</FormControl>
					<Typography marginY={4} variant='h6'>
						Loại hình tổ chức
					</Typography>
					<ButtonGroup>
						<Button key='one' variant='contained' color='primary'>
							Toàn trường
						</Button>
						<Button key='two' variant='outlined' color='secondary'>
							Nội bộ
						</Button>
					</ButtonGroup>
					<Typography marginY={4} variant='h6'>
						Kế hoạch tổ chức
					</Typography>
					<Stack direction={'row'} alignItems={'center'} gap={4}>
						<Button
							component='label'
							variant='contained'
							startIcon={<CloudUploadIcon />}
							sx={{ width: 180 }}
						>
							Upload file
							<VisuallyHiddenInput type='file' />
						</Button>
						<Typography variant='body'>FES-TECHSpeak.docx</Typography>
					</Stack>
				</Stack>
				<DialogActions sx={{ paddingX: 16, pb: 16, justifyContent: 'center' }}>
					<Button variant='contained'>Xác nhận</Button>
					<Button variant='outlined'>Hủy</Button>
				</DialogActions>
			</Container>
		</Dialog>
	)
}

export default EventCreator
