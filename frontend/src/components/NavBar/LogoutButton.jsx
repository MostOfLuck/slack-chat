import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuthorization } from '../../hooks/hooks';
import { appRoutes } from '../../routes/index';

const LogoutButton = (title) => {
  const auth = useAuthorization();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate(appRoutes.loginPagePath());
    auth.logOut();
  };

  if (auth.userData) {
    return <Button className="logout-button" onClick={handleLogout}>{title}</Button>;
  }
  return null;
};

export default LogoutButton;
