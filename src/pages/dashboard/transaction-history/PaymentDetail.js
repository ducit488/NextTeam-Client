import * as React from 'react'
import { useState, useEffect, useReducer } from 'react'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'
import { ToastContainer, toast } from 'react-toastify'
import {
	Chip,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
	Typography
} from '@mui/material'
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm'
import moment from 'moment/moment'

export default function PaymentDetail({
	paymentDataDetail,
	handleClose,
	openPaymentDetailDialog,
	setOpenPaymentDetailDialog,
	statusObj = {},
	dispatch = () => {}
}) {
	const [paymentDetailFilter, setPaymentDetailFilter] = useState([])
	const [filter, setFilter] = useState('all')
	const [page, setPage] = useState(0)
	const [rowsPerPage, setRowsPerPage] = useState(10)


	const paymentFormObj = {
		cash: { color: 'primary', label: 'Thanh toán tiền mặt' },
		online: { color: 'warning', label: 'Thanh toán online' }
	}

	useEffect(() => {
		switch (filter) {
			case 'all':
				setPaymentDetailFilter(paymentDataDetail)

				return
			case '0':
				setPaymentDetailFilter(paymentDataDetail?.filter(paymentDataDetail => paymentDataDetail?.status == '0'))

				return
			case '1':
				setPaymentDetailFilter(paymentDataDetail?.filter(paymentDataDetail => paymentDataDetail?.status == '1'))

				return
			case '2':
				setPaymentDetailFilter(paymentDataDetail?.filter(paymentDataDetail => paymentDataDetail?.status == '2'))

				return
			default:
				return
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filter])

	useEffect(() => {
		setPaymentDetailFilter(paymentDataDetail)
	}, [paymentDataDetail])

	const handleChangePage = (event, newPage) => {
		setPage(newPage)
	}

	const handleChangeRowsPerPage = event => {
		setRowsPerPage(+event.target.value)
		setPage(0)
	}

	return (
		<div>
			<Dialog open={openPaymentDetailDialog} onClose={handleClose} scroll='paper' maxWidth='lg' fullWidth>
				<DialogTitle id='scroll-dialog-title'>
					<strong>{paymentDataDetail?.[0]?.title}</strong>
					<span>
						<Chip
							icon={<AccessAlarmIcon />}
							label={'Tạo vào: ' + moment(paymentDataDetail?.[0]?.createdAt).format('DD/MM/YY, h:mm A')}
							sx={{
								height: 24,
								fontSize: '0.75rem',
								textTransform: 'capitalize',
								'& .MuiChip-label': { fontWeight: 500 },
								marginLeft: 2
							}}
							color='secondary'
						/>
					</span>
				</DialogTitle>

				<DialogContent>
					<DialogContentText>
						<FormControl
							variant='outlined'
							size='small'
							sx={{
								'& .MuiOutlinedInput-root': { borderRadius: 4 },
								width: '30%',
								marginTop: '20px'
							}}
						>
							<InputLabel>Bộ lọc</InputLabel>
							<Select label='filter' defaultValue='all' onChange={e => setFilter(e.target.value)}>
								<MenuItem value='all'>Tất cả khoản thu</MenuItem>
								<MenuItem value='0'>Chưa thanh toán</MenuItem>
								<MenuItem value='1'>Thanh toán thành công</MenuItem>
								<MenuItem value='2'>Thanh toán thất bại</MenuItem>
							</Select>
						</FormControl>
						<TableContainer>
							<Table aria-label='table in dashboard'>
								<TableHead>
									<TableRow>
										<TableCell>Thành viên</TableCell>
										<TableCell>Số tiền</TableCell>
										<TableCell>Trạng thái</TableCell>
										<TableCell>Hình thức</TableCell>
										<TableCell>Cập nhật</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{paymentDetailFilter?.map(row => (
										<TableRow
											hover
											key={row.id}
											sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}
										>
											<TableCell>{row?.firstname + ' ' + row.lastname}</TableCell>
											<TableCell>{row?.amount.toLocaleString()}</TableCell>
											<TableCell>
												{row?.status ? (
													<Chip
														color={statusObj?.[row?.status]?.color}
														label={statusObj?.[row?.status]?.label}
														sx={{
															height: 24,
															fontSize: '0.75rem',
															textTransform: 'capitalize',
															'& .MuiChip-label': { fontWeight: 500 }
														}}
													/>
												) : (
													''
												)}
											</TableCell>
											<TableCell>
												{row?.paymentForm ? (
													<Chip
														color={paymentFormObj?.[row?.paymentForm]?.color}
														label={paymentFormObj?.[row?.paymentForm]?.label}
														sx={{
															height: 24,
															fontSize: '0.75rem',
															textTransform: 'capitalize',
															'& .MuiChip-label': { fontWeight: 500 }
														}}
													/>
												) : (
													''
												)}
											</TableCell>
											<TableCell>{moment(row?.updatedAt).format('DD/MM/YY, h:mm A')}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
						<TablePagination
							rowsPerPageOptions={[10, 25, 100]}
							component='div'
							count={paymentDetailFilter?.length}
							rowsPerPage={rowsPerPage}
							page={page}
							onPageChange={handleChangePage}
							onRowsPerPageChange={handleChangeRowsPerPage}
						/>
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Đóng</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}
