import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material'
import * as React from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { useState, useEffect, useReducer } from 'react'

export default function AddCategory({
	openAddCategoryDialog,
	setOpenAddCategoryDialog,
	handleClose,
	handleAddCategory,
	cookies
}) {
	// ** Hook
	const [category, setCategory] = useState({
		title: '',
		description: '',
		clubId: cookies?.['clubData']?.clubId,
		amount: ''
	})
	const [errorTitle, setErrorTitle] = useState(false)
	const [errorAmount, setErrorAmount] = useState(false)

	const handleSubmit = () => {
		if (category.title === '') {
			setErrorTitle(true)
			toast.error('Vui lòng không để trống Tên khoản nộp')
		} else if (category.amount === '' || isNaN(category.amount)) {
			setErrorAmount(true)
			toast.error('Số tiền không hợp lệ')
		} else {
			fetch(`${process.env.NEXT_PUBLIC_API_URL}/payment?action=add-category`, {
				method: 'POST',
				body: JSON.stringify(category),
				headers: {
					'Content-type': 'application/json; charset=UTF-8'
				}
			})
				.then(function (response) {
					return response.json()
				})
				.then(function (data) {
					toast.success('Thêm khoản nộp mới thành công')
					setCategory('')
					handleClose()
				})
				.catch(error => {
					console.error('Error:', error)

					toast.error('Có lỗi xảy ra khi thêm khoản nộp, vui lòng thử lại')
				})
				.finally(() => {
					handleClose()
				})
		}
	}

	return (
		<div>
			<ToastContainer></ToastContainer>
			<Dialog open={openAddCategoryDialog} onClose={handleClose} scroll='paper' maxWidth='sm' fullWidth>
				<DialogTitle id='scroll-dialog-title'>
					<strong>Tạo khoản nộp mới</strong>
				</DialogTitle>

				<DialogContent>
					<DialogContentText>
						<TextField
							sx={{ marginTop: 5 }}
							error={errorTitle}
							fullWidth
							id='outlined-multiline-static'
							label='Tên khoản nộp'
							onChange={event =>
								setCategory({
									...category,
									title: event.target.value
								})
							}
						/>
						<TextField
							sx={{ marginTop: 5 }}
							fullWidth
							id='outlined-multiline-static'
							label='Mô tả'
							onChange={event =>
								setCategory({
									...category,
									description: event.target.value
								})
							}
						/>
						<TextField
							sx={{ marginTop: 5 }}
							error={errorAmount}
							fullWidth
							id='outlined-multiline-static'
							label='Số tiền'
							onChange={event =>
								setCategory({
									...category,
									amount: event.target.value
								})
							}
							inputProps={{
								pattern: '[0-9]*' // Chỉ chấp nhận các ký tự số
							}}
						/>
					</DialogContentText>
				</DialogContent>

				<DialogActions>
					<Button variant='contained' onClick={handleSubmit}>
						Xác nhận
					</Button>
					<Button onClick={handleClose}>Đóng</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}
