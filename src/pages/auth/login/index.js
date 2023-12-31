// ** React Imports
import { useState } from 'react'
import { useCookies } from 'react-cookie'

// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard from '@mui/material/Card'
import MuiFormControlLabel from '@mui/material/FormControlLabel'

// ** Icons Imports
import Google from 'mdi-material-ui/Google'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'

// **Toasify Imports
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { postAPI } from 'src/utils/request'
import Decentralization from 'src/layouts/Decentralization'
import { InputAdornment } from '@mui/material'
import { EyeOffOutline, EyeOutline } from 'mdi-material-ui'
import { useEffect } from 'react'
import ForRole from 'src/layouts/ForRole'

import { useSettings } from 'src/@core/hooks/useSettings'

// ** Styled Components
const Card = styled(MuiCard)(({ theme }) => ({
	[theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const LinkStyled = styled('a')(({ theme }) => ({
	fontSize: '0.875rem',
	textDecoration: 'none',
	color: theme.palette.primary.main
}))

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
	'& .MuiFormControlLabel-label': {
		fontSize: '0.875rem',
		color: theme.palette.text.secondary
	}
}))

const LoginPage = () => {
	// ** State
	const [cookies, setCookie, removeCookie] = useCookies(['userData'])
	const { settings, saveSettings } = useSettings()

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [save, setSave] = useState('')
	const [emailError, setEmailError] = useState(false)
	const [passwordError, setPasswordError] = useState(false)
	const [showPassword, setShowPassword] = useState(false)

	// ** Hook
	const theme = useTheme()
	const router = useRouter()
	const [urlParams, setUrlParams] = useState()
	useEffect(() => {
		setUrlParams(new URLSearchParams(window.location.search))
	}, [])
	if (urlParams?.get('googleLogin')) {
		toast.success('Đăng nhập thành công, đang chuyển hướng sang trang chủ!')
		router.push('/')
		setTimeout(() => {
			setCookie('userData', urlParams.get('successData').replaceAll(' ', '+'), {
				path: '/'
			})
		}, 1000)

		return (
			<>
				<ToastContainer></ToastContainer>
			</>
		)
	}

	const handleSubmit = async event => {
		event.preventDefault() // 👈️ prevent page refresh
		setEmailError(false)
		setPasswordError(false)

		if (email == '') {
			setEmailError(true)
			toast.error('Không được để trống email')
		} else if (password == '') {
			setPasswordError(true)
			toast.error('Không được để trống mật khẩu')
		} else if (email && password) {
			const res = await postAPI('login', {
				email: email,
				password: password
			})

			if (res.id == null) {
				toast.error(res)
			} else {
				if (save) {
				}
				if (!save) {
				}
				toast.success('Đăng nhập thành công, đang chuyển hướng sang trang chủ!')
				setTimeout(() => {
					setTimeout(() => {
						setCookie('userData', res.res, {
							path: '/'
						})
						saveSettings({ ...settings, avatarURL: res.res.avatarURL })
						router.push('/')
					}, 1000)
				}, 1000)
			}

			// const res2 = await post('user-info')
			// console.log(res2)

			// fetch('http://localhost:8080/login', {
			// 	method: 'POST',
			// 	body: JSON.stringify({
			// 		email: email,
			// 		password: password
			// 	}),
			// 	headers: {
			// 		'Content-type': 'application/json; charset=UTF-8'
			// 	}
			// })
			// 	.then(function (response) {
			// 		return response.json()
			// 	})
			// 	.then(function (data) {
			// 		if (data.id == null) {
			//
			// 			toast.error(data)
			// 		} else {
			// 			if (save) {
			// 			}
			// 			if (!save) {
			// 			}
			// 			setCookie('userData', JSON.stringify(data), { path: '/' })
			// 			console.log('Đăng nhập thành công')
			// 			toast.success('Đăng nhập thành công, đang chuyển hướng sang trang chủ!')
			// 			setTimeout(() => {
			// 				router.push('/')
			// 			}, 1000)
			// 		}
			// 	})
			// 	.catch(error => console.error('Error:', error))
		}
	}

	const handleChange = prop => event => {
		setValues({ ...values, [prop]: event.target.value })
	}

	// const handleClickShowPassword = () => {
	//   setPassword({ value: password, showPassword: !password.showPassword })
	// }

	const handleMouseDownPassword = event => {
		event.preventDefault()
	}

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword)
	}

	return (
		<Box className='content-center'>
			<Card sx={{ zIndex: 1 }}>
				<CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
					<Link passHref href={'/'} style={{ textDecoration: 'none' }}>
						<Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
							<svg
								width={35}
								height={29}
								version='1.1'
								viewBox='0 0 30 23'
								xmlns='http://www.w3.org/2000/svg'
								xmlnsXlink='http://www.w3.org/1999/xlink'
							>
								<g stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
									<g id='Artboard' transform='translate(-95.000000, -51.000000)'>
										<g id='logo' transform='translate(95.000000, 50.000000)'>
											<path
												id='Combined-Shape'
												fill={theme.palette.primary.main}
												d='M30,21.3918362 C30,21.7535219 29.9019196,22.1084381 29.7162004,22.4188007 C29.1490236,23.366632 27.9208668,23.6752135 26.9730355,23.1080366 L26.9730355,23.1080366 L23.714971,21.1584295 C23.1114106,20.7972624 22.7419355,20.1455972 22.7419355,19.4422291 L22.7419355,19.4422291 L22.741,12.7425689 L15,17.1774194 L7.258,12.7425689 L7.25806452,19.4422291 C7.25806452,20.1455972 6.88858935,20.7972624 6.28502902,21.1584295 L3.0269645,23.1080366 C2.07913318,23.6752135 0.850976404,23.366632 0.283799571,22.4188007 C0.0980803893,22.1084381 2.0190442e-15,21.7535219 0,21.3918362 L0,3.58469444 L0.00548573643,3.43543209 L0.00548573643,3.43543209 L0,3.5715689 C3.0881846e-16,2.4669994 0.8954305,1.5715689 2,1.5715689 C2.36889529,1.5715689 2.73060353,1.67359571 3.04512412,1.86636639 L15,9.19354839 L26.9548759,1.86636639 C27.2693965,1.67359571 27.6311047,1.5715689 28,1.5715689 C29.1045695,1.5715689 30,2.4669994 30,3.5715689 L30,3.5715689 Z'
											/>
											<polygon
												id='Rectangle'
												opacity='0.077704'
												fill={theme.palette.common.black}
												points='0 8.58870968 7.25806452 12.7505183 7.25806452 16.8305646'
											/>
											<polygon
												id='Rectangle'
												opacity='0.077704'
												fill={theme.palette.common.black}
												points='0 8.58870968 7.25806452 12.6445567 7.25806452 15.1370162'
											/>
											<polygon
												id='Rectangle'
												opacity='0.077704'
												fill={theme.palette.common.black}
												points='22.7419355 8.58870968 30 12.7417372 30 16.9537453'
												transform='translate(26.370968, 12.771227) scale(-1, 1) translate(-26.370968, -12.771227) '
											/>
											<polygon
												id='Rectangle'
												opacity='0.077704'
												fill={theme.palette.common.black}
												points='22.7419355 8.58870968 30 12.6409734 30 15.2601969'
												transform='translate(26.370968, 11.924453) scale(-1, 1) translate(-26.370968, -11.924453) '
											/>
											<path
												id='Rectangle'
												fillOpacity='0.15'
												fill={theme.palette.common.white}
												d='M3.04512412,1.86636639 L15,9.19354839 L15,9.19354839 L15,17.1774194 L0,8.58649679 L0,3.5715689 C3.0881846e-16,2.4669994 0.8954305,1.5715689 2,1.5715689 C2.36889529,1.5715689 2.73060353,1.67359571 3.04512412,1.86636639 Z'
											/>
											<path
												id='Rectangle'
												fillOpacity='0.35'
												fill={theme.palette.common.white}
												transform='translate(22.500000, 8.588710) scale(-1, 1) translate(-22.500000, -8.588710) '
												d='M18.0451241,1.86636639 L30,9.19354839 L30,9.19354839 L30,17.1774194 L15,8.58649679 L15,3.5715689 C15,2.4669994 15.8954305,1.5715689 17,1.5715689 C17.3688953,1.5715689 17.7306035,1.67359571 18.0451241,1.86636639 Z'
											/>
										</g>
									</g>
								</g>
							</svg>
							<ToastContainer></ToastContainer>
							<Typography
								variant='h6'
								sx={{
									ml: 3,
									lineHeight: 1,
									fontWeight: 600,
									textTransform: 'uppercase',
									fontSize: '1.5rem !important'
								}}
							>
								{themeConfig.templateName}
							</Typography>
						</Box>
					</Link>
					<Box sx={{ mb: 6 }}>
						<Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
							{themeConfig.templateName} chào bạn 👋🏻
						</Typography>
						<Typography variant='body2'>Chúc bạn một ngày tốt lành!</Typography>
					</Box>
					<form noValidate autoComplete='off' onSubmit={handleSubmit}>
						<TextField
							autoFocus
							fullWidth
							id='email'
							label='Email'
							name='email'
							onChange={event => setEmail(event.target.value)}
							value={email}
							error={emailError}
							sx={{ marginBottom: 4 }}
						/>
						<FormControl fullWidth>
							<InputLabel htmlFor='auth-password'>Mật khẩu</InputLabel>
							<OutlinedInput
								sx={{ marginBottom: 4 }}
								label='Password'
								name='password'
								id='auth-password'
								onChange={e => setPassword(e.target.value)}
								error={passwordError}
								type={showPassword ? 'text' : 'password'}
								endAdornment={
									<InputAdornment position='end'>
										<IconButton
											edge='end'
											onClick={handleClickShowPassword}
											onMouseDown={handleMouseDownPassword}
											aria-label='toggle password visibility'
										>
											{showPassword ? <EyeOutline /> : <EyeOffOutline />}
										</IconButton>
									</InputAdornment>
								}
							/>
						</FormControl>
						<Box
							sx={{
								mb: 4,
								display: 'flex',
								alignItems: 'center',
								flexWrap: 'wrap',
								justifyContent: 'space-between'
							}}
						>
							<FormControlLabel control={<></>} label='' />
							<Link passHref href='/auth/forgot'>
								<LinkStyled>Quên mật khẩu?</LinkStyled>
							</Link>
						</Box>
						<Button fullWidth size='large' variant='contained' sx={{ marginBottom: 7 }} type='submit'>
							ĐĂNG NHẬP
						</Button>
					</form>
					<Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
						<Typography variant='body2' sx={{ marginRight: 2 }}>
							Bạn chưa có tài khoản?
						</Typography>
						<Typography variant='body2'>
							<Link passHref href='/auth/register'>
								<LinkStyled>Tạo tài khoản</LinkStyled>
							</Link>
						</Typography>
					</Box>
					<Divider sx={{ my: 5 }}>hoặc đăng nhập bằng</Divider>
					<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
						<Link
							passHref
							href='https://accounts.google.com/o/oauth2/auth?scope=email&redirect_uri=https://nextteam.azurewebsites.net/login-google&response_type=code&client_id=314493880440-he0s6oe3g6rt0lth4k7q2t7n5pjdk75e.apps.googleusercontent.com&approval_prompt=force'
						>
							<Button
								fullWidth
								size='large'
								variant='contained'
								sx={{ marginBottom: 7, backgroundColor: 'red' }}
							>
								<Google sx={{ marginRight: '10px' }}></Google> ĐĂNG NHẬP BẰNG GOOGLE
							</Button>
						</Link>
					</Box>
				</CardContent>
			</Card>

			<FooterIllustrationsV1 />
		</Box>
	)
}
LoginPage.getLayout = page => (
	<Decentralization>
		<ForRole guest>
			<BlankLayout>{page}</BlankLayout> {/* giao diện cho guest */}
		</ForRole>
	</Decentralization>
)

export default LoginPage
