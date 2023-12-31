// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import LinearProgress from '@mui/material/LinearProgress'

// ** Icons Imports
import MenuUp from 'mdi-material-ui/MenuUp'
import DotsVertical from 'mdi-material-ui/DotsVertical'

const data = [
	{
		progress: 80,
		imgHeight: 20,
		title: 'Hoạt động 1',
		color: 'primary',
		amount: '+ 22 điểm',
		subtitle: 'Hoạt động 1',
		imgSrc: '/images/cards/logo-bitbank.png'
	},
	{
		progress: 90,
		color: 'info',
		imgHeight: 27,
		title: 'Hoạt động 2',
		amount: '+ 37 điểm',
		subtitle: 'Hoạt động 2',
		imgSrc: '/images/cards/logo-bitbank.png'
	},
	{
		progress: 10,
		imgHeight: 20,
		title: 'Hoạt động 3',
		color: 'error',
		amount: '- 30 điểm',
		subtitle: 'Vắng mặt',
		imgSrc: '/images/cards/logo-aviato.png'
	}
]

const TotalEarning = props => {
	return (
		<Card>
			<CardHeader
				title='Điểm hoạt động'
				titleTypographyProps={{ sx: { lineHeight: '1.6 !important', letterSpacing: '0.15px !important' } }}
				action={
					<IconButton
						size='small'
						aria-label='settings'
						className='card-more-options'
						sx={{ color: 'text.secondary' }}
					>
						<DotsVertical />
					</IconButton>
				}
			/>
			<CardContent sx={{ pt: theme => `${theme.spacing(2.25)} !important` }}>
				<Box sx={{ mb: 1.5, display: 'flex', alignItems: 'center' }}>
					<Typography variant='h4' sx={{ fontWeight: 600, fontSize: '2.125rem !important' }}>
						{props?.data?.activity_point}
					</Typography>
				</Box>

				<Typography component='p' variant='caption' sx={{ mb: 10 }}>
					Xếp hạng thứ 7 trong CLB
				</Typography>

				{data.map((item, index) => {
					return (
						<Box
							key={item.title}
							sx={{
								display: 'flex',
								alignItems: 'center',
								...(index !== data.length - 1 ? { mb: 8.5 } : {})
							}}
						>
							<Avatar
								variant='rounded'
								sx={{
									mr: 3,
									width: 40,
									height: 40,
									backgroundColor: theme => `rgba(${theme.palette.customColors.main}, 0.04)`
								}}
							>
								<img src={item.imgSrc} alt={item.title} height={item.imgHeight} />
							</Avatar>
							<Box
								sx={{
									width: '100%',
									display: 'flex',
									flexWrap: 'wrap',
									alignItems: 'center',
									justifyContent: 'space-between'
								}}
							>
								<Box sx={{ marginRight: 2, display: 'flex', flexDirection: 'column' }}>
									<Typography
										variant='body2'
										sx={{ mb: 0.5, fontWeight: 600, color: 'text.primary' }}
									>
										{item.title}
									</Typography>
									<Typography variant='caption'>{item.subtitle}</Typography>
								</Box>

								<Box sx={{ minWidth: 85, display: 'flex', flexDirection: 'column' }}>
									<Typography variant='body2' sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
										{item.amount}
									</Typography>
									<LinearProgress color={item.color} value={item.progress} variant='determinate' />
								</Box>
							</Box>
						</Box>
					)
				})}
			</CardContent>
		</Card>
	)
}

export default TotalEarning
