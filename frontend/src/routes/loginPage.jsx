import { Formik } from 'formik'
import { Link } from 'react-router-dom' // Импортируйте Link
import image from '../images/image.jpeg'

const LoginPage = () => (
	<div
		style={{
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
			height: '100vh',
		}}
	>
		<div
			id='container'
			style={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				marginBottom: '130px',
				alignItems: 'center',
			}}
		></div>
		<h2>
			Нет аккаунта?{' '}
			<Link id='Reg' to='/register'>
				Регистрация
			</Link>
		</h2>{' '}
		{/* Добавьте ссылку на регистрацию */}
		<div id='container-2'></div>
		<div id='block-h1'></div>
		<div className='image'>
			<img src={image} alt='image' />
		</div>
		<h1>Войти</h1>
		<Formik
			initialValues={{ nickname: '', password: '' }}
			onSubmit={(values, { setSubmitting }) => {
				setTimeout(() => {
					alert(JSON.stringify(values, null, 2))
					setSubmitting(false)
				}, 400)
			}}
		>
			{({
				values,
				errors,
				touched,
				handleChange,
				handleBlur,
				handleSubmit,
				isSubmitting,
			}) => (
				<form
					onSubmit={handleSubmit}
					style={{
						display: 'flex',
						marginTop: '1rem',
						paddingLeft: 'calc(var(--bs-gutter-x)*.5)',
						paddingRight: 'calc(var(--bs-gutter-x)*.5)',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<input
						type='nickname'
						name='nickname'
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.nickname}
						placeholder='Ваш ник'
					/>
					{errors.nickname && touched.nickname && errors.nickname}
					<input
						type='password'
						name='password'
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.password}
						placeholder='Пароль'
					/>
					{errors.password && touched.password && errors.password}
					<button type='submit' disabled={isSubmitting}>
						Войти
					</button>
				</form>
			)}
		</Formik>
	</div>
)
export default LoginPage
