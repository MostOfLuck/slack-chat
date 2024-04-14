import {
  BrowserRouter, Routes, Route, Navigate,
} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Chat from '../pages/Chat.jsx';
import Login from '../pages/Login.jsx';
import NotFound from '../pages/NotFound.jsx';
import NavBar from './NavBar/NavBar';
import Signup from '../pages/SignUp.jsx';
import { useAuthorization } from '../hooks/hooks.js';
import { appRoutes } from '../routes/index.js';

const AuthorizationRoute = ({ children }) => {
  const authorization = useAuthorization();
  return authorization.userData ? children : <Navigate to={appRoutes.loginPagePath()} />;
};

const App = () => (
  <BrowserRouter>
    <div className="d-flex flex-column h-100">
      <NavBar />
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route
          path={appRoutes.chatPagePath()}
          element={(
            <AuthorizationRoute>
              <Chat />
            </AuthorizationRoute>
          )}
        />
        <Route path={appRoutes.loginPagePath()} element={<Login />} />
        <Route path={appRoutes.signupPagePath()} element={<Signup />} />
      </Routes>
      <ToastContainer />
    </div>
  </BrowserRouter>
);

export default App;
