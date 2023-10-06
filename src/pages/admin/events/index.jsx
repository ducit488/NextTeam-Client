import {
	Box,
	Button,
	Container,
	FormControl,
	IconButton,
	InputLabel,
	MenuItem,
	Select,
	Stack,
	Tooltip,
	Typography
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import EventList from './EventList'
import { useState } from 'react'
import EventCreator from './EventCreator'

function EventCreatorPage() {
	const [openEventCreatorModal, setOpenEventCreatorModal] = useState(false)

	return (
		<Container maxWidth='lg' style={{ padding: 0 }}>
			<EventCreator
				openEventCreatorModal={openEventCreatorModal}
				setOpenEventCreatorModal={setOpenEventCreatorModal}
			></EventCreator>
			<Stack direction={'row'} justifyContent={'space-between'} alignItems={'flex-end'} marginBottom={10}>
				<Button variant='contained' onClick={()=> setOpenEventCreatorModal(true)}>
					<AddIcon fontSize='small'></AddIcon>
					Thêm mới
				</Button>
				<Stack direction={'row'} alignItems={'center'} gap={4}>
					<Typography fontSize={32} fontWeight={600}>
						DANH SÁCH SỰ KIỆN
					</Typography>
				</Stack>
				<FormControl variant='outlined' size='small'>
					<InputLabel>Bộ lọc</InputLabel>
					<Select label='Status' defaultValue='active'>
						<MenuItem value='active'>Tất cả</MenuItem>
						<MenuItem value='inactive'>Đã Đăng ký</MenuItem>
						<MenuItem value='pending'>Sự kiện đã qua</MenuItem>
					</Select>
				</FormControl>
			</Stack>
			<EventList></EventList>
		</Container>
	)
}

export default EventCreatorPage
