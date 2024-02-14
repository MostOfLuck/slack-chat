import { Formik } from 'formik'

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
		<h1>Войти</h1>
		<Formik
			initialValues={{ email: '', password: '' }}
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
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<input
						type='email'
						name='email'
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.email}
						placeholder='Ваш ник'
					/>
					{errors.email && touched.email && errors.email}
					<input
						type='password'
						name='password'
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.password}
						placeholder='Ваш пароль'
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
