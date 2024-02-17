import 'react-toastify/dist/ReactToastify.css'

import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import getRoutes from '../routes.js'
import NotFound from './errorPage.jsx'
import Header from './header.jsx'
import LoginPage from './loginPage.jsx'
import PrivateRoute from './privatePage.jsx'
import SignUp from './signUpPage.jsx'

const App = () => (
	<div className='h-100'>
		<div className='d-flex flex-column h-100'>
			<Router>
				<Header />
				<Routes>
					<Route path={getRoutes.chatPagePath()} element={<PrivateRoute />} />
					<Route path={getRoutes.loginPagePath()} element={<LoginPage />} />
					<Route path={getRoutes.signupPagePath()} element={<SignUp />} />
					<Route path='*' element={<NotFound />} />
				</Routes>
			</Router>
		</div>
		<ToastContainer
			position='top-right'
			autoClose={5000}
			hideProgressBar={false}
			newestOnTop={false}
			closeOnClick
			rtl={false}
			pauseOnFocusLoss
			draggable
			pauseOnHover
			theme='light'
		/>
	</div>
)

export default App
