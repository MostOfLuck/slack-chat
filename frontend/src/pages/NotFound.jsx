import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { appRoutes } from '../routes';
import notFound from '../img/notFound.jpg';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center">
      <Image width="30%" height="30%" alt={t('notFound.pageNotFound')} src={notFound} fluid />
      <h1 className="h4 text-muted">{t('notFound.pageNotFound')}</h1>
      <p className="text-muted">
        <span className="to-main">
          {t('notFound.youCanGo')}
          {' '}
        </span>
        <Link to={appRoutes.chatPagePath()}>
          {t('notFound.toMainPage')}
        </Link>
      </p>
    </div>
  );
};

export default NotFound;
