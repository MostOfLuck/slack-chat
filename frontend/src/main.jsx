import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './index.css'
import ErrorPage from './routes/error-page'
import { default as LoginPage, default as Root } from './routes/loginPage'
import Navigation from './routes/nav'
import Reg from './routes/reg'

const App = () => (
	<Router>
		<Routes>
			<Route
				path='/'
				element={
					<>
						<Navigation />
						<Root />
					</>
				}
			/>
			<Route path='/login' element={<LoginPage />} />
			<Route path='*' element={<ErrorPage />} />
			<Route path='/register' element={<Reg />} />
		</Routes>
	</Router>
)

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
)

export default App
