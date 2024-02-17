import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/hooks.js'

import getRoutes from '../routes.js'
import ChatPage from './chatComponents/pageChat.jsx'

const PrivateRoute = () => {
	const auth = useAuth()
	const location = useLocation()

	return auth.loggedIn ? (
		<ChatPage />
	) : (
		<Navigate to={getRoutes.loginPagePath()} state={{ from: location }} />
	)
}

export default PrivateRoute
