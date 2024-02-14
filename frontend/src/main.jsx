import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import ErrorPage from './error-page'
import './index.css'
import Contact from './routes/contact'
import { default as LoginPage, default as Root } from './routes/loginPage'

const App = () => (
	<Router>
		<Routes>
			<Route path='/' element={<Root />} />
			<Route path='login' element={<LoginPage />} />
			<Route path='*' element={<ErrorPage />} />
			<Route path='contacts/:contactId' element={<Contact />} />
		</Routes>
	</Router>
)

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
)

export default App
