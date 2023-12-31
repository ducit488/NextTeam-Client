// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import KeyOutline from 'mdi-material-ui/KeyOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'

const axios = require('axios')

import { changeUserPass } from '../../utils/apiUtils'
import { ToastContainer, toast } from 'react-toastify'
import { validatePassword } from '../../input-validation/index'
import { FormHelperText } from '@mui/material'

const TabSecurity = ({ userInfo, setUserInfo }) => {
	// ** States
	const [values, setValues] = useState({
		newPassword: '',
		showNewPassword: false,
		newPasswordError: { status: false, message: '' },
		currentPassword: '',
		showCurrentPassword: false,
		confirmNewPassword: '',
		showConfirmNewPassword: false
	})

	const [currentUserInfo, setCurrentUserInfo] = useState({ ...userInfo })

	// Handle Current Password
	const handleCurrentPasswordChange = prop => event => {
		setValues({ ...values, [prop]: event.target.value })
	}

	const handleClickShowCurrentPassword = () => {
		setValues({ ...values, showCurrentPassword: !values.showCurrentPassword })
	}

	const handleMouseDownCurrentPassword = event => {
		event.preventDefault()
	}

	// Handle New Password
	const handleNewPasswordChange = prop => event => {
		setValues({ ...values, [prop]: event.target.value })
	}

	const handleClickShowNewPassword = () => {
		setValues({ ...values, showNewPassword: !values.showNewPassword })
	}

	const handleMouseDownNewPassword = event => {
		event.preventDefault()
	}

	// Handle Confirm New Password
	const handleConfirmNewPasswordChange = prop => event => {
		setValues({ ...values, [prop]: event.target.value })
	}

	const handleClickShowConfirmNewPassword = () => {
		setValues({ ...values, showConfirmNewPassword: !values.showConfirmNewPassword })
	}

	const handleMouseDownConfirmNewPassword = event => {
		event.preventDefault()
	}

	const handleSubmit = event => {
		event.preventDefault()

		const authInfo = {
			oldPassword: values.currentPassword,
			newPassword: values.newPassword,
			email: userInfo.email
		}

		if (values.newPasswordError.status) {
			toast.error('Vui lòng điền thông tin hợp lệ.')
		} else if (values.confirmNewPassword !== values.newPassword) {
			toast.error('Xác nhận mật khẩu mới chưa chính xác.')
		} else {
			changeUserPass(authInfo, userInfo.id).then(response => {
				if (response.message == 'success') {
					setUserInfo({ ...currentUserInfo })
					toast.success('Success change password!', {
						position: toast.POSITION.TOP_RIGHT
					})
				} else {
					toast.error('Fail to change password!')
				}
			})
		}
	}

	return (
		<form>
			<CardContent sx={{ paddingBottom: 10 }}>
				<Grid container spacing={10}>
					<Grid item xs={12} sm={6}>
						<Grid container spacing={5}>
							<Grid item xs={12} sx={{ marginTop: 4.75 }}>
								<FormControl fullWidth>
									<InputLabel htmlFor='account-settings-current-password'>
										Mật khẩu hiện tại
									</InputLabel>
									<OutlinedInput
										autoComplete='true'
										label='Mật khẩu hiện tại'
										value={values.currentPassword}
										id='account-settings-current-password'
										type={values.showCurrentPassword ? 'text' : 'password'}
										onChange={handleCurrentPasswordChange('currentPassword')}
										endAdornment={
											<InputAdornment position='end'>
												<IconButton
													edge='end'
													aria-label='toggle password visibility'
													onClick={handleClickShowCurrentPassword}
													onMouseDown={handleMouseDownCurrentPassword}
												>
													{values.showCurrentPassword ? <EyeOutline /> : <EyeOffOutline />}
												</IconButton>
											</InputAdornment>
										}
									/>
								</FormControl>
							</Grid>

							<Grid item xs={12} sx={{ marginTop: 6 }}>
								<FormControl fullWidth>
									<InputLabel htmlFor='account-settings-new-password'>Mật khẩu mới</InputLabel>
									<OutlinedInput
										autoComplete='true'
										label='Mật khẩu mới'
										value={values.newPassword}
										error={values.newPasswordError.status}
										id='account-settings-new-password'
										onChange={event => {
											const validPassword = validatePassword(event.target.value)
											if (!validPassword.valid) {
												setValues({
													...values,
													newPasswordError: {
														status: true,
														message: validPassword.message
													},
													newPassword: event.target.value
												})
											} else {
												setValues({
													...values,
													newPasswordError: {
														status: false,
														message: validPassword.message
													},
													newPassword: event.target.value
												})
											}
										}}
										type={values.showNewPassword ? 'text' : 'password'}
										endAdornment={
											<InputAdornment position='end'>
												<IconButton
													edge='end'
													onClick={handleClickShowNewPassword}
													aria-label='toggle password visibility'
													onMouseDown={handleMouseDownNewPassword}
												>
													{values.showNewPassword ? <EyeOutline /> : <EyeOffOutline />}
												</IconButton>
											</InputAdornment>
										}
									/>
									{values.newPasswordError.status == true ? (
										<FormHelperText sx={{ color: 'red' }}>
											{values.newPasswordError.message}
										</FormHelperText>
									) : (
										''
									)}
								</FormControl>
							</Grid>

							<Grid item xs={12}>
								<FormControl fullWidth>
									<InputLabel htmlFor='account-settings-confirm-new-password'>
										Xác nhận mật khẩu mới
									</InputLabel>
									<OutlinedInput
										autoComplete='true'
										label='Xác nhận mật khẩu mới'
										value={values.confirmNewPassword}
										id='account-settings-confirm-new-password'
										type={values.showConfirmNewPassword ? 'text' : 'password'}
										onChange={handleConfirmNewPasswordChange('confirmNewPassword')}
										endAdornment={
											<InputAdornment position='end'>
												<IconButton
													edge='end'
													aria-label='toggle password visibility'
													onClick={handleClickShowConfirmNewPassword}
													onMouseDown={handleMouseDownConfirmNewPassword}
												>
													{values.showConfirmNewPassword ? <EyeOutline /> : <EyeOffOutline />}
												</IconButton>
											</InputAdornment>
										}
									/>
								</FormControl>
							</Grid>
						</Grid>
					</Grid>

					<Grid item xs={12} sm={6}>
						<Grid container spacing={5}>
							<Grid item xs={12}>
								<Box
									sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: 2 }}
								>
									<KeyOutline sx={{ marginRight: 3 }} />
									<Typography variant='h6'>Xác thực hai yếu tố</Typography>
								</Box>
							</Grid>
							<Grid item xs={12}>
								<Box sx={{ mt: 5.75, display: 'flex', justifyContent: 'center' }}>
									<Box
										sx={{
											maxWidth: 368,
											display: 'flex',
											textAlign: 'center',
											alignItems: 'center',
											flexDirection: 'column'
										}}
									>
										<Avatar
											variant='rounded'
											sx={{
												width: 48,
												height: 48,
												color: 'common.white',
												backgroundColor: 'primary.main'
											}}
										>
											<LockOpenOutline sx={{ fontSize: '1.75rem' }} />
										</Avatar>
										<Typography sx={{ fontWeight: 600, marginTop: 3.5, marginBottom: 3.5 }}>
											Xác thực hai yếu tố chưa được kích hoạt.
										</Typography>
										<Typography variant='body2'>
											Xác thực hai yếu tố bổ sung thêm một lớp bảo mật cho tài khoản của bạn bằng
											cách yêu cầu nhiều hơn chỉ mật khẩu để đăng nhập. Tìm hiểu thêm.
										</Typography>
									</Box>
								</Box>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</CardContent>

			<CardContent>
				<Grid container>
					<Grid item xs={12} sm={12} md={6}>
						<Box sx={{ mt: 2, mr: 5, display: 'flex', justifyContent: 'flex-end' }}>
							<Button variant='contained' sx={{ marginRight: 3.5 }} onClick={handleSubmit}>
								Lưa thay đổi
							</Button>
							<Button
								type='reset'
								variant='outlined'
								color='secondary'
								onClick={() =>
									setValues({
										...values,
										currentPassword: '',
										newPassword: '',
										confirmNewPassword: ''
									})
								}
							>
								Hủy
							</Button>
						</Box>
					</Grid>
					<Grid item xs={0} sm={0} md={6}></Grid>
				</Grid>
			</CardContent>
		</form>
	)
}

export default TabSecurity
