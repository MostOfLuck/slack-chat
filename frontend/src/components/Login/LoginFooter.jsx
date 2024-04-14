import { Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { appRoutes } from '../../routes';

const LoginFooter = () => {
  const { t } = useTranslation();

  return (
    <Card.Footer className="p-4">
      <div className="text-center">
        <span>
          {t('login.noAccount')}
        </span>
        <Link to={appRoutes.signupPagePath()}>
          {t('registration.registrationTitle')}
        </Link>
      </div>
    </Card.Footer>
  );
};

export default LoginFooter;
