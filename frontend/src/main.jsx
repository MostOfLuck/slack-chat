import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './index.css'
import { default as LoginPage, default as Root } from './routes/root'

const NotFoundPage = () => <h1>404 Not Found</h1>

const App = () => (
	<Router>
		<Routes>
			<Route path='/' element={<Root />} />
			<Route path='login' element={<LoginPage />} />
			<Route path='*' element={<NotFoundPage />} />
		</Routes>
	</Router>
)

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
)

export default App
