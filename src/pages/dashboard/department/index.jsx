import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'

import {
	Paper,
	Table,
	TableContainer,
	TableHead,
	TableBody,
	TableRow,
	TextField,
	TableCell,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	IconButton,
	FormControl
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import Typography from '@mui/material/Typography'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function Department() {
	const [departments, setDepartments] = useState([])
	const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
	const ORIGIN_URL = `${process.env.NEXT_PUBLIC_API_URL}/department`
	const [cookies, setCookie] = useCookies(['clubData'])
	const [updateData, setUpdateData] = useState(false)
	const loadDataUrl = ORIGIN_URL + '?action=list-dept&clubId=' + cookies['clubData']?.clubId

	const [validationErrors, setValidationErrors] = useState({
		name: false
	})

	useEffect(() => {
		// Fetch dữ liệu lại chỉ khi có tín hiệu cập nhật hoặc departments thay đổi
		if (updateData || departments.length === 0) {
			fetch(loadDataUrl, {
				method: 'GET',
				headers: {
					'Content-type': 'application/json; charset=UTF-8'
				}
			})
				.then(function (response) {
					return response.json()
				})
				.then(function (data) {
					setDepartments(data)
					setUpdateData(false)
				})
				.catch(error => console.error('Error:', error))
		}
	}, [cookies, updateData, departments, loadDataUrl])

	const [departmentToDelete, setDepartmentToDelete] = useState(null)

	const handleDelete = department => {
		setDepartmentToDelete(department)
		setOpenDeleteDialog(true)
	}

	const confirmDelete = () => {
		if (departmentToDelete) {
			const DELETE_DATA_URL = ORIGIN_URL + `?action=delete-dept&depId=${departmentToDelete.id}`
			fetch(DELETE_DATA_URL)
				.then(res => {
					if (!res.ok) {
						throw new Error('Something went wrong')
					}

					return res.json()
				})
				.then(data => {
					setUpdateData(true)
					setOpenDeleteDialog(false)
					toast.success('Xóa thành công ', {
						position: 'top-right',
						autoClose: 3000, // Close the toast after 3 seconds
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true
					})
				})
				.catch(error => {
					toast.error('Lỗi máy chủ ! Xóa thất bại', {
						position: 'top-right',
						autoClose: 3000, // Close the toast after 3 seconds
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true
					})
					console.log(error)
				})
		}
	}

	// Create department dialog state
	const [openCreateDialog, setOpenCreateDialog] = useState(false)

	const handleCreateDepartment = () => {
		// Kiểm tra xem tên phòng ban có được nhập không
		if (!editedDepartmentName) {
			setValidationErrors({ name: true })
		}

		// Handle the creation of the department here, for example, make an API call.

		const CREATE_DATA_URL =
			ORIGIN_URL + '?action=add-dept&clubId=' + cookies['clubData']?.clubId + '&name=' + editedDepartmentName
		console.log(`Testing create url: ${CREATE_DATA_URL}`)
		fetch(CREATE_DATA_URL)
			.then(res => {
				if (!res.ok) {
					throw new Error('Something went wrong')
				}

				return res.json()
			})
			.then(data => {
				setUpdateData(true)
				setOpenCreateDialog(false)
				toast.success('Thêm thành công', {
					position: 'top-right',
					autoClose: 3000, // Close the toast after 3 seconds
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true
				})
			})
			.catch(error => {
				toast.error('Lỗi máy chủ ! Thêm thất bại', {
					position: 'top-right',
					autoClose: 3000, // Close the toast after 3 seconds
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true
				})
				console.log(error)
			})

		closeCreateDepartmentDialog()
	}

	const openCreateDepartmentDialog = () => {
		setOpenCreateDialog(true)
	}

	const closeCreateDepartmentDialog = () => {
		setOpenCreateDialog(false)
		setEditedDepartmentName('') // Clear the input field
	}
	const [openEditDialog, setOpenEditDialog] = useState(false)
	const [editedDepartmentName, setEditedDepartmentName] = useState('')
	const [editedDepartmentId, setEditedDepartmentId] = useState('')

	// Hàm để mở dialog chỉnh sửa tên phòng ban
	const handleOpenEditDialog = department => {
		setEditedDepartmentId(department.id)
		setEditedDepartmentName(department.name) 
		setOpenEditDialog(true)
	}

	const handleSaveEditedDepartment = () => {

		const EDIT_DATA_URL =
			ORIGIN_URL +
			'?action=edit-dept&clubId=' +
			cookies['clubData']?.clubId +
			'&name=' +
			editedDepartmentName +
			'&depId=' +
			editedDepartmentId
		

		fetch(EDIT_DATA_URL)
			.then(res => {
				if (!res.ok) {
					throw new Error('Something went wrong')
				}

				return res.json()
			})
			.then(data => {
				setUpdateData(true)
				setOpenCreateDialog(false)
				toast.success('Cập nhật thành công', {
					position: 'top-right',
					autoClose: 3000, // Close the toast after 3 seconds
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true
				})
			})
			.catch(error => {
				toast.success('Lỗi máy chủ ! Cập nhật thất bại ', {
					position: 'top-right',
					autoClose: 3000, // Close the toast after 3 seconds
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true
				})
				console.log(error)
			})

		setOpenEditDialog(false)
	}

	return (
		<div>
			<Typography>Danh Sách Phòng Ban Câu Lạc Bộ</Typography>
			<Button variant='contained' sx={{ marginTop: 10, marginBottom: 10 }} onClick={openCreateDepartmentDialog}>
				Thêm phòng ban
			</Button>

			<Dialog open={openCreateDialog} onClose={closeCreateDepartmentDialog}>
				<DialogTitle>Tạo Phòng Ban Mới</DialogTitle>
				<DialogContent>
					<TextField
						label='Tên phòng ban'
						fullWidth
						value={editedDepartmentName}
						onChange={e => setEditedDepartmentName(e.target.value)}
						sx={{ marginTop: 5 }}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={closeCreateDepartmentDialog} color='warning'>
						Hủy
					</Button>
					<Button onClick={handleCreateDepartment} color='success'>
						Tạo
					</Button>
				</DialogActions>
			</Dialog>

			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Mã phòng ban</TableCell>
							<TableCell>Tên phòng ban</TableCell>
							<TableCell>Hành động</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{departments.map(department => (
							<TableRow key={department.id}>
								<TableCell>{department.id}</TableCell>
								<TableCell>{department.name}</TableCell>
								<TableCell>
									<IconButton onClick={() => handleOpenEditDialog(department)} color='primary'>
										<EditIcon />
										
									</IconButton>
									
									<IconButton onClick={() => handleDelete(department)} color='secondary'>
										<DeleteIcon />
										
									</IconButton>
									
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			{/* Dialog Edit Department */}
			<Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
				<DialogTitle>Chỉnh Sửa Tên Phòng Ban</DialogTitle>
				<DialogContent>
					<TextField
						label='Tên phòng ban'
						fullWidth
						value={editedDepartmentName}
						onChange={e => setEditedDepartmentName(e.target.value)}
						sx={{ marginTop: 5 }}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setOpenEditDialog(false)} color='primary'>
						Hủy
					</Button>
					<Button onClick={handleSaveEditedDepartment} color='primary'>
						Lưu
					</Button>
				</DialogActions>
			</Dialog>

			{/* Dialog Form Xóa */}
			<Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
				<DialogTitle>Xác Nhận Xóa Phòng Ban !</DialogTitle>
				<DialogContent>
					{departmentToDelete && (
						<Typography variant='body1'>Bạn có chắc chắn muốn xóa phòng ban này ?</Typography>
					)}
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setOpenDeleteDialog(false)} color='secondary'>
						Hủy
					</Button>
					<Button onClick={confirmDelete} color='error'>
						Xóa
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}

export default Department
