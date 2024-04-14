import { Container, Navbar } from 'react-bootstrap';
import { Link, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LogoutButton from './LogoutButton';
import { appRoutes } from '../../routes/index';

const NavBar = () => {
  const { t } = useTranslation();

  return (
    <>
      <Navbar bg="white" expand="lg" className="shadow-sm">
        <Container>
          <Navbar.Brand as={Link} to={appRoutes.chatPagePath()}>
            {t('navigation.chatName')}
          </Navbar.Brand>
          {LogoutButton(t('navigation.exitBtn'))}
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
};

export default NavBar;
